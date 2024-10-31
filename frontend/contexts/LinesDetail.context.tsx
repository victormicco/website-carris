'use client';

/* * */

import type { SimplifiedAlert } from '@/types/alerts.types';
import type { DemandMetrics } from '@/types/metrics.types';
import type { Line, Pattern, Route, Shape, Stop } from '@carrismetropolitana/api-types/network';

import { useLinesContext } from '@/contexts/Lines.context';
import { useOperationalDayContext } from '@/contexts/OperationalDay.context';
import { useProfileContext } from '@/contexts/Profile.context';
import { ServiceMetrics } from '@/types/metrics.types';
import { Routes } from '@/utils/routes';
import { useQueryState } from 'nuqs';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

import { useAlertsContext } from './Alerts.context';
import { useStopsContext } from './Stops.context';

/* * */

interface LinesDetailContextState {
	actions: {
		setActivePattern: (patternGroupId: string) => void
		setActiveStop: (sequence: number, stop: Stop) => void
		setActiveStopByStopId: (sequence: number, stopId: string) => void
		setDrawerOpen: (isOpen: boolean) => void
	}
	data: {
		active_alerts: null | SimplifiedAlert[]
		active_pattern_group: null | Pattern
		active_shape: null | Shape
		active_stop: {
			sequence: number
			stop: Stop
		} | null
		all_patterns: null | Pattern[][]
		all_routes: Route[] | undefined
		demand: DemandMetrics | null
		drawer_open: boolean
		line: Line | null
		service: ServiceMetrics[] | undefined
		timetable: string
		valid_pattern_groups: null | Pattern[]
	}
	filters: {
		// active_pattern_version_id: null | string
		active_pattern_id: null | string
		active_stop_id: null | string
	}
	flags: {
		is_favorite: boolean
		is_loading: boolean
	}
}

/* * */

const LinesDetailContext = createContext<LinesDetailContextState | undefined>(undefined);

export function useLinesDetailContext() {
	const context = useContext(LinesDetailContext);
	if (!context) {
		throw new Error('useLinesDetailContext must be used within a LinesDetailContextProvider');
	}
	return context;
}

/* * */

export const LinesDetailContextProvider = ({ children, lineId }) => {
	//

	//
	// A. Setup variables

	const linesContext = useLinesContext();
	const stopsContext = useStopsContext();
	const alertsContext = useAlertsContext();
	const profileContext = useProfileContext();
	const operationalDayContext = useOperationalDayContext();

	// const [dataRoutesState, setDataRoutesState] = useState<null | Route[]>(null);
	const [dataAllPatternsState, setDataAllPatternsState] = useState<null | Pattern[][]>(null);
	const [dataValidPatternsState, setDataValidPatternsState] = useState<null | Pattern[]>(null);
	const [dataDemandForCurrentLineState, setDataDemandForCurrentLineState] = useState<DemandMetrics | null>(null);

	const [dataActiveAlertsState, setDataActiveAlertsState] = useState<null | SimplifiedAlert[]>(null);
	const [dataActivePatternState, setDataActivePatternState] = useState<null | Pattern>(null);
	const [dataActiveShapeState, setDataActiveShapeState] = useState<null | Shape>(null);
	const [dataServiceMetricsState, setDataServiceMetricsState] = useState<ServiceMetrics[]>();
	const [dataActiveStopState, setDataActiveStopState] = useState<{ sequence: number, stop: Stop } | null>(null);

	const [flagIsFavoriteState, setFlagIsFavoriteState] = useState<boolean>(false);

	const [dataDrawerOpenState, setDataDrawerOpenState] = useState<boolean>(false);

	const [filterActivePatternIdState, setFilterActivePatternIdState] = useQueryState('active_pattern_id');
	// const [filterActivePatternIdState, setFilterActivePatternIdState] = useQueryState('active_pattern_version_id');
	const [filterActiveStopIdState, setFilterActiveStopIdState] = useQueryState('active_stop_id');

	//
	// B. Fetch data

	const { data: allDemandByLineData } = useSWR<DemandMetrics[], Error>(`${Routes.API}/metrics/demand/by_line`);

	const dataLineState = useMemo<Line | undefined>(() => {
		const lineData = linesContext.actions.getLineDataById(lineId);
		const serviceMetrics = linesContext.actions.getServiceMetricsByLineId(lineId);
		setDataServiceMetricsState(serviceMetrics);
		if (!lineData) return;
		else return lineData;
	}, [lineId, linesContext.data.lines, linesContext.data.service_metrics]);

	const dataRoutesState = useMemo<Route[] | undefined>(() => {
		if (!dataLineState) return;
		const lineRoutesData: Route[] = [];
		dataLineState.route_ids.forEach((routeId) => {
			const routeData = linesContext.actions.getRouteDataById(routeId);
			if (!routeData) return;
			lineRoutesData.push(routeData);
		});
		return lineRoutesData;
	}, [dataLineState, linesContext.data.routes]);

	useEffect(() => {
		(async () => {
			try {
				if (!dataLineState) return;
				const fetchPromises = dataLineState.pattern_ids.map((patternId) => {
					return fetch(`${Routes.API}/patterns/${patternId}`)
						.then(response => response.json())
						.then((patternData) => {
							return patternData.map((patternGroup) => {
								patternGroup.path = patternGroup.path.map((waypoint) => {
									const stopData = stopsContext.actions.getStopById(waypoint.stop_id);
									if (!stopData) return waypoint;
									return { ...waypoint, stop: stopData };
								});
								return patternGroup;
							});
						});
				});
				const resultData = await Promise.all(fetchPromises);
				setDataAllPatternsState(resultData);
			}
			catch (error) {
				console.error('Error fetching pattern data:', error);
			}
		})();
	}, [dataLineState, stopsContext.data.stops]);

	/**
	 * TASK: Fetch shape data for the active trip.
	 * WHEN: The `dataActivePatternState` changes.
	 */
	useEffect(() => {
		if (!dataActivePatternState) return;
		(async () => {
			try {
				const shapeData = await fetch(`${Routes.API}/shapes/${dataActivePatternState.shape_id}`).then((response) => {
					if (!response.ok) console.log(`Failed to fetch shape data for shapeId: ${dataActivePatternState.shape_id}`);
					else return response.json();
				});
				if (shapeData) {
					shapeData.geojson = {
						...shapeData.geojson,
						properties: {
							color: dataActivePatternState.color,
							text_color: dataActivePatternState.text_color,
						},
					};
				}
				setDataActiveShapeState(shapeData);
			}
			catch (error) {
				console.error('Error fetching shape data:', error);
			}
		})();
	}, [dataActivePatternState]);

	//
	// C. Transform data

	useEffect(() => {
		setFlagIsFavoriteState(profileContext.data.profile?.favorite_lines?.includes(lineId) ? true : false);
	}, [profileContext.data.profile?.favorite_lines, lineId]);

	useEffect(() => {
		if (!dataAllPatternsState || !operationalDayContext.data.selected_day) return;
		const activePatterns: Pattern[] = [];
		for (const pattern of dataAllPatternsState) {
			for (const patternGroup of pattern) {
				const selected_date = operationalDayContext.data.selected_day;
				if (!selected_date) return;

				// Find the closest valid date
				const closest_date = patternGroup.valid_on.reduce((acc, curr) => {
					if (selected_date <= curr && (acc === '' || curr < acc)) return curr;

					return acc;
				}, '');

				// If the closest date is valid, add the pattern group to the list
				if (closest_date != '' && !activePatterns.find(activePattern => activePattern.id === patternGroup.id)) {
					activePatterns.push(patternGroup);
				}
			}
		}
		setDataValidPatternsState(activePatterns);
		if (!dataActivePatternState) {
			setDataActivePatternState(activePatterns[0] || null);
		}
	}, [dataAllPatternsState, operationalDayContext.data.selected_day]);

	useEffect(() => {
		if (!alertsContext.data.simplified) return;
		const activeAlerts = alertsContext.data.simplified.filter((simplifiedAlertData) => {
			return simplifiedAlertData.informed_entity.some((informedEntity) => {
				// Skip if no routeId and no stopId in line
				if (!informedEntity.routeId && !informedEntity.stopId) return false;
				// Check if the alert is active and has a matching route
				const hasMatchingRoute = dataLineState?.route_ids.includes(informedEntity.routeId || '');
				const isActive = simplifiedAlertData.end_date ? simplifiedAlertData.end_date >= new Date() : true;
				return hasMatchingRoute && isActive;
			});
		});
		setDataActiveAlertsState(activeAlerts);
	}, [alertsContext.data.simplified, lineId]);

	useEffect(() => {
		if (!allDemandByLineData) return;
		const demandForCurrentLine = allDemandByLineData.find(demandByLineItem => demandByLineItem.item_id === dataLineState?.id);
		setDataDemandForCurrentLineState(demandForCurrentLine || null);
	}, [allDemandByLineData, lineId]);

	//
	// D. Handle actions

	const setActivePattern = (patternGroupId: string) => {
		for (const patternGroup of dataValidPatternsState || []) {
			if (patternGroup.version_id === patternGroupId) {
				setDataActivePatternState(patternGroup);
				setFilterActivePatternIdState(patternGroup.id);
				return;
			}
		}
		setDataActivePatternState(null);
	};

	const setActiveStop = (sequence: number, stop: Stop) => {
		setDataActiveStopState({ sequence, stop });
		setFilterActiveStopIdState(stop.id);
	};

	const setActiveStopByStopId = (sequence: number, stopId: string) => {
		const stopData = stopsContext.actions.getStopById(stopId);
		if (!stopData) return;
		setDataActiveStopState({ sequence, stop: stopData });
		setFilterActiveStopIdState(stopId);
	};

	const setDrawerOpen = (isOpen: boolean) => {
		setDataDrawerOpenState(isOpen);
	};

	//
	// E. Handle Filters State
	useEffect(() => {
		if (filterActivePatternIdState) {
			for (const patternGroup of dataValidPatternsState || []) {
				if (patternGroup.id === filterActivePatternIdState) {
					setDataActivePatternState(patternGroup);
					return;
				}
			}
		}
	}, [dataValidPatternsState]);

	useEffect(() => {
		const sortedStops = dataActivePatternState?.path.sort((a, b) => a.stop_sequence - b.stop_sequence);
		if (!sortedStops) return;
		const selectedStop = filterActiveStopIdState
			? sortedStops.find(waypoint => waypoint.stop_id === filterActiveStopIdState) ?? sortedStops[0]
			: sortedStops[0];
		if (selectedStop) {
			const stopData = stopsContext.actions.getStopById(selectedStop.stop_id);
			if (!stopData) return;
			setActiveStop(selectedStop.stop_sequence, stopData);
		}
	}, [dataActivePatternState, dataValidPatternsState]);

	//
	// F. Define context value

	const contextValue: LinesDetailContextState = {
		actions: {
			setActivePattern,
			setActiveStop,
			setActiveStopByStopId,
			setDrawerOpen,
		},
		data: {
			active_alerts: dataActiveAlertsState,
			active_pattern_group: dataActivePatternState,
			active_shape: dataActiveShapeState,
			active_stop: dataActiveStopState,
			all_patterns: dataAllPatternsState,
			all_routes: dataRoutesState,
			demand: dataDemandForCurrentLineState,
			drawer_open: dataDrawerOpenState,
			line: dataLineState || null,
			service: dataServiceMetricsState,
			timetable: '',
			valid_pattern_groups: dataValidPatternsState,
		},
		filters: {
			active_pattern_id: filterActivePatternIdState,
			active_stop_id: filterActiveStopIdState,
		},
		flags: {
			is_favorite: flagIsFavoriteState,
			is_loading: linesContext.flags.is_loading || stopsContext.flags.is_loading || dataRoutesState === null || dataAllPatternsState === null,
		},
	};

	//
	// F. Render components

	return (
		<LinesDetailContext.Provider value={contextValue}>
			{children}
		</LinesDetailContext.Provider>
	);

	//
};
