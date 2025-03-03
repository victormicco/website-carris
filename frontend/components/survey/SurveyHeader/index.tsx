/* * */

import Button from '@/components/common/Button';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { IconArrowRight, IconDownload } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */
export function SurveyHeader() {
	//

	//
	// A. Setup variables

	const t = useTranslations('survey.SurveyHeader');

	//
	// B. Render components

	return (
		<Surface>
			<Section withGap withPadding>
				<p className={styles.SurveyTitle}>{t('title')}</p>
				<p className={styles.SurveySubtitle}>{t('subtitle')}</p>
				<div className={styles.anchorButtonsContainer}>
					<Button href="#aboutSurvey" label={t('AnchorAboutSurvey')} rightIcon={<IconArrowRight className={styles.iconRight} />} />
					<Button href="#passangerChacterization" label={t('AnchorPassengerCaracter')} rightIcon={<IconArrowRight className={styles.iconRight} />} />
					<Button href="#recomendationIndex" label={t('AnchorIndex')} rightIcon={<IconArrowRight className={styles.iconRight} />} />
					<Button href="#results" label={t('AnchorResults')} rightIcon={<IconArrowRight className={styles.iconRight} />} />
				</div>
				<div className={styles.downloadButtonContainer}>
					<Button className={styles.downloadButton} icon={<IconDownload size={20} />} label={t('AnchorAboutSurveyTitle')} />
				</div>
			</Section>
			<div className={styles.cardContainer}>
				<div className={styles.globalSatisfactionText}>
					<p>{t('heading')}</p>
				</div>
				<div className={styles.header}>
					<div className={styles.leftColumn}>
						<div className={styles.squircle}>
							<div className={styles.circledNumber}>
								<div className={styles.blurredCircle} />
								<p className={styles.headerNumber}>{t('value')}</p>
							</div>
						</div>
					</div>
					<div className={styles.rightColumn}>
						<p className={styles.headerTitle}>{t('legend')}</p>
					</div>
				</div>

			</div>
		</Surface>
	);

	//
}
