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

  try {
    const backendUrl = process.env.BACKEND_URL;

    if (!backendUrl) {
      console.error("BACKEND_URL is not configured");
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

    const result = await res.json();

    // Wrong password / backend error
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

    if (
      typeof decodedToken === "object" &&
      decodedToken !== null &&
      decodedToken.role === "CUSTOMER"
    ) {
      redirect("/dashboard/user");
    } else if (
      typeof decodedToken === "object" &&
      decodedToken !== null &&
      decodedToken.role === "ADMIN"
    ) {
      redirect("/dashboard/admin");
    } else if (
      typeof decodedToken === "object" &&
      decodedToken !== null &&
      decodedToken.role === "PROVIDER"
    ) {
      redirect("/dashboard/provider");
    }

    return {
      success: false,
      message: "Invalid user role",
    };
  } catch (error) {
    console.error("LOGIN ACTION ERROR:", error);

    return {
      success: false,
      message: "Unable to connect to server. Please try again.",
    };
  }
};

const signupAction = async (formData: FormData) => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    }),
  });

  if (!res.ok) {
    return { success: false, message: "Something went wrong" };
  }

  const data = await res.json();
  return { success: true, message: "Login successful", user: data.user };
};
