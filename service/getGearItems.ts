"use server";

import { cookies } from "next/headers";

export async function getGearItems() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      console.error("Access token not found");
      return null;
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!backendUrl) {
      console.error("NEXT_PUBLIC_BACKEND_URL is not configured");
      return null;
    }

    const res = await fetch(`${backendUrl}/api/admin/gear`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const data = await res.json();

    console.log("GEAR STATUS:", res.status);
    console.log("GEAR RESPONSE:", data);

    if (!res.ok) {
      throw new Error(`Failed to fetch gear items: ${res.status}`);
    }

    return data;
  } catch (error) {
    console.error("Error fetching gear items:", error);
    return null;
  }
}
