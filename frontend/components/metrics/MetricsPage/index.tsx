/* * */

import { MetricsPageIntro } from '@/components/metrics/MetricsPageIntro';
import { MetricsPageLines } from '@/components/metrics/MetricsPageLines';
import { MetricsPagePassengers } from '@/components/metrics/MetricsPagePassengers';
import { MetricsPageRecords } from '@/components/metrics/MetricsPageRecords';

/* * */

export function MetricsPage() {
	return (
		<>
			<MetricsPageIntro />
			<MetricsPagePassengers />
			<MetricsPageRecords />
			<MetricsPageLines />
		</>
	);
}
