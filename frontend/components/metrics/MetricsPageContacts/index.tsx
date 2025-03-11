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
	const [state, setState] = useState({
		filter_type: 'global',
		filter_value: '-',
		filtered_data: [] as Complaints[],
		globalComplaints: [] as Complaints[],
		lineComplaints: [] as Complaints[],
		municipalComplaints: [] as Complaints[],
		totalPassengersLastWeek: 0,
	});

	const { data: demandMetricsByAgencyMonthData } = useSWR<DemandMetricsByAgency[]>(`${Routes.API}/metrics/demand/by_agency/month`);
	const { data: allComplaintsData } = useSWR(`${Routes.API}/metrics/complaints/`);

	const t = useTranslations('metrics.MetricsPageContacts');
	const linesContext = useLinesContext();
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
		setState(prevState => ({
			...prevState,
			totalPassengersLastWeek: byDayData.reduce((acc, block) => acc + block.qty, 0),
		}));
	}, [demandMetricsByAgencyMonthData]);

	useEffect(() => {
		if (!allComplaintsData) return;

		const line_complaints = allComplaintsData.filter(item => item.type === 'line' && item.filter_value === state.filter_value);
		const municipal_complaints = allComplaintsData.filter(item => item.type === 'municipality' && item.filter_value === state.filter_value);
		const global_complaints = allComplaintsData.filter(item => item.type === 'global' && item.filter_value === '-');

		setState(prevState => ({
			...prevState,
			filtered_data: prevState.filtered_data.length ? prevState.filtered_data : global_complaints,
			globalComplaints: global_complaints,
			lineComplaints: line_complaints,
			municipalComplaints: municipal_complaints,
		}));
	}, [allComplaintsData, state.filter_type, state.filter_value]);

	useEffect(() => {
		handleDataSetup();
	}, [state.filter_type, state.filter_value]);
	//
	// C. Handle actions
	const handleDataSetup = () => {
		if (!allComplaintsData) return;

		switch (state.filter_type) {
			case 'global':
				setState(prevState => ({ ...prevState, filtered_data: prevState.globalComplaints }));
				break;
			case 'line':
				setState(prevState => ({ ...prevState, filtered_data: prevState.lineComplaints }));
				break;
			case 'municipality':
				setState(prevState => ({ ...prevState, filtered_data: prevState.municipalComplaints }));
				break;
			default:
				break;
		}
	};

	const handleFilterChange = (value: string) => {
		setState(prevState => ({
			...prevState,
			filter_type: value || 'global',
		}));
	};

	const renderNoData = () => <NoDataLabel text="No data available" />;
	//
	// D. Render components
	return (
		<Surface>
			{!allComplaintsData && renderNoData()}
			<div id="contactsMetrics">
				<Section heading={t('heading')} subheading={t('subheading')} withPadding>
					<MetricsPageContactsGlobalCard allData={state.globalComplaints} totalPassengersLastWeek={state.totalPassengersLastWeek} />
					<MetricsPageContactsToolbar allLines={linesContext.data.lines} filter_type={handleFilterChange} filter_value={value => setState(prevState => ({ ...prevState, filter_value: value }))} />
					<MetricsContactsPageCardGroup data={state.filtered_data} filter_type={state.filter_type} filter_value={state.filter_value} totalPassengersLastWeek={state.totalPassengersLastWeek} />
				</Section>
			</div>
		</Surface>
	);
	//
}
