'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { allAboutCardsData } from '@/components/survey/_data/About/cards';
import { SurveyAboutCard } from '@/components/survey/SurveyAboutCard';
import { SurveyAboutCardCriteria } from '@/components/survey/SurveyAboutCardCriteria';
import { SurveyAboutCardPrecision } from '@/components/survey/SurveyAboutCardPrecision';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function SurveyLevelAbout() {
	//

	//
	// A. Setup variables

	const t = useTranslations('survey');
	const allAboutCardData = allAboutCardsData;

	//
	// B. Render components

	return (
		<div id="aboutSurvey">
			<Surface>
				<Section withGap withPadding>
					<h2 className={styles.sectionTitle}>{t('SurveyHeader.AnchorAboutSurveyTitle')}</h2>
					<div className={styles.cardSection}>
						{allAboutCardData.map((cardData, index) => (
							<SurveyAboutCard key={index} cardData={cardData} />
						))}
						<SurveyAboutCardCriteria />
						<SurveyAboutCardPrecision />
					</div>
				</Section>
			</Surface>
		</div>
	);

	//
}
