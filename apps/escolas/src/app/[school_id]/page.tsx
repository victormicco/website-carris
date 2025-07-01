/* * */

import SchoolInfo from '@/components/SchoolInfo/SchoolInfo';

/* * */

export default async function Page({ params }) {
	//

	//
	// A. Setup variables

	const { school_id } = await params;

	//
	// B. Render components

	return <SchoolInfo school_id={school_id} />;

	//
}
