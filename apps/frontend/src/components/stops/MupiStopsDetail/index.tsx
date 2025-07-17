'use client';

/* * */

import { MupiStopsDetailAlerts } from '@/components/stops/MupiStopsDetailAlerts';
import { MupiStopsDetailContent } from '@/components/stops/MupiStopsDetailContent';
import { MupiStopsDetailHeader } from '@/components/stops/MupiStopsDetailHeader';

/* * */

export function MupiStopsDetail() {
	return (
		<>
			<MupiStopsDetailHeader />
			<MupiStopsDetailAlerts />
			<MupiStopsDetailContent />
			{/* TODO */}
			{/* <StopDetailMetrics /> */}
		</>
	);
}
