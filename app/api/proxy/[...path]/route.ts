import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

async function handler(
  request: NextRequest,
  context: {
    params: Promise<{ path: string[] }>;
  },
) {
  try {
    const { path } = await context.params;

    const cookieStore = await cookies();
    const accessToken =
      cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not logged in",
        },
        { status: 401 },
      );
    }

    const backendUrl =
      `${BACKEND_URL}/${path.join("/")}`;

    const body =
      request.method === "GET" ||
      request.method === "HEAD"
        ? undefined
        : await request.text();

    const response = await fetch(backendUrl, {
      method: request.method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body,
      cache: "no-store",
    });

    const data = await response.text();

    return new NextResponse(data, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("Content-Type") ||
          "application/json",
      },
    });
  } catch (error) {
    console.error("API PROXY ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};