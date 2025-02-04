/* * */

import { StopsDetail } from '@/components/stops/StopsDetail';
import { StopsDetailContextProvider } from '@/contexts/StopsDetail.context';
import { Routes } from '@/utils/routes';
import { type Stop } from '@carrismetropolitana/api-types/network';
import { type Metadata } from 'next';

/* * */

export async function generateMetadata({ params }): Promise<Metadata> {
	//

	//
	// A. Setup variables

	const { stop_id } = await params;

	//
	// B. Fetch data

	const allStopsResponse = await fetch(`${Routes.API}/stops`);
	const allStopsData: Stop[] = await allStopsResponse.json();

	//
	// C. Transform data

	const stopData = allStopsData.find(item => item.id === stop_id);
	const stopIds = allStopsData.flatMap(item => item.line_ids);
	const goesTrough = allStopsData.find(item => item.line_ids && item.line_ids.some(id => stopIds.includes(id)));
	//
	// D. Render components

	return {
		description: `Horários em tempo real na paragem #${stopData?.id}. Esta paragem cruza as linhas ${goesTrough?.line_ids}`,
		title: stopData?.long_name,
	};

	//
}

/* * */

export default async function Page({ params }) {
	const { stop_id } = await params;
	return (
		<StopsDetailContextProvider stopId={stop_id}>
			<StopsDetail />
		</StopsDetailContextProvider>
	);
}
