/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { MetricsContactsPage2024CardGroup } from '@/components/metrics/MetricsPageContactsCardGroup';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function MetricsPageContacts() {
	//

	//
	// A. Setup variables
	const t = useTranslations('metrics.MetricsPageContacts');
	//
	// B. Render components

	return (
		<Surface>
			<div id="contactsMetrics">
				<Section heading={t('heading')} withPadding="desktop" withGap>
					<div className={styles.description}>
						<p>{t('text1')} </p>
					</div>
					<div className={styles.container}>
						<MetricsContactsPage2024CardGroup groupId="passageiros" />
					</div>
				</Section>
			</div>
		</Surface>

	);

	//
}
