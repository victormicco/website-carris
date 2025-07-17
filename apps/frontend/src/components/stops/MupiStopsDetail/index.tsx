'use client';

/* * */

import { StopsDetailAlerts } from '@/components/stops/StopsDetailAlerts';
import { StopsDetailContent } from '@/components/stops/StopsDetailContent';
import { StopsDetailHeader } from '@/components/stops/StopsDetailHeader';

/* * */

export function MupiStopsDetail() {
	return (
		<>
			<StopsDetailHeader />
			<StopsDetailAlerts />
			<StopsDetailContent />
			{/* TODO */}
			{/* <StopDetailMetrics /> */}
		</>
	);
}
