import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

const AUTH_ROUTES = ["/login", "/register"];

const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/how-it-works",
  "/login",
  "/register",
  "/gear",
];

const PROTECTED_ROUTES = [
  "/cart",
  "/gear/",
];

function isRouteMatch(
  pathname: string,
  route: string,
) {
  return (
    pathname === route ||
    pathname.startsWith(`${route}/`)
  );
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const accessToken =
    request.cookies.get("accessToken")?.value;

  let userRole: string | null = null;

  if (accessToken) {
    try {
      const decodedToken =
        jwt.decode(accessToken) as JwtPayload | null;

      userRole =
        typeof decodedToken?.role === "string"
          ? decodedToken.role
          : null;
    } catch {
      userRole = null;
    }
  }

  /*
   * Logged-in user should not access
   * login/register pages.
   */
  if (
    accessToken &&
    AUTH_ROUTES.includes(pathname)
  ) {
    if (userRole === "CUSTOMER") {
      return NextResponse.redirect(
        new URL(
          "/dashboard/customer",
          request.url,
        ),
      );
    }

    if (userRole === "ADMIN") {
      return NextResponse.redirect(
        new URL(
          "/dashboard/admin",
          request.url,
        ),
      );
    }

    if (userRole === "PROVIDER") {
      return NextResponse.redirect(
        new URL(
          "/dashboard/provider",
          request.url,
        ),
      );
    }

    return NextResponse.redirect(
      new URL("/", request.url),
    );
  }

  /*
   * /gear is PUBLIC.
   *
   * /gear/[id] is PROTECTED.
   */
  const isGearList =
    pathname === "/gear";

  const isGearDetail =
    pathname.startsWith("/gear/");

  const isCart =
    pathname === "/cart";

  /*
   * /gear/[id] and /cart require login.
   */
  if (
    (isGearDetail || isCart) &&
    !accessToken
  ) {
    const loginUrl = new URL(
      "/login",
      request.url,
    );

    loginUrl.searchParams.set(
      "redirect",
      pathname,
    );

    return NextResponse.redirect(loginUrl);
  }

  /*
   * Public routes can be accessed without login.
   */
  const isPublic =
    PUBLIC_ROUTES.some((route) =>
      isRouteMatch(pathname, route),
    );

  if (!accessToken && !isPublic) {
    return NextResponse.redirect(
      new URL("/", request.url),
    );
  }

  /*
   * Customer dashboard protection.
   */
  if (
    pathname.startsWith(
      "/dashboard/customer",
    ) &&
    userRole !== "CUSTOMER"
  ) {
    return NextResponse.redirect(
      new URL("/", request.url),
    );
  }

  /*
   * Admin dashboard protection.
   */
  if (
    pathname.startsWith(
      "/dashboard/admin",
    ) &&
    userRole !== "ADMIN"
  ) {
    return NextResponse.redirect(
      new URL("/", request.url),
    );
  }

  /*
   * Provider dashboard protection.
   */
  if (
    pathname.startsWith(
      "/dashboard/provider",
    ) &&
    userRole !== "PROVIDER"
  ) {
    return NextResponse.redirect(
      new URL("/", request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
