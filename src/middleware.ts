import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  // Get the referer to determine the previous URL
  let prevUrl = '/'
  const referer = req.headers.get('referer')
  if (referer?.startsWith('http://') || referer?.startsWith('https://')) {
    const domainWithPathname = referer.split('?')[0]
    const domainWithoutProtocol = domainWithPathname.split('//')[1]
    const parts = domainWithoutProtocol.split('/')
    const pathname = '/' + parts.slice(1).join('/')
    prevUrl = pathname
  }

  // Get the authentication token
  const secret = process.env.AUTH_SECRET as string
  const token = await getToken({
    req,
    secret,
    salt:
      process.env.NODE_ENV === 'development'
        ? 'authjs.session-token'
        : 'authjs.session-token',
  })
  const url = req.nextUrl.clone()

  // Allow requests for static files and Next.js internals
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/static') ||
    url.pathname.startsWith('/favicon.ico') ||
    url.pathname.startsWith('/api')
  ) {
    return NextResponse.next()
  }

  if (token) {
    // Redirect authenticated users away from the login page
    if (url.pathname === '/auth/login' || url.pathname === '/') {
      return NextResponse.redirect(new URL('/protected', req.url))
    }
    return NextResponse.next()
  } else {
    // Redirect unauthenticated users to the login page
    if (url.pathname !== '/auth/login') {
      url.pathname = '/auth/login'
      url.searchParams.set('callbackUrl', req.nextUrl.pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)'],
}
