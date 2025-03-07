'use client';
/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { MetricsPageContactsHeader } from '@/components/metrics/MetricsPageContactHeader';
import { MetricsContactsPage2024CardGroup } from '@/components/metrics/MetricsPageContactsCardGroup';
import { MetricsPageContactsToolbar } from '@/components/metrics/MetricsPageContactsToolbar';
import { Routes } from '@/utils/routes';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
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
	const [filtered_data, setFilteredData] = useState<Complaints[]>([]);

	//
	const t = useTranslations('metrics.MetricsPageContacts');

	const { data: allComplaintsData } = useSWR(`${Routes.API}/metrics/complaints/`);

	//
	// B. Fetch Data

	function handleDataSetup() {
		if (!allComplaintsData) return;

		const lineComplaints = allComplaintsData.filter(item => item.type === 'line');
		const globalComplaints = allComplaintsData.filter(item => item.type === 'global');
		const municipalComplaints = allComplaintsData.filter(item => item.type === 'municipality');

		console.log(municipalComplaints);

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
	}, [allComplaintsData, filter_type]);
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
						<MetricsPageContactsToolbar filter_type={handleFilterChange} />
						<MetricsPageContactsHeader data={filtered_data} />
						<MetricsContactsPage2024CardGroup data={filtered_data} />
						{/* <MetricsContactsCards data={allComplaintsData} />
					*/}
					</div>
				</Section>
			</div>
		</Surface>

	);

	//
}
