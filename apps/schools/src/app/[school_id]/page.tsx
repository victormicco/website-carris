/* * */

import { SchoolDetail } from '@/components/home/SchoolDetail';

/* * */

export default async function Page({ params }) {
	//

	//
	// A. Setup variables

	const { school_id } = await params;

	//
	// B. Render components

	return <SchoolDetail schoolId={school_id} />;

	//
}
