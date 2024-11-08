'use client';

/* * */

import type { Line, Route } from '@carrismetropolitana/api-types/network';

import { DemandMetrics, ServiceMetrics } from '@/types/metrics.types';
import { Routes } from '@/utils/routes';
import { createContext, useContext } from 'react';
import useSWR from 'swr';

/* * */

interface LinesContextState {
	actions: {
		getDemandMetricsByLineId: (lineId: string) => DemandMetrics | undefined
		getLineDataById: (lineId: string) => Line | undefined
		getRouteDataById: (routeId: string) => Route | undefined
		getServiceMetricsByLineId: (lineId: string) => ServiceMetrics[] | undefined
	}
	data: {
		demand_metrics: DemandMetrics[]
		lines: Line[]
		routes: Route[]
		service_metrics: ServiceMetrics[]
	}
	flags: {
		is_loading: boolean
	}
}

/* * */

const LinesContext = createContext<LinesContextState | undefined>(undefined);

export function useLinesContext() {
	const context = useContext(LinesContext);
	if (!context) {
		throw new Error('useLinesContext must be used within a LinesContextProvider');
	}
	return context;
}

/* * */

export const LinesContextProvider = ({ children }) => {
	//

	//
	// A. Fetch data

	const { data: allLinesData, isLoading: allLinesLoading } = useSWR<Line[], Error>(`${Routes.API}/lines`);
	const { data: allRoutesData, isLoading: allRoutesLoading } = useSWR<Route[], Error>(`${Routes.API}/routes`);
	const { data: demandByLineData, isLoading: demandByLineDataLoading } = useSWR<DemandMetrics[], Error>(`${Routes.API}/metrics/demand/by_line`);
	const { data: serviceMetricsData, isLoading: serviceMetricsLoading } = useSWR<ServiceMetrics[], Error>(`${Routes.API}/metrics/service/all`);

	//
	// B. Handle actions

	const getLineDataById = (lineId: string) => {
		return allLinesData?.find(line => line.id === lineId);
	};

	const getRouteDataById = (routeId: string) => {
		return allRoutesData?.find(route => route.id === routeId);
	};

	const getDemandMetricsByLineId = (lineId: string) => {
		return demandByLineData?.find(demandMetrics => demandMetrics.item_id === lineId);
	};

	const getServiceMetricsByLineId = (lineId: string) => {
		return serviceMetricsData?.filter(serviceMetrics => serviceMetrics.lineId === lineId);
	};

	//
	// C. Define context value

	const contextValue: LinesContextState = {
		actions: {
			getDemandMetricsByLineId,
			getLineDataById,
			getRouteDataById,
			getServiceMetricsByLineId,
		},
		data: {
			demand_metrics: demandByLineData || [],
			lines: allLinesData || [],
			routes: allRoutesData || [],
			service_metrics: serviceMetricsData || [],
		},
		flags: {
			is_loading: allLinesLoading || allRoutesLoading || demandByLineDataLoading || serviceMetricsLoading,
		},
	};

	//
	// D. Render components

	return (
		<LinesContext.Provider value={contextValue}>
			{children}
		</LinesContext.Provider>
	);

	//
};
