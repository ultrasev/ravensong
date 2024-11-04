import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { handleForwardRules } from "@/utils/forward-rules";

// Define a whitelist of paths
const WHITELISTED_PATHS = [
  "/dev",
  "/sub",
  "/proxyshare.conf",
  "/en/refund",
  "/en/tos",
  "/api",
  "/bark",
  "/en/privacy",
  "/en/faq",
  "/zh/refund",
  "/zh/tos",
  "/zh/privacy",
  "/zh/faq",
];

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/en", request.url));
  }

  // Handle forwarding rules
  const forwardUrl = handleForwardRules(
    pathname,
    process.env.BARK_FORWARD_RULES,
    request.nextUrl.search,
    request.url
  );
  if (forwardUrl) {
    return NextResponse.rewrite(forwardUrl);
  }

  // Check whitelist paths
  if (WHITELISTED_PATHS.some((path) => pathname.startsWith(path))) {
    return;
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Also include the root path '/'
     */
    "/((?!_next/static|_next/image|dev|favicon.ico|proxyshare\\.conf|.*\\.(?:svg|png|ico|jpg|jpeg|gif|webp)$).*)",
  ],
};
