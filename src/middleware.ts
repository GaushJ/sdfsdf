import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function middleware(req: NextRequest) {
  const cookieStore = cookies()
  const session = cookieStore.get('auth') 
  console.log("*******")
  console.log("*******")
  console.log("*******")
  console.log("*******")
  console.log("*******")
  console.log("*******")
  console.log("*******")
  console.log("*******")
  console.log(session)
  if (session) {
    return NextResponse.rewrite(new URL('/', req.url))
  } return NextResponse.rewrite(new URL('/sign-in', req.url))



}

export const config = {
  matcher: ['/favorites'],
}