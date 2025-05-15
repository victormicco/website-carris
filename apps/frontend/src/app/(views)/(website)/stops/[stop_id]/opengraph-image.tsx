/* * */

import type { Line, Stop } from '@carrismetropolitana/api-types/network';

import { OpenGraphStopsDefault } from '@/opengraph/OpenGraphStopsDefault';
import { OpenGraphStopsDynamic } from '@/opengraph/OpenGraphStopsDynamic';
import { formatStopLocation } from '@/utils/formatStopLocation';
import { Routes } from '@/utils/routes';
import { ApiResponse } from '@carrismetropolitana/api-types/common';
import { Locality, Municipality } from '@carrismetropolitana/api-types/locations';
import fs from 'fs';
import { ImageResponse } from 'next/og';

/* * */

export default async function Image({ params }) {
	//

	//
	// A. Fetch data

	const allStopsResponse = await fetch(`${Routes.API}/stops`);
	const allStopsData: Stop[] = await allStopsResponse.json();

	const allLinesResponse = await fetch(`${Routes.API}/lines`);
	const allLinesData: Line[] = await allLinesResponse.json();

	const allMunicipalitiesResponse = await fetch(`${Routes.API}/locations/municipalities`);
	const allMunicipalitiesResult: ApiResponse<Municipality[]> = await allMunicipalitiesResponse.json();
	const allMunicipalitiesData = allMunicipalitiesResult.status === 'success' ? allMunicipalitiesResult.data : [];

	const allLocalitiesResponse = await fetch(`${Routes.API}/locations/localities`);
	const allLocalitiesResult: ApiResponse<Locality[]> = await allLocalitiesResponse.json();
	const allLocalitiesData = allLocalitiesResult.status === 'success' ? allLocalitiesResult.data : [];

	//
	// B. Transform data

	const stopData = allStopsData.find(item => item.id === params.stop_id);

	const linesDataForStop = allLinesData.filter(item => stopData?.line_ids.includes(item.id));

	const municipalityDataForStop = allMunicipalitiesData.find(item => item.id === stopData?.municipality_id);
	const localityDataForStop = allLocalitiesData.find(item => item.id === stopData?.locality_id);

	//
	// C. Render components

	if (!stopData || !stopData.long_name) {
		return new ImageResponse(
			<OpenGraphStopsDefault />,
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
		<OpenGraphStopsDynamic
			facilities={stopData.facilities}
			id={params.stop_id}
			lines={linesDataForStop}
			location={formatStopLocation(localityDataForStop?.name, municipalityDataForStop?.name)}
			name={stopData.long_name}
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
