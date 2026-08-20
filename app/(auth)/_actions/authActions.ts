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
  const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.toString(),
      password: password.toString(),
    }),
  });
  const result = await res.json();

  if (result.success) {
    const cookieStore = await cookies();
    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });
    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    const decodedToken = jwt.decode(result.data.accessToken);

    if (
      decodedToken &&
      typeof decodedToken !== "string" &&
      decodedToken.role === "CUSTOMER"
    ) {
      redirect("/dashboard/user", "replace");
    } else if (
      decodedToken &&
      typeof decodedToken !== "string" &&
      decodedToken.role === "ADMIN"
    ) {
      redirect("/dashboard/admin", "replace");
    } else if (
      decodedToken &&
      typeof decodedToken !== "string" &&
      decodedToken.role === "PROVIDER"
    ) {
      redirect("/dashboard/provider", "replace");
    }
  }
  return result;
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
