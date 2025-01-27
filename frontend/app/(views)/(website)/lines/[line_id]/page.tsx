/* * */

import { LinesDetail } from '@/components/lines/LinesDetail';
import { LinesDetailContextProvider } from '@/contexts/LinesDetail.context';
import { Metadata } from 'next';

/* * */

export async function generateMetadata({ params }) {
	const data = await params;
	try {
		const id = await data.line_id;
		const newsData = await fetch(`https://api.carrismetropolitana.pt/lines/${id}`).then(res => res.json());

		return {
			description: newsData.long_name,
			openGraph: {
				description: newsData.localities,
				title: newsData.long_name,
			},
			title: newsData.long_name,
		};
	}
	catch (error) {
		console.error('There was an error loading the page metadata: ', error);
		return {
			description: 'Linhas',
			openGraph: {
				description: 'Linhas',
				title: 'CMetropolitana - Linhas',
			},
			title: 'Linhas',
		};
	}
}

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
