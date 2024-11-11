/* * */

import AlertsDetail from '@/components/alerts/AlertsDetail';

/* * */

export default async function Page({ params }) {
	//

	//
	// A. Setup variables

	const { alert_id } = await params;

	//
	// B. Render components

	return (
		<AlertsDetail alertId={alert_id} />
	);

	//
}
