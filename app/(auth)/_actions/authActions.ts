"use server";

import { LoginState } from "@/lib/type";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export const loginAction = async (
  prevState: LoginState,
  formData: FormData,
) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return {
      success: false,
      message: "Email and password are required",
    };
  }

  let result;

  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!backendUrl) {
      console.error("NEXT_PUBLIC_BACKEND_URL is not configured");

      return {
        success: false,
        message: "Server configuration error",
      };
    }

    const res = await fetch(`${backendUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.error || "Invalid email or password",
      };
    }

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Login failed",
      };
    }
  } catch (error) {
    console.error("LOGIN ACTION ERROR:", error);

    return {
      success: false,
      message: "Unable to connect to server. Please try again.",
    };
  }

  // try/catch-এর বাইরে
  const cookieStore = await cookies();

  cookieStore.set("accessToken", result.data.accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  cookieStore.set("refreshToken", result.data.refreshToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  const decodedToken = jwt.decode(result.data.accessToken);

  if (typeof decodedToken === "object" && decodedToken !== null) {
    if (decodedToken.role === "CUSTOMER") {
      redirect("/dashboard/user");
    }

    if (decodedToken.role === "ADMIN") {
      redirect("/dashboard/admin");
    }

    if (decodedToken.role === "PROVIDER") {
      redirect("/dashboard/provider");
    }
  }

  return {
    success: false,
    message: "Invalid user role",
  };
};

const signupAction = async (formData: FormData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    },
  );

  if (!res.ok) {
    return { success: false, message: "Something went wrong" };
  }

  const data = await res.json();
  return { success: true, message: "Login successful", user: data.user };
};
