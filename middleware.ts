import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from './app/actions/auth'

export async function middleware(request: NextRequest) {
  const session = await getSession()
  const isAuthPage = request.nextUrl.pathname === '/login'

  if (!session && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (session && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|login|favicon.ico).*)'],
}

