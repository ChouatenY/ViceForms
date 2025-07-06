import { getLocalUser } from "@/lib/local-user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getLocalUser();
    return NextResponse.json(user);
  } catch (error) {
    console.error("Failed to get user:", error);
    return NextResponse.json(
      { error: "Failed to get user" },
      { status: 500 }
    );
  }
}
