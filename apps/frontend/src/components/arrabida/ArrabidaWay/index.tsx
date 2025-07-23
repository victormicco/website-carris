
import { Surface } from '@/components/layout/Surface';
import { Section } from '@/components/layout/Section';
import { RegularListItem } from '@/components/layout/RegularListItem';
import { LineDisplay } from '@/components/lines/LineDisplay';
import { Accordion, Text } from '@mantine/core';
import { useLinesContext } from '@/contexts/Lines.context';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

import styles from './styles.module.css';

interface StopData {
	name: string;
	lineIds: string[];
}

interface DestinationData {
	id: string;
	title: string;
	stops: StopData[];
}

export function ArrabidaWay() {
	//
	// A. Setup variables

	const t = useTranslations('arrabida.ArrabidaWay');
	const linesContext = useLinesContext();
	const [openSections, setOpenSections] = useState<string>();

	// Destinations data based on the spreadsheet - now using line IDs
	const destinationsData: DestinationData[] = [
		{
			id: 'praia-albarquel',
			title: 'Praia de Albarquel',
			stops: [
				{
					name: 'Albarquel (N10-4)',
					lineIds: ['4474', '4414', '4415', '4471'],
				},
				{
					name: 'Praia Albarquel',
					lineIds: ['4471', '4414'],
				},
				{
					name: 'Setúbal (ITS)',
					lineIds: ['4415', '4474'],
				},
				{
					name: 'Setúbal (Centro Comercial)',
					lineIds: ['4474'],
				},
			],
		},
		{
			id: 'praia-figueirinha',
			title: 'Praia da Figueirinha',
			stops: [
				{
					name: 'Outão X',
					lineIds: ['4474'],
				},
				{
					name: 'Praia da Figueirinha',
					lineIds: ['4474'],
				},
			],
		},
		{
			id: 'praia-galapos-galapinhos',
			title: 'Praia dos Galápos e Galapinhos',
			stops: [
				{
					name: 'Praia dos Galápos',
					lineIds: ['4477'],
				},
				{
					name: 'Praia dos Galápos (acesso Pedonal)',
					lineIds: ['4477'],
				},
				{
					name: 'Frente Praia dos Galapinhos',
					lineIds: ['4477'],
				},
			],
		},
		{
			id: 'praia-creiro',
			title: 'Praia do Creiro',
			stops: [
				{
					name: 'Praia do Creiro (Parque de Estacionamento)',
					lineIds: ['4470', '4477'],
				},
				{
					name: 'Praia do Creiro',
					lineIds: ['4477'],
				},
				{
					name: 'Setúbal (ITS)',
					lineIds: ['4470'],
				},
			],
		},
	];

	//
	// B. Handle actions

	const handleAccordionChange = (value: string) => {
		setOpenSections(value);
	};

	//
	// C. Render components

	return (
		<div id="how-to-get">
			<Surface>
				<Section heading={t('title')} subheading={t('subtitle')} withPadding withGap>
					<div className={styles.container}>
						{/* Map Section */}
						<div className={styles.mapContainer}>
							<Image 
								src="/assets/arrabidas/arrabida_map.png" 
								alt="Arrabida Way Map" 
								width={400}
								height={600}
								className={styles.mapImage}
							/>
						</div>

						{/* Journey Steps Section */}
						<div className={styles.journeyContainer}>
							<Accordion 
								defaultValue="praia-albarquel"
								value={openSections} 
								onChange={handleAccordionChange}
								className={styles.accordion}
							>
								{destinationsData.map((destination) => (
									<Accordion.Item key={destination.id} value={destination.id} className={styles.accordionItem}>
										<Accordion.Control className={styles.accordionControl}>
											<Text className={styles.stepTitle}>{destination.title}</Text>
										</Accordion.Control>
										<Accordion.Panel className={styles.accordionPanel}>
											{destination.stops.map((stop, stopIndex) => (
												<div key={stopIndex} className={styles.linesWrapper}>
													<span>{stop.name}</span>
													{stop.lineIds.map((lineId, lineIndex) => {
														const lineData = linesContext.actions.getLineDataById(lineId);
														
														return (
															<RegularListItem key={lineIndex} href={`/lines/${lineId}`}>
																<LineDisplay lineData={lineData} />
															</RegularListItem>
														);
													})}
												</div>
											))}
										</Accordion.Panel>
									</Accordion.Item>
								))}
							</Accordion>
						</div>
					</div>
				</Section>
			</Surface>
		</div>
	);

	//
}