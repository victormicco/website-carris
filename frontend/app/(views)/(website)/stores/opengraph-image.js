/* * */

import OpenGraphStoresDefault from '@/opengraph/OpenGraphStoresDefault';
import OpenGraphStoresDynamic from '@/opengraph/OpenGraphStoresDynamic';
import { getHeadMetaTag } from '@/utils/getHeadMetaTag';
import fs from 'fs';
import { ImageResponse } from 'next/og';
/* * */

export const alt = 'Mais sobre esta Notícia';
export const size = { height: 630, width: 1200 };
export const contentType = 'image/png';

/* * */

export default async function Image() {
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
	// const storeId = getHeadMetaTag('description');
	console.log('AHHHHHHAHAHHAAHA');

	// This method allows to get the full url, sadly doesnt work on server side comps
	// const baseUrl = process.env.NEXT_PUBLIC_URL;
	// const fullUrl = `${baseUrl}${req.url}`;
	// const url = new URL(fullUrl);
	// const storeID = url.searchParams.get('store') || 'unknown';

	const allStores = await fetch(`https://api.cmet.pt/facilities/stores`).then(res => res.json());
	// const storeData = await allStores.find(allStores.id === storeID);

	//
	// C. Render default component
	if (!allStores) {
		return new ImageResponse(<OpenGraphStoresDefault />, { ...size, fonts: customFonts });
	}

	//
	// D. Render dynamic component

	return new ImageResponse(<OpenGraphStoresDynamic storeData={allStores} />, { ...size, fonts: customFonts });

	//
}
