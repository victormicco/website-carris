'use client';

/* * */

import type { District, Locality, Municipality } from '@carrismetropolitana/api-types/locations';

import { Routes } from '@/utils/routes';
import { ApiResponse } from '@carrismetropolitana/api-types/common';
import { createContext, useContext, useMemo } from 'react';
import useSWR from 'swr';

/* * */

interface LocationsContextState {
	actions: {
		getDistrictById: (districtId: string) => District | undefined
		getLocalityById: (localityId: string) => Locality | undefined
		getMunicipalityById: (municipalityId: string) => Municipality | undefined
	}
	data: {
		districts: District[]
		localitites: Locality[]
		municipalities: Municipality[]
	}
	flags: {
		is_loading: boolean
	}
}

/* * */

const LocationsContext = createContext<LocationsContextState | undefined>(undefined);

export function useLocationsContext() {
	const context = useContext(LocationsContext);
	if (!context) {
		throw new Error('useLocationsContext must be used within a LocationsContextProvider');
	}
	return context;
}

/* * */

export const LocationsContextProvider = ({ children }) => {
	//

	//
	// A. Fetch data

	const { data: fetchedDistrictsData, isLoading: fetchedDistrictsLoading } = useSWR<ApiResponse<District[]>, Error>(`${Routes.API}/locations/districts`);
	const { data: fetchedMunicipalitiesData, isLoading: fetchedMunicipalitiesLoading } = useSWR<ApiResponse<Municipality[]>, Error>(`${Routes.API}/locations/municipalities`);
	const { data: fetchedLocalitiesData, isLoading: fetchedLocalitiesLoading } = useSWR<Locality[], Error>(`${Routes.API}/locations/localities`);

	//
	// B. Transform data

	const allDistrictsData = useMemo(() => {
		if (fetchedDistrictsData?.status !== 'success') return [];
		return fetchedDistrictsData.data;
	}, [fetchedDistrictsData]);

	const allMunicipalitiesData = useMemo(() => {
		if (fetchedMunicipalitiesData?.status !== 'success') return [];
		return fetchedMunicipalitiesData.data;
	}, [fetchedMunicipalitiesData]);

	//
	// C. Handle actions

	const getDistrictById = (districtId: string): District | undefined => {
		return allDistrictsData.find(item => item.id === districtId);
	};

	const getMunicipalityById = (municipalityId: string): Municipality | undefined => {
		return allMunicipalitiesData.find(item => item.id === municipalityId);
	};

	const getLocalityById = (localityId: string): Locality | undefined => {
		return fetchedLocalitiesData?.find(item => item.id === localityId);
	};

	//
	// D. Define context value

	const contextValue: LocationsContextState = {
		actions: {
			getDistrictById,
			getLocalityById,
			getMunicipalityById,
		},
		data: {
			districts: allDistrictsData || [],
			localitites: fetchedLocalitiesData || [],
			municipalities: allMunicipalitiesData || [],
		},
		flags: {
			is_loading: fetchedDistrictsLoading || fetchedMunicipalitiesLoading || fetchedLocalitiesLoading,
		},
	};

	//
	// E. Render components

	return (
		<LocationsContext.Provider value={contextValue}>
			{children}
		</LocationsContext.Provider>
	);

	//
};
