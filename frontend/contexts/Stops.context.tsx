'use client';

/* * */

import { useLocationsContext } from '@/contexts/Locations.context';
import { getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';
import { Routes } from '@/utils/routes';
import { type ExtendStopsWorkerData } from '@/workers/extend-stops.worker';
import { type Stop } from '@carrismetropolitana/api-types/network';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';

/* * */

export interface ExtendedStop extends Stop {
	locality_name?: string
	municipality_name?: string
}

interface StopsContextState {
	actions: {
		getAllStopsGeoJsonFC: () => GeoJSON.FeatureCollection | undefined
		getStopById: (stopId: string) => Stop | undefined
		getStopByIdGeoJsonFC: (stopId: string) => GeoJSON.FeatureCollection | undefined
	}
	data: {
		stops: ExtendedStop[]
	}
	flags: {
		is_loading: boolean
	}
}

/* * */

const StopsContext = createContext<StopsContextState | undefined>(undefined);

export function useStopsContext() {
	const context = useContext(StopsContext);
	if (!context) {
		throw new Error('useStopsContext must be used within a StopsContextProvider');
	}
	return context;
}

/* * */

export const StopsContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const locationsContext = useLocationsContext();

	const workerRef = useRef<null | Worker>(null);
	const [dataParsedStopsState, setDataParsedStopsState] = useState<Stop[]>([]);

	//
	// B. Fetch data

	const { data: allStopsData, isLoading: allStopsLoading } = useSWR<Stop[]>(`${Routes.API}/stops`);

	//
	// C. Transform data

	useEffect(() => {
		// Check if all data is available
		if (!locationsContext.data.localitites || !allStopsData) return;
		// Initialize worker if not already initialized
		if (!workerRef.current) {
			workerRef.current = new Worker(new URL('../workers/extend-stops.worker.ts', import.meta.url));
			workerRef.current.onmessage = (event: MessageEvent<Stop[]>) => setDataParsedStopsState(event.data);
			workerRef.current.onerror = error => console.error('Worker error:', error);
		}
		// Extend data for worker and send message
		const eventMessage: ExtendStopsWorkerData = {
			localities: locationsContext.data.localitites,
			municipalities: locationsContext.data.municipalities,
			stops: allStopsData,
		};
		workerRef.current.postMessage(eventMessage);
		// Cleanup worker
		return () => {
			workerRef.current?.terminate();
			workerRef.current = null;
		};
	}, [locationsContext.data.localitites, allStopsData]);

	//
	// D. Handle actions

	const getStopById = (stopId: string): Stop | undefined => {
		return allStopsData?.find(stop => stop.id === stopId);
	};

	const getAllStopsGeoJsonFC = (): GeoJSON.FeatureCollection | undefined => {
		if (!allStopsData) return;
		const collection = getBaseGeoJsonFeatureCollection();
		allStopsData.forEach((stop) => {
			const stopFC = transformStopDataIntoGeoJsonFeature(stop);
			if (stopFC) collection.features.push(stopFC);
		});
		return collection;
	};

	const getStopByIdGeoJsonFC = (stopId: string): GeoJSON.FeatureCollection | undefined => {
		const stop = getStopById(stopId);
		if (!stop) return;
		const collection = getBaseGeoJsonFeatureCollection();
		const stopFC = transformStopDataIntoGeoJsonFeature(stop);
		if (stopFC) collection.features.push(stopFC);
		return collection;
	};

	//
	// E. Define context value

	const contextValue: StopsContextState = {
		actions: {
			getAllStopsGeoJsonFC,
			getStopById,
			getStopByIdGeoJsonFC,
		},
		data: {
			stops: dataParsedStopsState || [],
		},
		flags: {
			is_loading: allStopsLoading,
		},
	};

	//
	// F. Render components

	return (
		<StopsContext.Provider value={contextValue}>
			{children}
		</StopsContext.Provider>
	);

	//
};

/* * */

export function transformStopDataIntoGeoJsonFeature(stopData: Stop): GeoJSON.Feature<GeoJSON.Point> {
	return {
		geometry: {
			coordinates: [stopData.lon, stopData.lat],
			type: 'Point',
		},
		properties: {
			current_status: stopData.operational_status,
			id: stopData.id,
			lat: stopData.lat,
			lon: stopData.lon,
			long_name: stopData.long_name,
		},
		type: 'Feature',
	};
}
