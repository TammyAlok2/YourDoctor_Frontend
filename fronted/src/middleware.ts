import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Try to get the token from different sources
  const token = 
    request.cookies.get("token")?.value || 
    request.headers.get("Authorization")?.split(" ")[1] ||
    "";

  // Public paths that do not require authentication
  const isPublicPath = ["/login", "/forget", "/signup", "/doctors"].includes(path);

  // If the user is logged in and tries to access a public path (except /doctors), redirect to home
  if (isPublicPath && token && path !== "/doctors") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If the user is not logged in and tries to access a protected path, redirect to the login page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow the request to proceed if none of the above conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/forget",
    "/doctors", // Accessible to both logged-in and non-logged-in users
    "/logout",
    "/profile",
    "/profileupdate",
    "/updatepassword",
    "/appointment/:path*", // Protected: only logged-in users can access
    "/appointment-form/:path*", // Protected: only logged-in users can access
  ],
};