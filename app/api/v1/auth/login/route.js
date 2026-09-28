import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { AUTH_COOKIE, authCookieOptions, createToken } from "@/lib/auth";
import { toSafeUser } from "@/lib/requireAdmin";

const INVALID = { success: false, message: "Invalid email or password" };

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body" },
      { status: 400 },
    );
  }

  const email =
    typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json(
      { success: false, message: "Email and password are required" },
      { status: 400 },
    );
  }

  try {
    await connectDB();

    const user = await User.findOne({ email }).select("+passwordHash");

    // Same response for unknown email and wrong password
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return NextResponse.json(INVALID, { status: 401 });
    }

    if (user.status !== "ACTIVE") {
      return NextResponse.json(
        { success: false, message: "Account is inactive" },
        { status: 403 },
      );
    }

    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Access denied" },
        { status: 403 },
      );
    }

    const token = await createToken({ userId: user._id, role: user.role });

    user.lastLoginAt = new Date();
    await user.save({ validateBeforeSave: false });

    const response = NextResponse.json({
      success: true,
      user: toSafeUser(user),
    });
    response.cookies.set(AUTH_COOKIE, token, authCookieOptions());

    return response;
  } catch (error) {
    console.error("Login error:", error.message);

    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 },
    );
  }
}
