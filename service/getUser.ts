// service/getUser.ts
"use server";

import { cookies } from "next/headers";

export const getUsers = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, data: [] };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/admin/users`, {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return { success: false, data: [] };
    }

    const rawUsers = result.data || result;

    type User = {
      id?: string;
      name?: string;
      fullName?: string;
      email?: string;
      createdAt?: string;
      rentalsCount?: number;
      rentals?: unknown[];
      status?: string;
      isActive?: boolean;
    };

    const formattedUsers = rawUsers.map((user: User) => {
      const name = user.name || "Unknown User";
      
      const initials = name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

      const joinedDate = user.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })
        : "N/A";

      return {
        id: user.id || user.id,
        name: name,
        email: user.email,
        initials: initials || "U",
        rentals: user.rentalsCount || user.rentals?.length || 0, 
        joined: joinedDate,
        status: user.status || (user.isActive ? "Active" : "Pending"),
      };
    });

    return { success: true, data: formattedUsers };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { success: false, data: [] };
  }
};