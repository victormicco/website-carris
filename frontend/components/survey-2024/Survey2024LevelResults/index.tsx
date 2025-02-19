'use client';

/* * */

import { NoDataLabel } from '@/components/layout/NoDataLabel';
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
	const [hasSearched, setHasSearched] = useState(false);

	// B . Fetch Data
	const allData = allResultsCardData;
	const allPublicInfoData = allData.filter(item => item._group === 'info_ao_publico');
	const allNetworkData = allData.filter(item => item._group === 'info_rede');
	const allStopsData = allData.filter(item => item._group === 'info_stops');
	const allBusData = allData.filter(item => item._group === 'info_bus');
	const allSupportData = allData.filter(item => item._group === 'info_support');

	const allAccordions = [
		{
			data: allPublicInfoData,
			label: 'Público',
			value: 'public-info-cards',
		},
		{
			data: allNetworkData,
			label: 'Rede',
			value: 'network-cards',
		},
		{
			data: allStopsData,
			label: 'Paragens',
			value: 'stops-cards',
		},
		{
			data: allBusData,
			label: 'Autocarros',
			value: 'bus-cards',
		},
		{
			data: allSupportData,
			label: 'Suporte',
			value: 'support-cards',
		},
	];

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
		setHasSearched(true);
	};

	//
	// D. Render components

	const renderAccordion = (data: typeof allAccordions[number]) => {
		return (
			<Accordion>
				<Accordion.Item value={data.value}>
					<AccordionControl>{data.label}</AccordionControl>
					<Accordion.Panel>
						{data.data.map((item, index) => (
							<Survey2024ResultCard key={index} cardData={item} />
						))}
					</Accordion.Panel>
				</Accordion.Item>
			</Accordion>
		);
	};

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
								{search.length !== allData.length
									? search.map((item, index) => (
										<Survey2024ResultCard
											key={index}
											cardData={item}
										/>
									))
									: (
										allAccordions.map(accordion => (
											renderAccordion(accordion)
										))
									)}
							</div>
						</Accordion.Panel>
					</Accordion.Item>
				</Accordion>
				{hasSearched && search.length === 0 && (
					<NoDataLabel text={t('no_data')} withMinHeight />
				)}
			</Surface>
		</div>
	);

	//
}
