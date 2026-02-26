import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") ?? "";
  const isAdminSubdomain = hostname.startsWith("admin.");

  // Subdomain routing: admin.kazeai.dev → /admin/*
  if (isAdminSubdomain) {
    const path = request.nextUrl.pathname;

    if (!path.startsWith("/admin")) {
      const url = request.nextUrl.clone();
      url.pathname = path === "/" ? "/admin" : `/admin${path}`;
      return NextResponse.rewrite(url);
    }
  }

  // Block /admin on main domain → redirect to subdomain
  if (!isAdminSubdomain && request.nextUrl.pathname.startsWith("/admin")) {
    const path = request.nextUrl.pathname.replace(/^\/admin/, "") || "/";
    return NextResponse.redirect(
      new URL(`https://admin.kazeai.dev${path}`)
    );
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session — must call getUser() to validate
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdminRoute =
    request.nextUrl.pathname.startsWith("/admin");
  const isLoginPage =
    request.nextUrl.pathname === "/admin/login";

  // Protect admin routes (except login page)
  if (isAdminRoute && !isLoginPage && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  // Logged-in user on login page -> redirect to dashboard
  if (isLoginPage && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
