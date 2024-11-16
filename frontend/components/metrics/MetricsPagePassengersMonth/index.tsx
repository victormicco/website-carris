'use client';

/* * */

import { MetricsCardToday } from '@/components/metrics/MetricsCardToday';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function MetricsPagePassengersMonth() {
	//

	//
	// A. Fetch Data

	const t = useTranslations('metrics.MetricsPagePassengersMonth');

	//
	// B. Render components

	return (
		<>

			<MetricsCardToday />

		</>
	);

	//
}
