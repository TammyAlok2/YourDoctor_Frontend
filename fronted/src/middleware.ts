import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Get the token from the cookies
  const token = request.cookies.get('loginToken')?.value;

  console.log('Path:', path);
  console.log('Token:', token);

  // Public paths that do not require authentication
  const publicPaths = ["/login", "/forget", "/signup", "/doctors","/cart"];
  // Protected paths that require authentication
  const protectedPaths = ["/appointment-form"];

  // Check if the current path is public
  const isPublicPath = publicPaths.some(p => path.startsWith(p));
  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some(p => path.startsWith(p));

  // If the user is logged in and tries to access a public path (except /doctors), redirect to home
  if (isPublicPath && token && path !== "/doctors" && path !== "/cart") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If the user is not logged in and tries to access a protected path, redirect to the login page
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow the request to proceed if none of the above conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/forget",
    "/doctors",
    "/logout",
    "/profile",
    "/profileupdate",
    "/updatepassword",
    "/cart",
    "/appointment-form/:path*",
  ],
};
