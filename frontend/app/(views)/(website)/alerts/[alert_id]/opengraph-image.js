/* * */

import OpenGraphAlertsDefault from '@/opengraph/OpenGraphAlertsDefault';
import OpenGraphAlertsDynamic from '@/opengraph/OpenGraphAlertsDynamic';
import fs from 'fs';
import { ImageResponse } from 'next/og';
/* * */

export const alt = 'Mais sobre esta Notícia';
export const size = { height: 630, width: 1200 };
export const contentType = 'image/png';

/* * */

export default async function Image({ params }) {
	//
	//
	// A. Setup fonts
	const customFonts = [
		{ data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-Medium.ttf`).buffer, name: 'Inter', style: 'normal', weight: 500 },
		{ data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-SemiBold.ttf`).buffer, name: 'Inter', style: 'normal', weight: 600 },
		{ data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-Bold.ttf`).buffer, name: 'Inter', style: 'normal', weight: 700 },
	];

	//
	// B. Fetch data
	const alertData = await fetch(`${process.env.NEXT_PUBLIC_URL}/alerts`).then(res => res.json());

	console.log(alertData);
	//
	// C. Render default component
	if (params.length === 0 && !params.news_id) {
		return new ImageResponse(<OpenGraphAlertsDefault />, { ...size, fonts: customFonts });
	}

	//
	// D. Render dynamic component

	return new ImageResponse(<OpenGraphAlertsDynamic alertData={alertData} />, { ...size, fonts: customFonts });

	//
}
