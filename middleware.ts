import { NextResponse } from "next/server";
import { verifyJwtToken } from "@/app/lib/auth";
const AUTH_PAGES = ["/login"];

const isAuthPages = (url: any) => AUTH_PAGES.some((page) => page.startsWith(url));

export async function middleware(request: any) {

  const { url, nextUrl, cookies } = request;
  const { value: token } = cookies.get("token") ?? { value: null };
  const hasVerifiedToken = token && (await verifyJwtToken(token));
  const isAuthPageRequested = isAuthPages(nextUrl.pathname);

  if (isAuthPageRequested) {
    if (!hasVerifiedToken) {
      const response = NextResponse.next();
      response.cookies.delete("token");
      return response;
    }
    const response = NextResponse.redirect(new URL(`/`, url));
    return response;
  }

  if (!hasVerifiedToken) {
    const searchParams = new URLSearchParams(nextUrl.searchParams);
    searchParams.set("next", nextUrl.pathname);
   /* const response = NextResponse.redirect(
      new URL(`/login?${searchParams}`, url)
    );*/
    const response = NextResponse.redirect(
      new URL(`/login`, nextUrl)
    );
    response.cookies.delete("token");
    return response;
  }

  return NextResponse.next();

}
export const config = { matcher: ["/dashboard/:path*"] };