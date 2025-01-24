/* * */

import { allCardsData } from '@/components/review-2024/_data/cards';
import OpenGraphViagem2024Default from '@/opengraph/OpenGraphViagem2024Default';
import OpenGraphViagem2024Dynamic from '@/opengraph/OpenGraphViagem2024Dynamic';
import fs from 'fs';
import { ImageResponse } from 'next/og';

/* * */

export const alt = 'Mais sobre este cartão';
export const size = { height: 630, width: 1200 };
export const contentType = 'image/png';

/* * */

export default async function Image(req) {
	//

	//
	// A. Setup fonts

	const customFonts = [
		{ data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-Medium.ttf`).buffer, name: 'Inter', style: 'normal', weight: 500 },
		{ data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-SemiBold.ttf`).buffer, name: 'Inter', style: 'normal', weight: 600 },
		{ data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-Bold.ttf`).buffer, name: 'Inter', style: 'normal', weight: 700 },
	];

	// B. Fetch data
	const baseUrl = process.env.NEXT_PUBLIC_URL;
	const url = new URL(req.url, baseUrl);
	const cardId = url.searchParams.get('card') || 'unknown';

	const cardData = allCardsData.find(item => item._id === cardId);

	console.log('CAARD', url.pathname);

	//
	// C. Render default component

	if (!cardData) {
		return new ImageResponse(<OpenGraphViagem2024Default />, { ...size, fonts: customFonts });
	}

	//

	//
	// D. Render dynamic component

	return new ImageResponse(<OpenGraphViagem2024Dynamic cardData={cardData} />, { ...size, fonts: customFonts });

	//
}
