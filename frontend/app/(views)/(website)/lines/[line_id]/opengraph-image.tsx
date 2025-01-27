/* * */

import type { ApiResponse } from '@carrismetropolitana/api-types/common';
import type { Locality } from '@carrismetropolitana/api-types/locations';
import type { Line } from '@carrismetropolitana/api-types/network';

import { OpenGraphLinesDefault } from '@/opengraph/OpenGraphLinesDefault';
import { OpenGraphLinesDynamic } from '@/opengraph/OpenGraphLinesDynamic';
import { Routes } from '@/utils/routes';
import fs from 'fs';
import { ImageResponse } from 'next/og';

/* * */

export default async function Image({ params }) {
	//

	//
	// A. Fetch data

	const allLinesResponse = await fetch(`${Routes.API}/lines`);
	const allLinesData: Line[] = await allLinesResponse.json();

	const allLocalitiesResponse = await fetch(`${Routes.API}/locations/localities`);
	const allLocalitiesResult: ApiResponse<Locality[]> = await allLocalitiesResponse.json();
	const allLocalitiesData = allLocalitiesResult.status === 'success' ? allLocalitiesResult.data : [];

	//
	// B. Transform data

	const lineData = allLinesData.find(item => item.id === params.line_id);

	const localitiesForLine = allLocalitiesData.filter(item => lineData?.locality_ids.includes(item.id)).map(item => item.name);

	//
	// C. Render components

	if (!lineData || !lineData.long_name) {
		return new ImageResponse(
			<OpenGraphLinesDefault />,
			{
				fonts: [
					{ data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-Medium.ttf`).buffer as ArrayBuffer, name: 'Inter', style: 'normal', weight: 500 },
					{ data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-SemiBold.ttf`).buffer as ArrayBuffer, name: 'Inter', style: 'normal', weight: 600 },
					{ data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-Bold.ttf`).buffer as ArrayBuffer, name: 'Inter', style: 'normal', weight: 700 },
				],
				height: 630,
				width: 1200,
			},
		);
	}

	return new ImageResponse(
		<OpenGraphLinesDynamic
			color={lineData.color}
			localities={localitiesForLine}
			longName={lineData.long_name}
			shortName={lineData.short_name}
			textColor={lineData.text_color}
		/>,
		{
			fonts: [
				{ data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-Medium.ttf`).buffer as ArrayBuffer, name: 'Inter', style: 'normal', weight: 500 },
				{ data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-SemiBold.ttf`).buffer as ArrayBuffer, name: 'Inter', style: 'normal', weight: 600 },
				{ data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-Bold.ttf`).buffer as ArrayBuffer, name: 'Inter', style: 'normal', weight: 700 },
			],
			height: 630,
			width: 1200,
		},
	);

	//
}
