'use client';

/* * */

import { Surface } from '@/components/layout/Surface';
import { allResultsCardData, Survery2024ResultsCardSchema } from '@/components/survey-2024/_data/Results/cards';
import { Survey2024ResultCard } from '@/components/survey-2024/Survey2024ResultCard';
import { Accordion, AccordionControl } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Survey2024ResultsToolbar } from '../Survey2024ResultsToolbar';
import styles from './styles.module.css';

/* * */

export function Survey2024LevelResults() {
	//

	//
	// A. Setup variables

	const t = useTranslations('survey-2024.Survey2024ResultsCard');

	const [search, setSearch] = useState<Survery2024ResultsCardSchema[]>([]);

	// B . Fetch Data
	const allData = allResultsCardData;
	const allPublicInfoData = allData.filter(item => item._group === 'info_ao_publico');
	const allNetworkData = allData.filter(item => item._group === 'info_rede');
	const allStopsData = allData.filter(item => item._group === 'info_stops');
	const allBusData = allData.filter(item => item._group === 'info_bus');
	const allSupportData = allData.filter(item => item._group === 'info_support');

	//

	// C. Handle Actions

	const handleFilterData = (search: string, category: string, avaliationValue: number) => {
		let filteredResults = allData;

		if (!allData) return;

		if (!search && !category && avaliationValue === 0) {
			setSearch(allData);
			return;
		}

		if (search) {
			filteredResults = filteredResults.filter(item => item.content.description.toLowerCase().includes(search.toLowerCase()));
		}

		if (category) {
			filteredResults = filteredResults.filter(item => item._group.toLowerCase().includes(category.toLowerCase()));
		}

		if (avaliationValue !== 0) {
			filteredResults = filteredResults.filter(item => item.header.value.includes(avaliationValue?.toString() || ''));
		}

		setSearch(filteredResults);
	};

	//
	// D. Render components

	return (
		<div id="results">
			<Surface forceOverflow>
				<Accordion defaultValue="results">
					<Accordion.Item value="results">
						<Accordion.Control>
							<h2 className={styles.heading}>{t('heading')}</h2>
						</Accordion.Control>
						<Accordion.Panel>
							<Survey2024ResultsToolbar handleSearch={handleFilterData} />
							<div className={styles.cardWrapper}>
								{search.length === allData.length || search.length !== 0
									? search.map((item, index) => (
										<Survey2024ResultCard
											key={index}
											cardData={item}
										/>
									))
									: (
										<>
											<Accordion>
												<Accordion.Item value="public-info-cards">
													<AccordionControl>Informação ao Público</AccordionControl>
													<Accordion.Panel>
														{allPublicInfoData.map((item, index) => (
															<Survey2024ResultCard
																key={index}
																cardData={item}
															/>
														))}
													</Accordion.Panel>
												</Accordion.Item>
											</Accordion>
											<Accordion>
												<Accordion.Item value="network-cards">
													<AccordionControl>Rede</AccordionControl>
													<Accordion.Panel>
														{allNetworkData.map((item, index) => (
															<Survey2024ResultCard
																key={index}
																cardData={item}
															/>
														))}
													</Accordion.Panel>
												</Accordion.Item>
											</Accordion>
											<Accordion>
												<Accordion.Item value="stops-cards">
													<AccordionControl>Paragens</AccordionControl>
													<Accordion.Panel>
														{allStopsData.map((item, index) => (
															<Survey2024ResultCard
																key={index}
																cardData={item}
															/>
														))}
													</Accordion.Panel>
												</Accordion.Item>
											</Accordion>
											<Accordion>
												<Accordion.Item value="bus-cards">
													<AccordionControl>Frota</AccordionControl>
													<Accordion.Panel>
														{allBusData.map((item, index) => (
															<Survey2024ResultCard
																key={index}
																cardData={item}
															/>
														))}
													</Accordion.Panel>
												</Accordion.Item>
											</Accordion>
											<Accordion>
												<Accordion.Item value="support-cards">
													<AccordionControl>Suporte</AccordionControl>
													<Accordion.Panel>
														{allSupportData.map((item, index) => (
															<Survey2024ResultCard
																key={index}
																cardData={item}
															/>
														))}
													</Accordion.Panel>
												</Accordion.Item>
											</Accordion>
										</>
									)}
							</div>
						</Accordion.Panel>
					</Accordion.Item>
				</Accordion>

			</Surface>
		</div>
	);

	//
}
