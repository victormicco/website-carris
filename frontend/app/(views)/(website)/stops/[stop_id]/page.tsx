/* * */

import { StopsDetail } from '@/components/stops/StopsDetail';
import { StopsDetailContextProvider } from '@/contexts/StopsDetail.context';
import { Metadata } from 'next';

/* * */

export async function generateMetadata({ params }) {
	const data = await params;
	try {
		const id = await data.stop_id;
		const stopData = await fetch(`https://api.carrismetropolitana.pt/stops/${id}`).then(res => res.json());
		const stopAddress = stopData.name + ', ' + stopData.municipality_name;
		return {
			description: stopAddress,
			openGraph: {
				description: stopAddress,
				title: stopData.short_name,
			},
			title: stopData.short_name,
		};
	}
	catch (error) {
		console.error('There was an error loading the page metadata: ', error);
		return {
			description: 'Paragens',
			openGraph: {
				description: 'Paragens',
				title: 'CMetropolitana - Paragens',
			},
			title: 'Paragens',
		};
	}
}

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
export const metadata: Metadata = {
	openGraph: {
		description: 'Paragens',
		title: 'CMetropolitana - Paragens',
	},
};
