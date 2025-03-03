'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { NoDataLabel } from '@/components/layout/NoDataLabel';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { allResultsCardData, SurveryResultsCardSchema } from '@/components/survey/_data/Results/cards';
import { SurveyResultCard } from '@/components/survey/SurveyResultCard';
import { Accordion, AccordionControl, Space } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { SurveyResultsToolbar } from '../SurveyResultsToolbar';
import styles from './styles.module.css';

/* * */

export function SurveyLevelResults() {
	//

	//
	// A. Setup variables

	const t = useTranslations('survey.SurveyResultsCard');

	const [filteredData, setFilteredData] = useState<SurveryResultsCardSchema[]>(allResultsCardData);

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

	const handleFilterData = (search: string, category: string, avaliationValue: string) => {
		let filteredResults = allData;

		if (search) {
			filteredResults = filteredResults.filter(item => item.content.description.toLowerCase().includes(search.toLowerCase()));
		}

		if (category) {
			filteredResults = filteredResults.filter(item => item._group.toLowerCase().includes(category.toLowerCase()));
		}

		if (avaliationValue) {
			const [min, max] = JSON.parse(avaliationValue);
			const parsedMin = parseFloat(min.toFixed(2).replace(',', '.'));
			const parsedMax = parseFloat(max.toFixed(2).replace(',', '.'));

			filteredResults = filteredResults.filter((item) => {
				const value = parseFloat(item.header.value.replace(',', '.'));
				return value >= parsedMin && value <= parsedMax;
			});
		}

		setFilteredData(filteredResults);
	};

	//
	// D. Render components

	const renderFilteredData = () => {
		return (
			<div className={styles.cardWrapper}>
				<Grid columns="abc" withGap>
					{filteredData.map((item, index) => (
						<SurveyResultCard key={index} cardData={item} />
					))}
				</Grid>
			</div>
		);
	};

	const renderAllData = () => {
		return (
			<>
				{allAccordions.map(accordion => (
					<Accordion key={accordion.value} defaultValue={accordion.value}>
						<Accordion.Item value={accordion.value}>
							<AccordionControl>{accordion.label}</AccordionControl>
							<Accordion.Panel>
								<div className={styles.cardWrapper}>
									<Grid columns="abc" withGap>
										{accordion.data.map((item, index) => (
											<SurveyResultCard key={index} cardData={item} />
										))}
									</Grid>
								</div>
							</Accordion.Panel>
						</Accordion.Item>
					</Accordion>
				))}
			</>
		);
	};

	return (
		<div id="results">
			<Surface forceOverflow>
				<Section>
					<Accordion defaultValue="results">
						<Accordion.Item value="results">
							<Accordion.Control>
								<h2 className={styles.heading}>{t('heading')}</h2>
							</Accordion.Control>
							<Accordion.Panel>
								<SurveyResultsToolbar handleSearch={handleFilterData} />
								<Space h="md" />
								{filteredData.length === 0 ? (
									<NoDataLabel text={t('no_data')} withMinHeight />
								) : (
									filteredData.length !== allData.length ? renderFilteredData() : renderAllData()
								)}
							</Accordion.Panel>
						</Accordion.Item>
					</Accordion>
				</Section>
				<Section withPadding>
					<div className={styles.resultsFooterInfoWrapper}>
						<p className={styles.resultsFooterInfoText}>{t('footerInfo')}</p>
					</div>
				</Section>
			</Surface>
		</div>
	);

	//
}
