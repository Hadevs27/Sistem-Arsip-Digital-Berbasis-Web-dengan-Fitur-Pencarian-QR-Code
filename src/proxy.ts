import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAuthRoute = nextUrl.pathname.startsWith('/login');

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/dashboard', nextUrl));
    }
    return null;
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  const role = req.auth?.user?.role;

  // Protect admin routes
  if (nextUrl.pathname.startsWith('/admin') || nextUrl.pathname.startsWith('/logs')) {
    if (role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', nextUrl));
    }
  }
  
  // Protect create/edit for PIMPINAN
  if (role === 'PIMPINAN') {
    if (nextUrl.pathname.startsWith('/arsip/create') || 
        nextUrl.pathname.match(/^\/arsip\/[^\/]+\/edit$/) ||
        nextUrl.pathname.startsWith('/kategori')
    ) {
      return NextResponse.redirect(new URL('/dashboard', nextUrl));
    }
  }

  return null;
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|uploads).*)'],
};
