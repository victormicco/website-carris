/* * */

import { Routes } from '@/utils/routes';
import { Line, Stop } from '@carrismetropolitana/api-types/network';

/* * */

export default async function Sitemap() {
	//

	//
	// A. Setup variables

	const baseUrl = process.env.NEXT_PUBLIC_URL || '';

	//
	// B. Fetch data

	const allStopsResponse = await fetch(`${Routes.API}/stops`);
	const allStopsData = await allStopsResponse.json();

	const allLinesResponse = await fetch(`${Routes.API}/lines`);
	const allLinesData = await allLinesResponse.json();

	//
	// C. Transform data

	const allStopsAsPages = allStopsData?.map((stopData: Stop) => {
		return {
			changeFrequency: 'daily',
			lastModified: new Date(),
			priority: 1,
			url: `${baseUrl}/stops/${stopData.id}`,
		};
	}) ?? [];

	const allLinesAsPages = allLinesData?.map((lineData: Line) => {
		return {
			changeFrequency: 'daily',
			lastModified: new Date(),
			priority: 1,
			url: `${baseUrl}/lines/${lineData.id}`,
		};
	}) ?? [];

	//
	// D. Return sitemap

	return [

		{
			changeFrequency: 'always',
			lastModified: new Date(),
			priority: 1,
			url: `${baseUrl}/encm`,
		},

		{
			changeFrequency: 'daily',
			lastModified: new Date(),
			priority: 1,
			url: `${baseUrl}/stops`,
		},

		...allStopsAsPages,

		{
			changeFrequency: 'daily',
			lastModified: new Date(),
			priority: 1,
			url: `${baseUrl}/lines`,
		},

		...allLinesAsPages,

	];

	//
}
