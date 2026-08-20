import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt, { JwtPayload } from "jsonwebtoken"
 

const AUTH_ROUTES =['/login', '/register']
const PUBLIC_ROUTES = ['/', '/about', '/how-it-works','/login', '/register']
// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const decodedToken = accessToken ? jwt.decode(accessToken) as JwtPayload : null;

    let userRole = null;

    if(decodedToken){
        userRole = decodedToken.role;
    }

    if(accessToken && AUTH_ROUTES.includes(pathname)){
        if(userRole === "CUSTOMER"){
            return NextResponse.redirect(new URL("/dashboard/user", request.url))
        }else if(userRole === "ADMIN"){
            return NextResponse.redirect(new URL("/dashboard/admin", request.url))
        }else if(userRole === "PROVIDER"){
            return NextResponse.redirect(new URL("/dashboard/provider", request.url))
        }else{
            return NextResponse.redirect(new URL("/", request.url))
        }
    }

    const isPublic = PUBLIC_ROUTES.some((route)=> pathname === route || pathname.startsWith(route + '/'));

    if(!accessToken && !isPublic){
        return NextResponse.redirect(new URL('/', request.url))
    }

    if(pathname.startsWith('/dashboard/user') && userRole !== "CUSTOMER"){
        return NextResponse.redirect(new URL('/', request.url))
    }else if(pathname.startsWith('/dashboard/admin') && userRole !== "ADMIN"){
        return NextResponse.redirect(new URL('/', request.url))
    }else if(pathname.startsWith('/dashboard/provider') && userRole !== "PROVIDER"){
        return NextResponse.redirect(new URL('/', request.url))
    }

  return NextResponse.next()
}
 
// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }
 
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$).*)'
  ],
}