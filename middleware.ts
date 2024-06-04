import { COOKIE_NAME } from '@/store/constants/constants';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const token = cookies().get(COOKIE_NAME)
    console.log({ token });

   /*  if (request.nextUrl.pathname.startsWith('/space')) {
        console.log({ pathName: request.nextUrl.pathname });

        if (!token) {
            return NextResponse.redirect(new URL('/signIn', request.url))
        }
        NextResponse.next()
    } else  */if ((!token)) {
        return NextResponse.redirect(new URL('/', request.url))

    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/sprints/:path*']
}