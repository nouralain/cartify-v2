import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token= await getToken({req:request})
  const isAuthPage = pathname.startsWith('/auth');

  if(token?.token && isAuthPage){
    return NextResponse.redirect(new URL('/', request.url))
  }
  if(!token?.token && !isAuthPage){
 return NextResponse.redirect(new URL('/auth/login', request.url))
  }
return NextResponse.next();
}


export const config = {
  matcher: ['/cart','/orders','/wishlist','/payment','/auth/:path*'],
}