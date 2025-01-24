/* * */

import OpenGraphStopsDefault from '@/opengraph/OpenGraphStopsDefault';
import fs from 'fs';
import { ImageResponse } from 'next/og';

/* * */

export const alt = 'Todas as Paragens';
export const size = { height: 630, width: 1200 };
export const contentType = 'image/png';
export const description = 'Informação sobre Linhas';

/* * */

export default async function Image() {
	//
	// A. Setup fonts

	const customFonts = [
		{ data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-Medium.ttf`).buffer, name: 'Inter', style: 'normal', weight: 500 },
		{ data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-SemiBold.ttf`).buffer, name: 'Inter', style: 'normal', weight: 600 },
		{ data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-Bold.ttf`).buffer, name: 'Inter', style: 'normal', weight: 700 },
	];

	//
	// B. Render default component

	return new ImageResponse(<OpenGraphStopsDefault />, { ...size, fonts: customFonts });

	//
}
