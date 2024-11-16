'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function MetricsPageLines() {
	//

	//
	// A. Fetch Data

	const t = useTranslations('metrics.MetricsPageLines');

	//
	// B. Render components

	return (
		<Surface>

			<Section heading={t('heading')} withPadding>
				<p className={styles.text}>{t('text_1')}</p>
			</Section>

		</Surface>
	);

	//
}
