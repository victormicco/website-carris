'use client';

/* * */

import { Vehicle } from '@carrismetropolitana/api-types/vehicles';
import { useQueryState } from 'nuqs';
import { createContext, useContext, useEffect, useState } from 'react';

import { useVehiclesContext } from './Vehicles.context';

/* * */

interface VehiclesListContextState {
	actions: {
		updateFilterByAgency: (agency: string[]) => void
		updateFilterByIsBikeAllowed: (isBikeAllowed: string) => void
		updateFilterByMakeAndModel: (makeAndModel: string[]) => void
		updateFilterByPropulsion: (propulsion: string[]) => void
		updateFilterBySearch: (search: string) => void
		updateFilterByWheelchair: (isWheelchairAcessible: string) => void
		updateSelectedVehicle: (vehicleId: string) => void
	}
	data: {
		agencies: null | { agency_id: number, name: string }[]
		filtered: Vehicle[]
		makes_and_models: null | { id: number, models: { id: number, name: string }[], name: string }[]
		raw: Vehicle[]
		selected: null | Vehicle
	}
	filters: {
		by_agency: null | string
		by_isBicicleAllowed: null | string
		by_isWheelchairAcessible: null | string
		by_makeAndModel: null | string
		by_propulsion: null | string
		by_search: string
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

	const [allAgencies, setAllAgencies] = useState<{ agency_id: number, name: string }[]>([]);
	const [allMakesAndModels, setAllMakesAndModels] = useState<{ id: number, models: { id: number, name: string }[], name: string }[]>([]);

	const [filterByWheelchairAccesibleState, setWheelchairAccesibleState] = useQueryState('isWheelchair', { clearOnDefault: true });
	const [filterByAgencyState, setFilterByAgencyState] = useQueryState('agency', { clearOnDefault: true });
	const [filterByBicycleAllowedState, setByBicycleAllowedState] = useQueryState('isBikeAllowed', { clearOnDefault: true });
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

		if (filterByBicycleAllowedState) {
			filterResult = filterResult.filter(item => item.bikes_allowed?.toString() === filterByBicycleAllowedState);
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

	const getAllMakesAndModels = () => {
		if (!vehiclesContext.data.vehicles) return [];
		const makesMap = new Map();
		let makeIdCounter = 1;
		let modelIdCounter = 1;
		vehiclesContext.data.vehicles.forEach((vehicle) => {
			if (vehicle.make !== undefined && vehicle.model !== undefined) {
				const makeName = vehicle.make;
				const modelName = vehicle.model;
				if (!makesMap.has(makeName)) {
					makesMap.set(makeName, {
						id: makeIdCounter,
						models: [],
						name: makeName,
					});
					makeIdCounter++;
				}
				const makeObj = makesMap.get(makeName);
				if (!makeObj.models.some(model => model.name === modelName)) {
					makeObj.models.push({ id: modelIdCounter, name: modelName });
					modelIdCounter++;
				}
			}
		});
		const makes_and_models = Array.from(makesMap.values());
		setAllMakesAndModels(makes_and_models);
		return makes_and_models;
	};

	const getAllAgencies = () => {
		const agenciesMap = new Map();
		vehiclesContext.data.vehicles?.forEach((vehicle) => {
			if (vehicle.agency_id !== undefined) {
				const agency_Id = vehicle.agency_id;
				const agencyOverrides = {
					41: 'Viação Alvorada',
					42: 'Rodoviária de Lisboa (RL)',
					43: 'Transportes Sul do Tejo (TST)',
					44: 'Alsa Todi',
				};

				if (!agenciesMap.has(agency_Id)) {
					agenciesMap.set(agency_Id, { agency_id: agency_Id, name: agencyOverrides[agency_Id] });
				}
			}
		});
		const agencies = Array.from(agenciesMap.values());
		setAllAgencies(agencies);
		return agencies;
	};

	useEffect(() => {
		const filteredVehicles = applyFiltersToData();
		setDataFilteredState(filteredVehicles);
	}, [filterBySearchState, filterByAgencyState, filterByBicycleAllowedState, filterByMakeAndModelState, filterByPropulsionState, filterByWheelchairAccesibleState, vehiclesContext.data.vehicles]);

	useEffect(() => {
		if (!vehiclesContext.data.vehicles) return;
		getAllAgencies();
		getAllMakesAndModels();
	}, [vehiclesContext.data.vehicles]);

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

	const updateFilterByIsBikeAllowed = (isBikeAllowed: string) => {
		setByBicycleAllowedState(isBikeAllowed);
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
			updateFilterByIsBikeAllowed,
			updateFilterByMakeAndModel,
			updateFilterByPropulsion,
			updateFilterBySearch,
			updateFilterByWheelchair,
			updateSelectedVehicle,
		},
		data: {
			agencies: allAgencies || [],
			filtered: dataFilteredState,
			makes_and_models: allMakesAndModels || [],
			raw: vehiclesContext.data.vehicles || [],
			selected: dataSelectedState,
		},
		filters: {
			by_agency: filterByAgencyState,
			by_isBicicleAllowed: filterByBicycleAllowedState,
			by_isWheelchairAcessible: filterByWheelchairAccesibleState,
			by_makeAndModel: filterByMakeAndModelState,
			by_propulsion: filterByPropulsionState,
			by_search: filterBySearchState,
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
