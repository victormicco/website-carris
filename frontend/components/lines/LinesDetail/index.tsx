'use client';

/* * */

import { LinesDetailAlerts } from '@/components/lines/LinesDetailAlerts';
import { LinesDetailHeader } from '@/components/lines/LinesDetailHeader';
import { LinesDetailMetrics } from '@/components/lines/LinesDetailMetrics';
import { LinesDetailPath } from '@/components/lines/LinesDetailPath';
import { useQueryState } from 'nuqs';

/* * */

export function LinesDetail() {
	//

	//
	// A. Setup variables

	const [isMetricsEnabled] = useQueryState('is_metrics_enabled');

	//
	// B. Render components

	return (
		<>
			<LinesDetailHeader />
			<LinesDetailAlerts />
			<LinesDetailPath />
			{isMetricsEnabled === '1' && <LinesDetailMetrics />}
		</>
	);

	//
}
