'use client';

/* * */

import { BackButton } from '@/components/common/BackButton';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function MetricsPageIntro() {
	//

	//
	// A. Fetch Data

	const t = useTranslations('metrics.MetricsPageIntro');

	//
	// B. Render components

	return (
		<>

			<Surface>
				<Section withBottomDivider withPadding>
					<BackButton href="/" />
				</Section>
				<Section heading={t('heading')} withGap withPadding>
					<p className={styles.text}>{t('text_1')}</p>
					<p className={styles.text}>{t('text_2')}</p>
				</Section>
			</Surface>

		</>
	);

	//
}
