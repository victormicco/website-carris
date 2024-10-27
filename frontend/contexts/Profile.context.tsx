'use client';

/* * */

import type { ServerActionResult } from '@/types/actions.types';
import type { Profile } from '@/types/profile.type';

import { toggleFavoriteLine as favoriteLineAction, toggleFavoriteStop as favoriteStopAction, getProfile, updateProfile as updateProfileAction } from '@/actions/account.actions';
import { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useAnalyticsContext } from './Analytics.context';

/* * */

const LOCAL_STORAGE_KEYS = {
	device_id: 'profile|device_id',
	profile: 'profile',
};

/* * */

interface ProfileContextState {
	actions: {
		toggleFavoriteLine: (lineId: string) => Promise<void>
		toggleFavoriteStop: (stopId: string) => Promise<void>
		updateProfile: (profile: Partial<Profile>) => Promise<void>
	}
	counters: {
		favorite_lines: number
		favorite_stops: number
	}
	data: {
		device_id: null | string
		profile: null | Profile
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

	const [dataDeviceIdState, setDataDeviceIdState] = useState<ProfileContextState['data']['device_id']>(null);
	const [dataProfileState, setDataProfileState] = useState<ProfileContextState['data']['profile']>(null);

	const [flagIsLoadingState, setFlagIsLoadingState] = useState <ProfileContextState['flags']['is_loading']>(true);

	//
	// B. Transform data

	useEffect(() => {
		setFlagIsLoadingState(true);
		// Check if analytics is enabled
		if (!analyticsContext.flags.is_enabled) {
			// If analytics is disabled, do not fetch Profile ID
			setFlagIsLoadingState(false);
			return;
		}
		else {
			setupDeviceId();
			setFlagIsLoadingState(false);
		}
		//
	}, []);

	useEffect(() => {
		// Ensure this is running on the client
		if (typeof window === 'undefined') return;
		// Fetch previous Profile ID from local storage
		const deviceIdLocal = localStorage.getItem(LOCAL_STORAGE_KEYS.device_id);
		// Get profile data from Server Action
		getProfile(deviceIdLocal || '')
			.then((profile: ServerActionResult<Profile>) => {
				setDataProfileState(profile.success ? profile.value : null);
			})
			.catch(() => {
				// If no profile data was found, set the data to null
				setDataProfileState(null);
			})
			.finally(() => {
				setFlagIsLoadingState(false);
			});
	}, [dataDeviceIdState]);

	function setupDeviceId() {
		// Check if device id exists in local storage
		const foundDeviceId = localStorage.getItem(LOCAL_STORAGE_KEYS.device_id);
		if (foundDeviceId) {
			setDataDeviceIdState(foundDeviceId);
			return;
		}
		else {
			// Generate a new device id and save it to local storage
			const id = uuidv4();
			localStorage.setItem(LOCAL_STORAGE_KEYS.device_id, id);
			setDataDeviceIdState(id);
		}
	}

	//
	// C. Handle actions

	const toggleFavoriteLine = async (lineId: string) => {
		if (!dataDeviceIdState) setupDeviceId();
		if (!dataDeviceIdState) throw new Error('Device ID is required');

		const profile: ServerActionResult<Profile> = await favoriteLineAction(lineId, dataDeviceIdState);
		if (!profile.success) throw new Error(profile.error);
		setDataProfileState(profile.value);
	};

	const toggleFavoriteStop = async (stopId: string) => {
		if (!dataDeviceIdState) setupDeviceId();
		if (!dataDeviceIdState) throw new Error('Device ID is required');

		const profile: ServerActionResult<Profile> = await favoriteStopAction(stopId, dataDeviceIdState);
		if (!profile.success) throw new Error(profile.error);
		setDataProfileState(profile.value);
	};

	const updateProfile = async (profile: Partial<Profile>) => {
		if (!dataProfileState) return;
		const res = await updateProfileAction(profile, dataDeviceIdState || '');
		setDataProfileState({ ...dataProfileState, ...res });
	};

	//
	// D. Define context value

	const contextValue: ProfileContextState = {
		actions: {
			toggleFavoriteLine,
			toggleFavoriteStop,
			updateProfile,
		},
		counters: {
			favorite_lines: dataProfileState?.favorite_lines?.length || 0,
			favorite_stops: dataProfileState?.favorite_stops?.length || 0,
		},
		data: {
			device_id: dataDeviceIdState,
			profile: dataProfileState,
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
