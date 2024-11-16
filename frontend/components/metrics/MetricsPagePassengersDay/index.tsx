'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { MetricsCardToday } from '@/components/metrics/MetricsCardToday';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function MetricsPagePassengersDay() {
	//

	//
	// A. Fetch Data

	const t = useTranslations('metrics.MetricsPagePassengersDay');

	//
	// B. Render components

	return (
		<>

			<h3>Na área metropolitana de Lisboa:</h3>
			<MetricsCardToday />

			<h3>Por área:</h3>
			<Grid columns="ab" withGap>
				<MetricsCardToday />
				<MetricsCardToday />
				<MetricsCardToday />
				<MetricsCardToday />
			</Grid>

		</>
	);

	//
}
