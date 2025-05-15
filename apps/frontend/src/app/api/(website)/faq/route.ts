/* * */

import faqData from './data.json';

/* * */

export async function GET() {
	return Response.json(faqData, { headers: { 'Cache-Control': 'public, max-age=300' } });
}
