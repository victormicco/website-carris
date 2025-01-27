/* * */

import { LinesDetail } from '@/components/lines/LinesDetail';
import { LinesDetailContextProvider } from '@/contexts/LinesDetail.context';
import { Routes } from '@/utils/routes';
import { type Line } from '@carrismetropolitana/api-types/network';
import { type Metadata } from 'next';

/* * */

export async function generateMetadata({ params }): Promise<Metadata> {
	//

	//
	// A. Setup variables

	const { line_id } = await params;

	//
	// B. Fetch data

	const allLinesResponse = await fetch(`${Routes.API}/lines`);
	const allLinesData: Line[] = await allLinesResponse.json();

	//
	// C. Transform data

	const lineData = allLinesData.find(item => item.id === line_id);

	//
	// D. Render components

	return {
		description: `Horários em tempo real da linha ${lineData?.short_name}.`,
		title: `${lineData?.short_name} | ${lineData?.long_name}`,
	};

	//
}

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
