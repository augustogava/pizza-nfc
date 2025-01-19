import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from './app/actions/auth'

export async function middleware(request: NextRequest) {
  const session = await getSession()
  const isAuthPage = request.nextUrl.pathname === '/login'

  // If there's no session and we're not on the login page, redirect to login
  if (!session && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If there is a session and we're on the login page, redirect to dashboard
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|login|favicon.ico).*)'],
}

