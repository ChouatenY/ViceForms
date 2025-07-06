import { updateUserName } from "@/lib/local-user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();
    
    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Name is required and must be a string" },
        { status: 400 }
      );
    }

    await updateUserName(name);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update user name:", error);
    return NextResponse.json(
      { error: "Failed to update user name" },
      { status: 500 }
    );
  }
}
