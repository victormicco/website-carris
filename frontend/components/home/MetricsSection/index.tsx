'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import MetricsCardYearToDate from '@/components/metrics/MetricsCardYearToDate';
import { BreakpointSwitch } from '@/components/responsive/BreakpointSwitch';
import { Routes } from '@/utils/routes';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function MetricsSection() {
	//

	//
	// A. Setup variables

	const t = useTranslations('HomeMetricsSection');

	//
	// B. Render components

	return (
		<Surface variant="standout">
			<Section heading={t('heading')} withPadding>
				<Grid columns="a" withGap>
					<BreakpointSwitch
						desktop={(
							<Grid columns="ab" withGap>
								<MetricsCardYearToDate className={styles.ytd} />
								<Link className={styles.goToMetrics} href={Routes.METRICS.route}>
									Abrir métricas completas ›
								</Link>
							</Grid>
						)}
						mobile={(
							<div className={styles.mobileContainer}>
								<div className={styles.cardContainer}>
									<MetricsCardYearToDate className={styles.ytd} />
								</div>
								<Link className={styles.goToMetrics} href={Routes.METRICS.route}>
									Abrir métricas completas ›
								</Link>
							</div>
						)}
					/>
				</Grid>
			</Section>
		</Surface>
	);

	//
}
