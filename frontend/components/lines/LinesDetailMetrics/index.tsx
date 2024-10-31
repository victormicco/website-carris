'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { LinesDetailMetricsDemand } from '@/components/lines/LinesDetailMetricsDemand';
import { LinesDetailMetricsService } from '@/components/lines/LinesDetailMetricsService';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';

/* * */

export function LinesDetailMetrics() {
	//

	//
	// A. Setup variables

	const linesDetailContext = useLinesDetailContext();

	//
	// B. Render components

	if (!linesDetailContext.data.line || !linesDetailContext.data.demand) {
		return null;
	}

	return (
		<Grid columns="ab" withGap>
			<LinesDetailMetricsService />
			<LinesDetailMetricsDemand />
		</Grid>
	);

	//
}
