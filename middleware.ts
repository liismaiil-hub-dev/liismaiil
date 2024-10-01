import { cookies } from 'next/headers';
import { NextRequest, NextResponse, userAgent } from 'next/server';

//import { getGuestFromCookies } from './actions/guest';
import { COOKIE_NAME } from './store/constants/constants';


const SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!

// This function can be marked `async` if using `await` inside

//export default clerkMiddleware();
/* 
const isPublicRoute = createRouteMatcher(["/:path*", "/guests", "/space", "/stages", "/sprints", "/sign-in(.*)", "/sign-up(.*)"])

export default clerkMiddleware((auth, request) => {
    if (!isPublicRoute(request)) {
        auth().protect()
    }
}) */


export function middleware(request: NextRequest) {
    //
    const token = cookies().get(COOKIE_NAME)
    if (typeof token !== 'undefined') {
        //  const guest = await getGuestFromTokenPrisma(_guest?.tokenId!)
        console.log({ middleWareCookieGuest: token });

    }

    const { isBot } = userAgent(request)
    if (isBot) {
        console.log({ isBot })
        return NextResponse.next()
    }

    if (request.nextUrl.pathname.startsWith('/sprints')) {
        console.log({ pathName: request.nextUrl.pathname });
        if (!token) {
            return NextResponse.redirect(new URL('/signIn', request.url))
        }
    }

    if (request.nextUrl.pathname.startsWith('/stages')) {
        console.log({ pathName: request.nextUrl.pathname });
        if (!token) {
            return NextResponse.redirect(new URL('/signIn', request.url))
        }
    }
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', '*')
    return response;


}
// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        /* '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
 */
        '/sprints/:path*',
        '/stages/:path*',
        // Skip Next.js internals and all static files,  unless found in search params

    ]
}

