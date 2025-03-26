'use client';
/* * */
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { MetricsPageContactsGlobalCard } from '@/components/metrics/MetricsPageContactGlobalCard';
import { MetricsContactsPageCardGroup } from '@/components/metrics/MetricsPageContactsCardGroup';
import { MetricsPageContactsToolbar } from '@/components/metrics/MetricsPageContactsToolbar';
import { useLinesContext } from '@/contexts/Lines.context';
import { useLocationsContext } from '@/contexts/Locations.context';
import { Routes } from '@/utils/routes';
import { Complaints, DemandMetricsByAgency, DemandMetricsByAgencyMonth, DemandMetricsByLine } from '@carrismetropolitana/api-types/metrics';
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
		lineColor: '',
		lineComplaints: [] as Complaints[],
		municipalComplaints: [] as Complaints[],
		municipalityName: '',
		totalPassengersLastWeek: 0,
		totalPassengersLastWeekLineId: 0,
	});

	const todayStr = DateTime.local().toISODate();
	const sevenDaysAgoStr = DateTime.local().minus({ days: 7 }).toISODate();

	const { data: demandMetricsByAgencyMonthData } = useSWR<DemandMetricsByAgency[]>(`${Routes.API}/metrics/demand/by_agency/month`);
	const { data: demandMetricsByLineMonthData } = useSWR<DemandMetricsByLine[]>(`${Routes.API}/metrics/demand/by_line`);
	const { data: allComplaintsData } = useSWR(`${Routes.API}/metrics/complaints/`);

	const t = useTranslations('metrics.MetricsPageContacts');

	const linesContext = useLinesContext();
	const locationsContext = useLocationsContext();

	//
	// B. Fetch data

	useEffect(() => {
		if (!demandMetricsByAgencyMonthData || demandMetricsByAgencyMonthData.length === 0) return;
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
		if (!demandMetricsByLineMonthData || demandMetricsByLineMonthData.length === 0 || state.filter_type !== 'line' || !state.filter_value) return;
		const byLastWeekData = demandMetricsByLineMonthData.flatMap((lineBlock) => {
			return (lineBlock.by_day).filter((record) => {
				return record.day >= sevenDaysAgoStr && record.day <= todayStr && lineBlock.line_id === state.filter_value;
			});
		});
		setState(prevState => ({
			...prevState,
			totalPassengersLastWeekLineId: byLastWeekData.reduce((acc, block) => acc + block.qty, 0),
		}));
	}, [demandMetricsByLineMonthData, state.filter_type, state.filter_value]);

	useEffect(() => {
		if (!allComplaintsData) return;
		const line_complaints = allComplaintsData.filter(item => item.type === 'line' && item.filter_value === state.filter_value);
		const municipal_complaints = allComplaintsData.filter(item => item.type === 'municipality' && item.filter_value === state.filter_value);
		const global_complaints = allComplaintsData.filter(item => item.type === 'global' && item.filter_value === '-');

		const lineColor = linesContext.data.lines.find(line => line.id === state.filter_value)?.color || '';
		const municipalityName = locationsContext.data.municipalities.find(municipality => municipality.id === state.filter_value)?.name || '';

		setState(prevState => ({
			...prevState,
			filtered_data: prevState.filtered_data.length ? prevState.filtered_data : global_complaints,
			globalComplaints: global_complaints,
			lineColor: lineColor,
			lineComplaints: line_complaints,
			municipalComplaints: municipal_complaints,
			municipalityName: municipalityName,
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
				setState(prevState => ({ ...prevState, filtered_data: prevState.globalComplaints, lineColor: '', municipalityName: '' }));
				break;
			case 'line':
				setState(prevState => ({ ...prevState, filtered_data: prevState.lineComplaints, lineColor: prevState.lineColor, municipalityName: '' }));
				break;
			case 'municipality':
				setState(prevState => ({ ...prevState, filtered_data: prevState.municipalComplaints, lineColor: '', municipalityName: prevState.municipalityName }));
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

	//
	// D. Render components

	return (
		<Surface>
			<div id="contactsMetrics">
				<Section heading={t('heading')} subheading={t('subheading')} withPadding>
					<MetricsPageContactsGlobalCard allData={state.globalComplaints} totalPassengersLastWeek={state.totalPassengersLastWeek} />
					<MetricsPageContactsToolbar allLines={linesContext.data.lines} filter_type={handleFilterChange} filter_value={value => setState(prevState => ({ ...prevState, filter_value: value }))} />
					<MetricsContactsPageCardGroup data={state.filtered_data} filter_type={state.filter_type} filter_value={state.filter_value} lineColor={state.lineColor} municipalityName={state.municipalityName} totalPassengersLastWeek={state.totalPassengersLastWeek} totalPassengersLastWeekLineId={state.totalPassengersLastWeekLineId} />
				</Section>
			</div>
		</Surface>
	);

	//
}
