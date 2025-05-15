// The following code is taken from https://nextjs.org/docs/advanced-features/middleware#setting-headers
// This is required to set the locale from the query string or cookie before the page is rendered.

/* * */

import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/* * */

export function middleware(request: NextRequest) {
	// Ensure the URL is always lowercase. Transform the URL to lowercase
	// and redirect to it if the URL is not already lowercase.
	const lowercasedUrl = new URL(request.nextUrl.pathname.toLowerCase() + request.nextUrl.search, request.url);
	// Set the x-href header to the original URL
	// to make it easily available in server-side code.
	const headers = new Headers({ 'x-href': request.nextUrl.href });
	// Redirect to the lowercase URL if the original URL is not lowercase.
	if (request.url !== lowercasedUrl.toString()) {
		return NextResponse.redirect(lowercasedUrl, { headers });
	}
	// Continue to the next middleware.
	return NextResponse.next({ headers });
}

/* * */

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
};
