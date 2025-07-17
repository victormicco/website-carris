'use client';

/* * */

import { MupiStopsDetailAlerts } from '@/components/stops/MupiStopsDetailAlerts';
import { MupiStopsDetailHeader } from '@/components/stops/MupiStopsDetailHeader';
import { StopsDetailContent } from '@/components/stops/StopsDetailContent';

/* * */

export function MupiStopsDetail() {
	return (
		<>
			<MupiStopsDetailHeader />
			<MupiStopsDetailAlerts />
			<StopsDetailContent />
			{/* TODO */}
			{/* <StopDetailMetrics /> */}
		</>
	);
}
