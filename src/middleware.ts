import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function middleware(req: NextRequest) {
  const cookieStore = cookies()
  const session = cookieStore.get('auth')

  //If the session token exists allow the route 
  //to access otherwise redirect to sign-in route
  if (session) {

    const url = req.nextUrl.clone()
    url.pathname = req.nextUrl.pathname

    return NextResponse.rewrite(url)

  } else {

    const url = req.nextUrl.clone()
    url.pathname = '/sign-in'

    return NextResponse.rewrite(url)
  }


}

export const config = {
  matcher: ['/favorites', '/recent', '/approvals', '/label-and-reports'],
}