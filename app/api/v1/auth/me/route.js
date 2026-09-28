import { NextResponse } from "next/server";
import requireAdmin, { toSafeUser } from "@/lib/requireAdmin";

export async function GET() {
  try {
    const { user, response } = await requireAdmin();

    if (!user) return response;

    return NextResponse.json({ success: true, user: toSafeUser(user) });
  } catch (error) {
    console.error("Me error:", error.message);

    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 },
    );
  }
}
