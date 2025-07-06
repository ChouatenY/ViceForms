"use server";

import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

const USER_ID_COOKIE = "viceforms_user_id";
const USER_NAME_COOKIE = "viceforms_user_name";

export interface LocalUser {
  id: string;
  name: string;
}

export async function getLocalUser(): Promise<LocalUser> {
  const cookieStore = cookies();
  let userId = cookieStore.get(USER_ID_COOKIE)?.value;
  let userName = cookieStore.get(USER_NAME_COOKIE)?.value;

  // If no user ID exists, create a new one
  if (!userId) {
    userId = uuidv4();
    userName = `User_${userId.slice(0, 8)}`;
    
    // Set cookies with a long expiration (1 year)
    cookieStore.set(USER_ID_COOKIE, userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 365 * 24 * 60 * 60, // 1 year
    });
    
    cookieStore.set(USER_NAME_COOKIE, userName, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 365 * 24 * 60 * 60, // 1 year
    });
  }

  return {
    id: userId,
    name: userName || `User_${userId.slice(0, 8)}`,
  };
}

export async function updateUserName(newName: string): Promise<void> {
  const cookieStore = cookies();
  cookieStore.set(USER_NAME_COOKIE, newName, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 365 * 24 * 60 * 60, // 1 year
  });
}

export async function clearLocalUser(): Promise<void> {
  const cookieStore = cookies();
  cookieStore.delete(USER_ID_COOKIE);
  cookieStore.delete(USER_NAME_COOKIE);
}
