/* * */

import LinesDetail from '@/components/lines/LinesDetail';
import { LinesDetailContextProvider } from '@/contexts/LinesDetail.context';
import { LinesListContextProvider } from '@/contexts/LinesList.context';

/* * */

export default async function Page({ params }) {
	const { line_id } = await params;

	return (
		<LinesListContextProvider>
			<LinesDetailContextProvider lineId={line_id}>
				<LinesDetail />
			</LinesDetailContextProvider>
		</LinesListContextProvider>
	);
}
