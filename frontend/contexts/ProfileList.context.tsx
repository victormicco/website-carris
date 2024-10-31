'use client';

/* * */

import type { Stop } from '@carrismetropolitana/api-types/network';

import { useProfileContext } from '@/contexts/Profile.context';
import { createDocCollection } from '@/hooks/useOtherSearch';
import { Routes } from '@/utils/routes';
import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

/* * */

interface ProfileListContextState {
	actions: {
		updateFilterByAttribute: (value: string) => void
		updateFilterByCurrentView: (value: string) => void
		updateFilterByFacility: (value: string) => void
		updateFilterByMunicipalityOrLocality: (value: string) => void
		updateFilterBySearch: (value: string) => void
	}
	counters: {
		favorites: number
	}
	data: {
		favorites: Stop[]
		filtered: Stop[]
		raw: Stop[]
	}
	filters: {
		by_attribute: null | string
		by_current_view: 'lines' | 'stops'
		by_facility: null | string
		by_municipality_or_locality: null | string
		by_search: string
	}
	flags: {
		is_loading: boolean
	}
}

/* * */

const ProfileListContext = createContext<ProfileListContextState | undefined>(undefined);

export function useProfileListContext() {
	const context = useContext(ProfileListContext);
	if (!context) {
		throw new Error('useProfileListContext must be used within a ProfileListContextProvider');
	}
	return context;
}

/* * */

export const ProfileListContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const profileContext = useProfileContext();

	const [dataFilteredState, setDataFilteredState] = useState<Stop[]>([]);
	const [dataFavoritesState, setDataFavoritesState] = useState<Stop[]>([]);

	const [filterByAttributeState, setFilterByAttributeState] = useState <ProfileListContextState['filters']['by_attribute']>(null);
	const [filterByCurrentViewState, setFilterByCurrentViewState] = useState <ProfileListContextState['filters']['by_current_view']>('lines');
	const [filterByFacilityState, setFilterByFacilityState] = useState <ProfileListContextState['filters']['by_facility']>(null);
	const [filterByMunicipalityOrLocalityState, setFilterByMunicipalityOrLocalityState] = useState <ProfileListContextState['filters']['by_municipality_or_locality']>(null);
	const [filterBySearchState, setFilterBySearchState] = useState <ProfileListContextState['filters']['by_search']>('');

	//
	// B. Fetch data

	const { data: allProfileData, isLoading: allProfileLoading } = useSWR<Stop[], Error>(`${Routes.API}/stops`);

	//
	// C. Transform data

	const applyFiltersToData = (allData: Stop[] = []) => {
		//

		let filterResult = allData;

		//
		// Filter by_attribute

		if (filterByAttributeState) {
			filterResult = filterResult.filter((item) => {
				return true;
			});
		}

		//
		// Filter by_facility

		if (filterByFacilityState) {
			filterResult = filterResult.filter((item) => {
				return true;
			});
		}

		//
		// Filter by by_municipality_or_locality

		if (filterByMunicipalityOrLocalityState) {
			filterResult = filterResult.filter((line) => {
				return true; // line.municipality_id === filtersState.by_municipality;
			});
		}

		//
		// Filter by by_search

		if (filterBySearchState) {
			// Give extra weight to favorite lines
			const boostedData = filterResult.map(stop => ({ ...stop, boost: profileContext.data.profile?.favorite_stops?.includes(stop.id) ? true : false }));
			const searchHook = createDocCollection(boostedData, {
				id: 5,
				locality_id: 2,
				long_name: 4,
				short_name: 3,
			});
			filterResult = searchHook.search(filterBySearchState);
		}

		//
		// Return resulting items

		return filterResult;

		//
	};

	useEffect(() => {
		const filteredData = applyFiltersToData(allProfileData);
		setDataFilteredState(filteredData);
	}, [allProfileData, filterByAttributeState, filterByFacilityState, filterByMunicipalityOrLocalityState, filterBySearchState]);

	useEffect(() => {
		const favoritesProfileData = allProfileData?.filter(stop => profileContext.data.profile?.favorite_stops?.includes(stop.id)) || [];
		setDataFavoritesState(favoritesProfileData);
	}, [allProfileData, profileContext.data.profile?.favorite_stops]);

	//
	// D. Handle actions

	const updateFilterByAttribute = (value: ProfileListContextState['filters']['by_attribute']) => {
		setFilterByAttributeState(value || null);
	};

	const updateFilterByCurrentView = (value: ProfileListContextState['filters']['by_current_view']) => {
		setFilterByCurrentViewState(value);
	};

	const updateFilterByFacility = (value: ProfileListContextState['filters']['by_facility']) => {
		setFilterByFacilityState(value || null);
	};

	const updateFilterByMunicipalityOrLocality = (value: ProfileListContextState['filters']['by_municipality_or_locality']) => {
		setFilterByMunicipalityOrLocalityState(value || null);
	};

	const updateFilterBySearch = (value: ProfileListContextState['filters']['by_search']) => {
		setFilterBySearchState(value);
	};

	//
	// E. Define context value

	const contextValue: ProfileListContextState = {
		actions: {
			updateFilterByAttribute,
			updateFilterByCurrentView,
			updateFilterByFacility,
			updateFilterByMunicipalityOrLocality,
			updateFilterBySearch,
		},
		counters: {
			favorites: profileContext.counters.favorite_stops,
		},
		data: {
			favorites: dataFavoritesState,
			filtered: dataFilteredState,
			raw: allProfileData || [],
		},
		filters: {
			by_attribute: filterByAttributeState,
			by_current_view: filterByCurrentViewState,
			by_facility: filterByFacilityState,
			by_municipality_or_locality: filterByMunicipalityOrLocalityState,
			by_search: filterBySearchState,
		},
		flags: {
			is_loading: allProfileLoading,
		},
	};

	//
	// F. Render components

	return (
		<ProfileListContext.Provider value={contextValue}>
			{children}
		</ProfileListContext.Provider>
	);

	//
};
