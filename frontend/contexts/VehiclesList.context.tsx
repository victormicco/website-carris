'use client';

/* * */
import { Routes } from '@/utils/routes';
import { Vehicle } from '@carrismetropolitana/api-types/vehicles';
import { useQueryState } from 'nuqs';
import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

/* * */

interface VehiclesListContextState {
	actions: {
		updateFilterBySearch: (search: string) => void
		updateSelectedVehicle: (vehicleId: string) => void
	}
	data: {
		filtered: Vehicle[]
		raw: Vehicle[]
		selected: null | Vehicle
	}
	filters: {
		by_search: null | string
		selected_vehicle: null | string
	}
	flags: {
		is_loading: boolean
	}
}

/* * */

const VehiclesListContext = createContext<undefined | VehiclesListContextState>(undefined);

export function useVehiclesListContext() {
	const context = useContext(VehiclesListContext);
	if (!context) {
		throw new Error('useVehiclesListContext must be used within a VehiclesListContext');
	}
	return context;
}

/* * */

export const VehiclesListContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables
	const [dataFilteredState, setDataFilteredState] = useState<Vehicle[]>([]);
	const [dataSelectedState, setDataSelectedState] = useState<null | Vehicle>(null);

	const [filterBySearchState, setFilterBySearchState] = useQueryState('search');
	const [filteredSelectedVehicleState, setfilteredSelectedVehicleState] = useQueryState('search');

	//
	// B. Fetch data

	const { data: allVehicleData, isLoading: allVehiclesLoading } = useSWR<Vehicle[], Error>(`${Routes.API}/vehicles`, { refreshInterval: 30000 });

	//
	// C. Transform data

	const applyFiltersToData = () => {
		//
		const filterResult: Vehicle[] = allVehicleData || [];

		//
		// Filter By Search
		switch (filterBySearchState) {
			case 'accessible':
				filterResult.filter(item => item.wheelchair_accessible.toString() === filterBySearchState);
				break;
			case 'make':
				filterResult.filter(item => item.make === filterBySearchState);
				break;
			case 'plate':
				filterResult.filter(item => item.license_plate === filterBySearchState);
				break;
			default:
				console.error('Invalid filterBySearchState:', filterBySearchState);
				break;
		}
		//
		// Save filter result to state
		return filterResult;

		//
	};

	// useEffect(() => {
	// 	if (filterBySearchState) {
	// 		const filteredVehicles = applyFiltersToData();
	// 		setDataFilteredState(filteredVehicles);
	// 	}
	// }, [allVehicleData, filterBySearchState]);
	//
	// D. Handle actions

	const updateFilterBySearch = (value: VehiclesListContextState['filters']['by_search']) => {
		setFilterBySearchState(value);
	};

	const updateSelectedVehicle = (vehicleId: string) => {
		if (!allVehicleData) return;
		const foundVehicleData = allVehicleData.find(item => item.id === vehicleId) || null;
		if (foundVehicleData) {
			setDataSelectedState(foundVehicleData);
			setfilteredSelectedVehicleState(vehicleId);
		}
	};

	//
	// E. Define context value

	const contextValue: VehiclesListContextState = {
		actions: {
			updateFilterBySearch,
			updateSelectedVehicle,
		},
		data: {
			filtered: dataFilteredState,
			raw: allVehicleData || [],
			selected: dataSelectedState,
		},
		filters: {
			by_search: filterBySearchState,
			selected_vehicle: filteredSelectedVehicleState,
		},
		flags: {
			is_loading: allVehiclesLoading,
		},
	};

	//
	// F. Render components

	return (
		<VehiclesListContext.Provider value={contextValue}>
			{children}
		</VehiclesListContext.Provider>
	);

	//
};
