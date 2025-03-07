'use client';
/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { MetricsPageContactsHeader } from '@/components/metrics/MetricsPageContactHeader';
import { MetricsContactsPage2024CardGroup } from '@/components/metrics/MetricsPageContactsCardGroup';
import { MetricsPageContactsToolbar } from '@/components/metrics/MetricsPageContactsToolbar';
import { useLinesContext } from '@/contexts/Lines.context';
import { useLocationsContext } from '@/contexts/Locations.context';
import { Routes } from '@/utils/routes';
import { Municipality } from '@carrismetropolitana/api-types/locations';
import { Line } from '@carrismetropolitana/api-types/network';
import { useTranslations } from 'next-intl';
import { use, useEffect, useState } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

interface Complaints {
	_id: number
	complaints: number
	email: number
	filter_value: string
	info_request: number
	other: number
	phone: number
	total: number
	type: string
}

export function MetricsPageContacts() {
	//

	//
	// A. Setup variables

	const [filter_type, setFilterType] = useState<string>('global');
	const [filter_value, setFilterValue] = useState<string>('-');
	const [filtered_data, setFilteredData] = useState<Complaints[]>([]);
	const t = useTranslations('metrics.MetricsPageContacts');
	const linesContext = useLinesContext();
	const { data: allComplaintsData } = useSWR(`${Routes.API}/metrics/complaints/`);

	//
	// B. Fetch Data

	function handleDataSetup() {
		if (!allComplaintsData) return;

		const lineComplaints = allComplaintsData.filter(item => item.type === 'line' && item.filter_value === filter_value);

		const municipalComplaints = allComplaintsData.filter(item => item.type === 'municipality' && item.filter_value === filter_value);

		const globalComplaints = allComplaintsData.filter(item => item.type === 'global');

		console.log('DAAAAAAM', municipalComplaints);
		console.log('DAAAAAAM2', filter_type);

		switch (filter_type) {
			case 'global':
				setFilteredData(globalComplaints);
				break;
			case 'line':
				setFilteredData(lineComplaints);
				break;
			case 'municipality':
				setFilteredData(municipalComplaints);
				break;
			default:
		}
	};

	useEffect(() => {
		handleDataSetup();
	}, [allComplaintsData, filter_type, filter_value]);
	//
	// C. Handle Actions

	function handleFilterChange(value: string) {
		if (value === filter_type && !value) {
			setFilterType('global');
		};

		setFilterType(value);
	}

	//
	// D. Render Components
	return (
		<Surface>
			<div id="contactsMetrics">
				<Section heading={t('heading')} withPadding="desktop" withGap>
					<div className={styles.description}>
						<p>{t('text1')} </p>
					</div>
					<div className={styles.container}>
						<MetricsPageContactsToolbar allLines={linesContext.data.lines} filter_type={handleFilterChange} filter_value={setFilterValue} />
						<MetricsPageContactsHeader data={filtered_data} />
						{/* <MetricsContactsPage2024CardGroup data={filtered_data} /> */}
						{/* <MetricsContactsCards data={allComplaintsData} />
					*/}
					</div>
				</Section>
			</div>
		</Surface>

	);

	//
}
