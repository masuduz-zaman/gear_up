import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GET() {
  try {
    if (!BACKEND_URL) {
      return NextResponse.json(
        {
          success: false,
          message:
            "NEXT_PUBLIC_BACKEND_URL is not configured",
        },
        { status: 500 },
      );
    }

    const cookieStore = await cookies();

    const accessToken =
      cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not logged in.",
        },
        { status: 401 },
      );
    }

    const response = await fetch(
      `${BACKEND_URL}/api/provider/orders`,
      {
        method: "GET",

        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },

        cache: "no-store",
      },
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error(
      "Provider Orders Error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch provider orders",
      },
      { status: 500 },
    );
  }
}