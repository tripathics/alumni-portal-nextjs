import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "./types/User.type";
import { notFound } from "next/navigation";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth");

  const loginUrl = new URL("/login", req.url);
  const reqPathname = req.nextUrl.pathname
  loginUrl.searchParams.set("redirect", reqPathname);

  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  try {
    // validate token
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/auth`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie: `auth=${token.value}`,
        },
      }
    );
    if (!response.ok) {
      return NextResponse.redirect(loginUrl);
    }

    const resJson = await response.json()
    const roles: UserRole[] = resJson.decoded.role || [];

    const isUser = roles.includes("user") || roles.includes("alumni")
    const isAdmin = roles.includes("admin")

    const isAllowed =
      reqPathname.startsWith('/admin')
        ? isAdmin
        : reqPathname.startsWith('/profile')
          ? isUser || (isAdmin && ['/profile', '/profile/account'].includes(reqPathname))
          : true

    return isAllowed ? NextResponse.next() : notFound();
  } catch (error) {
    console.log("Error validating token:", error);
    // Handle server error gracefully (e.g., show an error page or log the issue)
    return NextResponse.redirect(new URL("/error", req.url));
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/profile/:path*",
  ],
};
