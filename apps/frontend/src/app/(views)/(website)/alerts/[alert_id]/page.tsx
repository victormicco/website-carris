/* * */

import { AlertsDetail } from '@/components/alerts/AlertsDetail';
import { Routes } from '@/utils/routes';
import { Alert } from '@carrismetropolitana/api-types/alerts';
import { type Metadata } from 'next';

/* * */

export async function generateMetadata({ params }): Promise<Metadata> {
	//

	//
	// A. Setup variables

	const { alert_id } = await params;

	//
	// B. Fetch data

	const allAlertsResponse = await fetch(`${Routes.API}/alerts`);
	const allAlertsData: Alert[] = await allAlertsResponse.json();

	//
	// C. Transform data

	const alertData = allAlertsData.find(item => item['alert_id'] === alert_id);

	//
	// D. Render components

	return {
		description: 'Leia o alerta completo em www.cmetropolitana.pt',
		// @ts-expect-error: Improper formatting of API types
		title: alertData?.headerText?.translation.pop()?.text || 'Alerta',
	};

	//
}

/* * */

export default async function Page({ params }) {
	const { alert_id } = await params;
	return <AlertsDetail alertId={alert_id} />;
}
