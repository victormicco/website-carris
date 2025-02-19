'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { allAboutCardsData } from '@/components/survey-2024/_data/About/cards';
import { Survey2024AboutCard } from '@/components/survey-2024/Survey2024AboutCard';
import { Slider } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function Survey2024LevelAbout() {
	//

	//
	// A. Setup variables

	const t = useTranslations('survey-2024');
	const allAboutCardData = allAboutCardsData;

	//
	// B. Render components

	return (
		<div id="aboutSurvey">
			<Surface>
				<Section withGap withPadding>
					<h2 className={styles.sectionTitle}>{t('Survey2024Header.AnchorAboutSurveyTitle')}</h2>

					<div className={styles.cardSection}>

						{allAboutCardData.map((cardData, index) => (
							<Survey2024AboutCard key={index} cardData={cardData} />
						))}

						<div className={styles.containerStatistics}>
							<div className={styles.header}>
								<p className={styles.headerNumberStatistics}>95,5%</p>
								<p className={styles.headerTitle}>{t('Survey2024AboutCard.confidence_interval')}</p>
							</div>
							<div className={styles.header}>
								<p className={styles.headerNumberStatistics}>1,8%</p>
								<p className={styles.headerTitle}>{t('Survey2024AboutCard.error_margin')}</p>
							</div>
						</div>

						<div className={styles.containerDetails}>
							<div className={styles.header}>
								<p className={styles.headerTitle}>{t('Survey2024AboutCard.details_title')}</p>
							</div>
							<div className={styles.header}>
								<p className={styles.headerTitleDetails}>{t('Survey2024AboutCard.months_title')}</p>
								<p className={styles.headerDescription}>{t('Survey2024AboutCard.months_description')}</p>
							</div>
							<div className={styles.header}>
								<p className={styles.headerTitleDetails}>{t('Survey2024AboutCard.days_title')}</p>
								<p className={styles.headerDescription}>{t('Survey2024AboutCard.days_description')}</p>
							</div>
							<div className={styles.header}>
								<p className={styles.headerTitleDetails}>{t('Survey2024AboutCard.hours_title')}</p>
								<p className={styles.headerDescription}>{t('Survey2024AboutCard.hours_description')}</p>
							</div>
						</div>

					</div>
				</Section>
			</Surface>
		</div>
	);

	//
}
