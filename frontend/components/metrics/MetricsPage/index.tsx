/* * */

import { MetricsPageAboutOpenData } from '@/components/metrics/MetricsPageAboutOpenData';
import { MetricsPageContacts } from '@/components/metrics/MetricsPageContacts';
import { MetricsPageIntro } from '@/components/metrics/MetricsPageIntro';
import { MetricsPageLines } from '@/components/metrics/MetricsPageLines';
import { MetricsPagePassengers } from '@/components/metrics/MetricsPagePassengers';
import { MetricsPageRecords } from '@/components/metrics/MetricsPageRecords';
import { MetricsPageService } from '@/components/metrics/MetricsPageService';

/* * */

export function MetricsPage() {
	return (
		<>
			<MetricsPageIntro />
			<MetricsPageAboutOpenData />
			<MetricsPagePassengers />
			<MetricsPageRecords />
			<MetricsPageLines />
			<MetricsPageService />
			<MetricsPageContacts />
		</>
	);
}
