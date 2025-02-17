'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { allAboutCardsData } from '@/components/survey-2024/_data/About/cards';
import { Survey2024AboutCard } from '@/components/survey-2024/Survey2024AboutCard';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function Survey2024LevelAbout() {
	//

	//
	// A. Setup variables

	const t = useTranslations('survey-2024.Survey2024Header');
	const allAboutCardData = allAboutCardsData;

	//
	// B. Render components

	return (
		<div id="aboutSurvey">
			<Surface forceOverflow>
				<Section withGap withPadding>
					<h2 className={styles.sectionTitle}>{t('AnchorAboutSurveyTitle')}</h2>
					{allAboutCardData.map((cardData, index) => (
						<Survey2024AboutCard key={index} cardData={cardData} />
					))};
				</Section>
			</Surface>
		</div>
	);

	//
}
