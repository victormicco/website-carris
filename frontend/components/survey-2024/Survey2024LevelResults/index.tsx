'use client';

/* * */

import { Surface } from '@/components/layout/Surface';
import { allResultsCardData } from '@/components/survey-2024/_data/Results/cards';
import { Survey2024ResultCard } from '@/components/survey-2024/Survey2024ResultCard';
import { Accordion } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { Survey2024ResultsToolbar } from '../Survey2024ResultsToolbar';
import styles from './styles.module.css';

/* * */

export function Survey2024LevelResults() {
	//

	//
	// A. Setup variables

	const t = useTranslations('survey-2024.Survey2024ResultsCard');
	const allData = allResultsCardData;

	//
	// B. Render components

	return (
		<div id="results">
			<Surface forceOverflow>
				<Accordion defaultValue="results">
					<Accordion.Item value="results">
						<Accordion.Control>
							<h2 className={styles.heading}>{t('heading')}</h2>
						</Accordion.Control>
						<Accordion.Panel>
							<Survey2024ResultsToolbar data={allData} />
							<div className={styles.cardWrapper}>
								{allData.map((item, index) => (
									<Survey2024ResultCard
										key={index}
										cardData={item}
									/>
								))}
							</div>
						</Accordion.Panel>
					</Accordion.Item>
				</Accordion>
			</Surface>
		</div>
	);

	//
}
