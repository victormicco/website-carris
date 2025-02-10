'use client';

/* * */

import { useVehiclesContext } from '@/contexts/Vehicles.context';
import { Vehicle } from '@carrismetropolitana/api-types/vehicles';
import { useQueryState } from 'nuqs';
import { createContext, useContext, useEffect, useState } from 'react';

/* * */

interface VehiclesListContextState {
	actions: {
		updateFilterByAgency: (agency: string[]) => void
		updateFilterByBikes: (isBikeAllowed: string) => void
		updateFilterByMakeAndModel: (makeAndModel: string[]) => void
		updateFilterByPropulsion: (propulsion: string[]) => void
		updateFilterBySearch: (search: string) => void
		updateFilterByWheelchair: (isWheelchairAcessible: string) => void
		updateSelectedVehicle: (vehicleId: string) => void
	}
	data: {
		filtered: Vehicle[]
		raw: Vehicle[]
		selected: null | Vehicle
	}
	filters: {
		by_agency: null | string
		by_bikes: null | string
		by_make_and_model: null | string
		by_propulsion: null | string
		by_search: string
		by_wheelchair: null | string
		selected_vehicle: null | string
	}
	flags: {
		is_loading: boolean
	}
}

const VehiclesListContext = createContext<undefined | VehiclesListContextState>(undefined);

export function useVehiclesListContext() {
	const context = useContext(VehiclesListContext);
	if (!context) {
		throw new Error('useVehiclesListContext must be used within a VehiclesListContext');
	}
	return context;
}

export const VehiclesListContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const vehiclesContext = useVehiclesContext();

	const [dataFilteredState, setDataFilteredState] = useState<Vehicle[]>([]);
	const [dataSelectedState, setDataSelectedState] = useState<null | Vehicle>(null);

	const [filterByWheelchairAccesibleState, setWheelchairAccesibleState] = useQueryState('isWheelchair', { clearOnDefault: true });
	const [filterByAgencyState, setFilterByAgencyState] = useQueryState('agency', { clearOnDefault: true });
	const [filterByBikesState, setByBikesState] = useQueryState('bikes', { clearOnDefault: true });
	const [filterByMakeAndModelState, setFilterByMakeAndModelState] = useQueryState('makeModel', { clearOnDefault: true });
	const [filterBySearchState, setFilterBySearchState] = useQueryState('search', { clearOnDefault: true, defaultValue: '' });
	const [filterByPropulsionState, setFilterByPropulsion] = useQueryState('propulsion', { clearOnDefault: true });

	//
	// C. Transform data

	const applyFiltersToData = () => {
		//

		let filterResult = vehiclesContext.data.vehicles || [];

		if (filterBySearchState) {
			filterResult = filterResult.filter((item) => {
				const matchedVehicleId = item.id?.toLowerCase().includes(filterBySearchState.toLowerCase());
				const matchedLicensePlate = item.license_plate?.toLowerCase().includes(filterBySearchState.toLowerCase());
				return matchedVehicleId || matchedLicensePlate;
			});
		}

		if (filterByBikesState) {
			filterResult = filterResult.filter(item => item.bikes_allowed?.toString() === filterByBikesState);
		}

		if (filterByWheelchairAccesibleState) {
			filterResult = filterResult.filter(item => item.wheelchair_accessible?.toString() === filterByWheelchairAccesibleState);
		}

		if (filterByPropulsionState) {
			const propulsionValues = filterByPropulsionState.split(' ').filter(Boolean);
			filterResult = filterResult.filter(item => item.propulsion && propulsionValues.includes(item.propulsion));
		}

		if (filterByAgencyState) {
			const agencyValues = filterByAgencyState.split(' ').filter(Boolean);
			filterResult = filterResult.filter(item => agencyValues.includes(item.agency_id.toString()));
		}

		if (filterByMakeAndModelState && filterByMakeAndModelState.trim() !== '') {
			const makeModelValues = filterByMakeAndModelState.split(',').filter(Boolean);
			filterResult = filterResult.filter((item) => {
				return makeModelValues.some((val) => {
					const [makeFilter, modelFilter] = val.split('-').map(s => s.trim().toLowerCase());
					const itemMake = item.make?.toLowerCase() || '';
					const itemModel = item.model?.toLowerCase() || '';
					return itemMake.includes(makeFilter) && itemModel.includes(modelFilter);
				});
			});
		}

		return filterResult;

		//
	};

	useEffect(() => {
		const filteredVehicles = applyFiltersToData();
		setDataFilteredState(filteredVehicles);
	}, [filterBySearchState, filterByAgencyState, filterByBikesState, filterByMakeAndModelState, filterByPropulsionState, filterByWheelchairAccesibleState, vehiclesContext.data.vehicles]);

	//
	// D. Handle actions

	const updateFilterBySearch = (search: string) => {
		setFilterBySearchState(search);
	};

	const updateFilterByAgency = (agency: string[]) => {
		if (agency.length !== 0) {
			setFilterByAgencyState(agency.join(' '));
		}
		else {
			setFilterByAgencyState(null);
		}
	};

	const updateFilterByBikes = (isBikeAllowed: string) => {
		setByBikesState(isBikeAllowed);
	};

	const updateFilterByWheelchair = (isWheelchair: string) => {
		setWheelchairAccesibleState(isWheelchair);
	};

	const updateFilterByMakeAndModel = (makeAndModel: string[]) => {
		if (makeAndModel.length === 0) {
			setFilterByMakeAndModelState(null);
		}
		else {
			setFilterByMakeAndModelState(makeAndModel.join(','));
		}
	};

	const updateFilterByPropulsion = (propulsionOptions: string[]) => {
		if (propulsionOptions.length === 0) {
			setFilterByPropulsion(null);
		}
		else {
			setFilterByPropulsion(propulsionOptions.join(' ').trim());
		}
	};

	const updateSelectedVehicle = (vehicleId: string) => {
		if (!vehiclesContext.data.vehicles) return;
		const foundVehicleData = vehiclesContext.data.vehicles.filter(item => item.id === vehicleId) || null;

		if (foundVehicleData) {
			setDataSelectedState(foundVehicleData[0] || null);
		}
	};

	//
	// E. Define context value

	const contextValue: VehiclesListContextState = {
		actions: {
			updateFilterByAgency,
			updateFilterByBikes,
			updateFilterByMakeAndModel,
			updateFilterByPropulsion,
			updateFilterBySearch,
			updateFilterByWheelchair,
			updateSelectedVehicle,
		},
		data: {
			filtered: dataFilteredState,
			raw: vehiclesContext.data.vehicles || [],
			selected: dataSelectedState,
		},
		filters: {
			by_agency: filterByAgencyState,
			by_bikes: filterByBikesState,
			by_make_and_model: filterByMakeAndModelState,
			by_propulsion: filterByPropulsionState,
			by_search: filterBySearchState,
			by_wheelchair: filterByBikesState,
			selected_vehicle: dataSelectedState?.id || null,
		},
		flags: {
			is_loading: vehiclesContext.flags.is_loading,
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
