import { clearLocalUser } from "@/lib/local-user";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await clearLocalUser();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to clear user:", error);
    return NextResponse.json(
      { error: "Failed to clear user" },
      { status: 500 }
    );
  }
}
