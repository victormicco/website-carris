/* * */

import { PortalSchoolDetail } from '@/components/update-portal/PortalSchoolDetail';

/* * */

export default async function Page({ params }) {
	//

	//
	// A. Setup variables

	const { school_id } = await params;

	//
	// B. Render components

	return <PortalSchoolDetail schoolId={school_id} />;

	//
}
