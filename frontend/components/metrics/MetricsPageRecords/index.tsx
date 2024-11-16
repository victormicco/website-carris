'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function MetricsPageRecords() {
	//

	//
	// A. Fetch Data

	const t = useTranslations('metrics.MetricsPageRecords');

	//
	// B. Render components

	return (
		<Surface>

			<Section heading={t('heading')} withPadding>
				<p className={styles.text}>{t('text_1')}</p>
			</Section>

			<Section withPadding>
				<Grid columns="ab" withGap>
					<p>record_1</p>
					<p>record_2</p>
				</Grid>
			</Section>

		</Surface>
	);

	//
}
