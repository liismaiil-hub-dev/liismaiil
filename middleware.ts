import { COOKIE_NAME } from '@/store/constants/constants';
import { cookies } from 'next/headers';
import { NextResponse, userAgent, type NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    //
    const token = cookies().get(COOKIE_NAME)
    console.log({ middleWaretoken: token });
   const { isBot } = userAgent(request)
    if (isBot) {

        console.log({ isBot })
        return NextResponse.next()

    }

    if (request.nextUrl.pathname.startsWith('/stages')) {
        console.log({ pathName: request.nextUrl.pathname });

        if (!token) {
            return NextResponse.redirect(new URL('/signIn', request.url))
        }

    }
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', '*')
    if ((!token)) {
        return NextResponse.redirect(new URL('/', request.url))

    } else {

        return response;
    }

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/sprints/:path*', '/stages/:path*',]
}