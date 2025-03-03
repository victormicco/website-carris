'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { allPassangersCardsData } from '@/components/survey/_data/Passenger/cards';
import { SurveyPasgrCharacterCard } from '@/components/survey/SurveyPasgrCharacterCard';
import { Accordion } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function SurveyLevelPasgrCharacter() {
	//

	//
	// A. Setup variables

	const t = useTranslations('survey.SurveyPsgrCharacterCard');
	const allPassengersCardData = allPassangersCardsData;

	//
	// B. Render components

	return (
		<div id="passangerChacterization">
			<Surface forceOverflow>
				<Accordion defaultValue="passangerChacterization">
					<Accordion.Item value="passangerChacterization">
						<Accordion.Control>
							<h2 className={styles.heading}>{t('heading')}</h2>
						</Accordion.Control>
						<Accordion.Panel>
							<Section withGap>
								<div className={styles.headingWrapper}>
									<h5 className={styles.subheading}>{t('subheading')}</h5>
								</div>
								<div className={styles.contentWrapper}>
									{allPassengersCardData.map((cardData, index) => (
										<SurveyPasgrCharacterCard key={index} cardData={cardData} />
									))}
								</div>
							</Section>
						</Accordion.Panel>
					</Accordion.Item>
				</Accordion>
			</Surface>
		</div>
	);

	//
}
