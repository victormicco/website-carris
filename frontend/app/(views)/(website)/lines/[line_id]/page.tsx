/* * */

import { LinesDetail } from '@/components/lines/LinesDetail';
import { LinesDetailContextProvider } from '@/contexts/LinesDetail.context';
import { Metadata } from 'next';

/* * */

export default async function Page({ params }) {
	//

	//
	// A. Setup variables

	const { line_id } = await params;

	//
	// B. Render components

	return (
		<LinesDetailContextProvider lineId={line_id}>
			<LinesDetail />
		</LinesDetailContextProvider>
	);

	//
}

export const metadata: Metadata = {
	openGraph: {
		description: 'Linhas',
		title: 'CMetropolitana - Linhas',
	},
};
