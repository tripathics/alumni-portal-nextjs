import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth");

  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("redirect", req.nextUrl.pathname);

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

    return NextResponse.next();
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
    "/alumni-membership/:path*",
    "/welcome",
  ],
};
