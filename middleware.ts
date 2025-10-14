import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const pathname = request.nextUrl.pathname

  // Check if user is authenticated
  const sessionCookie = request.cookies.get('auth-session')
  const userRole = request.cookies.get('user-role')?.value

  // Admin routes protection
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login') && !pathname.startsWith('/admin/signup')) {
    if (!sessionCookie || userRole !== 'admin') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Staff routes protection
  if (pathname.startsWith('/staff') && !pathname.startsWith('/staff/login')) {
    if (!sessionCookie || userRole !== 'staff') {
      return NextResponse.redirect(new URL('/staff/login', request.url))
    }
  }

  // Redirect logged-in users away from login pages
  if (sessionCookie) {
    if (pathname === '/admin/login' && userRole === 'admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
    if (pathname === '/staff/login' && userRole === 'staff') {
      return NextResponse.redirect(new URL('/staff/scan', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

