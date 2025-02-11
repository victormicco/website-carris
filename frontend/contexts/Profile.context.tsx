'use client';

/* * */

import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { createContext, useContext, useEffect, useState } from 'react';

/* * */

const LOCAL_STORAGE_KEYS = {
	device_id: 'profile|device_id',
	favorite_lines: 'profile|favorite_lines',
	favorite_stops: 'profile|favorite_stops',
	profile: 'profile',
};

/* * */

interface ProfileContextState {
	actions: {
		toggleFavoriteLine: (lineId: string) => Promise<void>
		toggleFavoriteStop: (stopId: string) => Promise<void>
	}
	counters: {
		favorite_lines: number
		favorite_stops: number
	}
	data: {
		favorite_lines: null | string[]
		favorite_stops: null | string[]
	}
	flags: {
		is_enabled: boolean
		is_loading: boolean
	}
}

/* * */

const ProfileContext = createContext<ProfileContextState | undefined>(undefined);

export function useProfileContext() {
	const context = useContext(ProfileContext);
	if (!context) {
		throw new Error('useProfileContext must be used within a ProfileContextProvider');
	}
	return context;
}

/* * */

export const ProfileContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const analyticsContext = useAnalyticsContext();

	const [dataFavoriteLinesState, setDataFavoriteLinesState] = useState<ProfileContextState['data']['favorite_lines']>(null);
	const [dataFavoriteStopsState, setDataFavoriteStopsState] = useState<ProfileContextState['data']['favorite_stops']>(null);

	const [flagIsLoadingState, setFlagIsLoadingState] = useState <ProfileContextState['flags']['is_loading']>(true);

	//
	// B. Fetch data

	useEffect(() => {
		//
		setFlagIsLoadingState(true);
		// If analytics is disabled, do not fetch Profile ID
		if (!analyticsContext.flags.is_enabled) {
			setFlagIsLoadingState(false);
			return;
		}
		// If analytics is enabled, fetch favorites from local storage
		const foundFavoriteLines = localStorage.getItem(LOCAL_STORAGE_KEYS.favorite_lines);
		const foundFavoriteStops = localStorage.getItem(LOCAL_STORAGE_KEYS.favorite_stops);
		// If favorites were found, set them to local state
		if (foundFavoriteLines) setDataFavoriteLinesState(JSON.parse(foundFavoriteLines));
		if (foundFavoriteStops) setDataFavoriteStopsState(JSON.parse(foundFavoriteStops));
		//
		setFlagIsLoadingState(false);
		//
	}, [analyticsContext.flags.is_enabled]);

	//
	// C. Handle actions

	useEffect(() => {
		if (!analyticsContext.flags.is_enabled) return;
		// If favorites are updated, update local storage
		if (dataFavoriteLinesState) localStorage.setItem(LOCAL_STORAGE_KEYS.favorite_lines, JSON.stringify(dataFavoriteLinesState));
		if (dataFavoriteStopsState) localStorage.setItem(LOCAL_STORAGE_KEYS.favorite_stops, JSON.stringify(dataFavoriteStopsState));
	}, [dataFavoriteLinesState, dataFavoriteStopsState]);

	const toggleFavoriteLine = async (lineId: string) => {
		if (!analyticsContext.flags.is_enabled) return;
		const favoriteLinesSet = new Set(dataFavoriteLinesState || []);
		if (favoriteLinesSet.has(lineId)) {
			favoriteLinesSet.delete(lineId);
			analyticsContext.actions.capture(ampli => ampli.removeFavoriteLine({ line_id: lineId }));
		}
		else {
			favoriteLinesSet.add(lineId);
			analyticsContext.actions.capture(ampli => ampli.addFavoriteLine({ line_id: lineId }));
		}
		setDataFavoriteLinesState(Array.from(favoriteLinesSet));
	};

	const toggleFavoriteStop = async (stopId: string) => {
		if (!analyticsContext.flags.is_enabled) return;

		const favoriteStopsSet = new Set(dataFavoriteStopsState || []);

		if (favoriteStopsSet.has(stopId)) {
			favoriteStopsSet.delete(stopId);
			analyticsContext.actions.capture(ampli => ampli.removeFavoriteStop({ stop_id: stopId }));
		}
		else {
			favoriteStopsSet.add(stopId);
			analyticsContext.actions.capture(ampli => ampli.addFavoriteStop({ stop_id: stopId }));
		}
		setDataFavoriteStopsState(Array.from(favoriteStopsSet));
	};

	//
	// D. Define context value

	const contextValue: ProfileContextState = {
		actions: {
			toggleFavoriteLine,
			toggleFavoriteStop,
		},
		counters: {
			favorite_lines: dataFavoriteLinesState?.length || 0,
			favorite_stops: dataFavoriteStopsState?.length || 0,
		},
		data: {
			favorite_lines: dataFavoriteLinesState,
			favorite_stops: dataFavoriteStopsState,
		},
		flags: {
			is_enabled: analyticsContext.flags.is_enabled,
			is_loading: flagIsLoadingState,
		},
	};

	//
	// E. Render components

	return (
		<ProfileContext.Provider value={contextValue}>
			{children}
		</ProfileContext.Provider>
	);

	//
};
