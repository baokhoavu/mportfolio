// This file sets custom HTTP headers for all routes in the Next.js app.
export default function middleware(_req) {
  const res = NextResponse.next();
  res.headers.set("Cache-Control", "no-store, must-revalidate");
  return res;
}

export const config = {
  matcher: "/:path*",
};
