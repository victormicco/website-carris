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

	//
	// D. Render components

	return {
		description: `Horários em tempo real na paragem #${stopData?.id}`,
		title: stopData?.long_name,
	};

	//
}

/* * */

export default async function Page({ params }) {
	//

	//
	// A. Setup variables

	const { stop_id } = await params;

	//
	// B. Render components

	return (
		<StopsDetailContextProvider stopId={stop_id}>
			<StopsDetail />
		</StopsDetailContextProvider>
	);

	//
}
