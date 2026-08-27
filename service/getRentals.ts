"use server";

import { cookies } from "next/headers";

export async function getRentals() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      console.error("Access token not found");
      return [];
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!backendUrl) {
      console.error("NEXT_PUBLIC_BACKEND_URL is not configured");
      return [];
    }

    const res = await fetch(`${backendUrl}/api/admin/rentals`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await res.json();

    console.log("RENTALS STATUS:", res.status);
    console.log("RENTALS RESPONSE:", data);

    if (!res.ok) {
      throw new Error(`Failed to fetch rentals: ${res.status}`);
    }

    return data;
  } catch (error) {
    console.error("Error fetching rentals:", error);
    return [];
  }
}
