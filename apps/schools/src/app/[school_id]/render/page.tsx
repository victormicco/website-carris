/* * */

import { RenderSchoolPdf } from '@/components/home/RenderSchoolPdf';

/* * */

export default async function Page({ params }) {
	//

	//
	// A. Setup variables

	const { school_id } = await params;

	//
	// B. Render components

	return <RenderSchoolPdf schoolId={school_id} />;

	//
}
