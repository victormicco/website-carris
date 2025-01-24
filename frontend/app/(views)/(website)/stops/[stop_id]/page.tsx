/* * */

import { StopsDetail } from '@/components/stops/StopsDetail';
import { StopsDetailContextProvider } from '@/contexts/StopsDetail.context';
import { Metadata } from 'next';

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
export const metadata: Metadata = {
	openGraph: {
		description: 'Paragens',
		title: 'CMetropolitana - Paragens',
	},
};
