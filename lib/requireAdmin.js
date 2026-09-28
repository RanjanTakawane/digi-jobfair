import mongoose from "mongoose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { AUTH_COOKIE, verifyToken } from "@/lib/auth";

export function toSafeUser(user) {
  return {
    id: String(user._id),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
  };
}

function fail(message, status) {
  return {
    user: null,
    response: NextResponse.json({ success: false, message }, { status }),
  };
}

/**
 * Usage in an API route:
 *   const { user, response } = await requireAdmin();
 *   if (!user) return response;
 *   // user._id -> createdBy
 */
export default async function requireAdmin() {
  const token = (await cookies()).get(AUTH_COOKIE)?.value;
  const payload = await verifyToken(token);

  if (!payload || !mongoose.isValidObjectId(payload.userId)) {
    return fail("Authentication required", 401);
  }

  await connectDB();

  const user = await User.findById(payload.userId);

  if (!user || user.status !== "ACTIVE") {
    return fail("Authentication required", 401);
  }

  if (user.role !== "ADMIN") return fail("Forbidden", 403);

  return { user, response: null };
}
