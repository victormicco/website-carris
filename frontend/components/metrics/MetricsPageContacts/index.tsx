'use client';
/* * */

import { NoDataLabel } from '@/components/layout/NoDataLabel';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { MetricsPageContactsGlobalCard } from '@/components/metrics/MetricsPageContactGlobalCard';
import { MetricsContactsPageCardGroup } from '@/components/metrics/MetricsPageContactsCardGroup';
import { MetricsPageContactsToolbar } from '@/components/metrics/MetricsPageContactsToolbar';
import { useLinesContext } from '@/contexts/Lines.context';
import { Routes } from '@/utils/routes';
import { Complaints, DemandMetricsByAgency, DemandMetricsByAgencyMonth } from '@carrismetropolitana/api-types/metrics';
import { DateTime } from 'luxon';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
/* * */

export function MetricsPageContacts() {
	//

	//
	// A. Setup variables

	const [filter_type, setFilterType] = useState<string>('global');
	const [filter_value, setFilterValue] = useState<string>('-');
	const [filtered_data, setFilteredData] = useState<Complaints[]>([]);
	const [lineComplaints, setLines] = useState<Complaints[]>([]);
	const [municipalComplaints, setMunicipalities] = useState<Complaints[]>([]);
	const [globalComplaints, setGlobal] = useState<Complaints[]>([]);
	const [totalPassengersLastWeek, setTotalPassengersLastWeek] = useState<number>(0);

	const { data: demandMetricsByAgencyMonthData } = useSWR<DemandMetricsByAgency[]>(`${Routes.API}/metrics/demand/by_agency/month`);
	//
	// B. Fetch Data

	const t = useTranslations('metrics.MetricsPageContacts');
	const linesContext = useLinesContext();
	const { data: allComplaintsData } = useSWR(`${Routes.API}/metrics/complaints/`);
	//
	// B. Fetch Data
	useEffect(() => {
		if (!demandMetricsByAgencyMonthData || demandMetricsByAgencyMonthData.length === 0) return;
		const todayStr = DateTime.local().toISODate();
		const sevenDaysAgoStr = DateTime.local().minus({ days: 7 }).toISODate();
		const byDayData = demandMetricsByAgencyMonthData.flatMap((agencyBlock) => {
			return (agencyBlock.data as DemandMetricsByAgencyMonth[]).filter((record) => {
				return record.day_group >= sevenDaysAgoStr && record.day_group <= todayStr;
			});
		});
		setTotalPassengersLastWeek(byDayData.reduce((acc, block) => acc + block.qty, 0));
	}, [demandMetricsByAgencyMonthData]);

	useEffect(() => {
		if (!allComplaintsData) return;

		const line_complaints = allComplaintsData.filter(item => item.type === 'line' && item.filter_value === filter_value);
		const municipal_complaints = allComplaintsData.filter(item => item.type === 'municipality' && item.filter_value === filter_value);
		const global_complaints = allComplaintsData.filter(item => item.type === 'global' && item.filter_value === '-');

		setLines(line_complaints);
		setMunicipalities(municipal_complaints);
		setGlobal(global_complaints);

		if (!filtered_data.length) {
			setFilteredData(global_complaints);
		}
		else {
			handleDataSetup();
		}
	}, [allComplaintsData, filter_type, filter_value]);

	function handleDataSetup() {
		if (!allComplaintsData) return;

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
				break;
		}
	};
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
	const renderNoData = () => {
		return (
			<NoDataLabel text="No data available" />
		);
	};
	return (
		<Surface>
			<div id="contactsMetrics">
				<Section heading={t('heading')} subheading={t('subheading')} withGap withPadding>
					<MetricsPageContactsGlobalCard allData={globalComplaints} totalPassengersLastWeek={totalPassengersLastWeek} />
					<MetricsPageContactsToolbar allLines={linesContext.data.lines} filter_type={handleFilterChange} filter_value={setFilterValue} />
					<MetricsContactsPageCardGroup data={filtered_data} filter_type={filter_type} filter_value={filter_value} totalPassengersLastWeek={totalPassengersLastWeek} />
				</Section>
			</div>
			{!allComplaintsData && renderNoData()}
		</Surface>
	);
	//
}
