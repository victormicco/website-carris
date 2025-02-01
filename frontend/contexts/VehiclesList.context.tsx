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
		updateFilterByAgency: (agency: string []) => void
		updateFilterByIsBikeAllowed: (isBikeAllowed: string) => void
		updateFilterByMakeAndModel: (makeAndModel: string []) => void
		updateFilterByPropulsion: (propulsion: string[]) => void
		updateFilterBySearch: (search: string) => void
		updateFilterByWheelchair: (isWheelchairAcessible: string) => void
		updateSelectedVehicle: (vehicleId: string) => void
	}
	data: {
		agencys: null | { agency_id: number, name: string }[]
		filtered: Vehicle[]
		makes_and_models: null | { id: number, models: { id: number, name: string }[], name: string }[]
		propulsions: null | { id: number, name: string }[]
		raw: Vehicle[]
		selected: null | Vehicle
	}
	filters: {
		by_agency: null | string
		by_isBicicleAllowed: null | string
		by_isWheelchairAcessible: null | string
		by_makeAndModel: null | string
		by_propulsion: null | string
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
	const [allAgencys, setAllAgencys] = useState<{ agency_id: number, name: string }[]>([]);
	const [allMakesAndModels, setAllMakesAndModels] = useState<{ id: number, models: { id: number, name: string }[], name: string }[]>([]);
	const [allPropulsions, setAllPropulsions] = useState<null | { id: number, name: string }[]>([]);

	const [filterByWheelchairAccesibleState, setWheelchairAccesibleState] = useQueryState('isWheelchair');
	const [filterByAgencyState, setFilterByAgencyState] = useQueryState('agency');
	const [filterByBicycleAllowedState, setByBicycleAllowedState] = useQueryState('isBikeAllowed');
	const [filterByMakeAndModelState, setFilterByMakeAndModelState] = useQueryState('makeModel');
	const [filterBySearchState, setFilterBySearchState] = useQueryState('search');
	const [filterByPropulsionState, setFilterByPropulsion] = useQueryState('propulsion');
	const [filteredSelectedVehicleState, setfilteredSelectedVehicleState] = useQueryState('search');
	const [make, setMake] = useState<string | undefined>(undefined);
	const [model, setModel] = useState<string | undefined>(undefined);

	//
	// B. Fetch data

	const { data: allVehicleData, isLoading: allVehiclesLoading } = useSWR<Vehicle[], Error>(`${Routes.API}/vehicles`, { refreshInterval: 30000 });

	//
	// C. Transform data

	const applyFiltersToData = () => {
		//
		let filterResult: Vehicle[] = allVehicleData || [];

		if (filterResult.length !== 0) {
			if (filterByBicycleAllowedState) {
				filterResult = (allVehicleData || []).filter(item => item.bikes_allowed?.toString() === filterByBicycleAllowedState || false);
			}

			if (filterByWheelchairAccesibleState) {
				filterResult = (allVehicleData || []).filter(item => item.wheelchair_accessible?.toString() === filterByBicycleAllowedState || false);
			}

			if (filterByPropulsionState !== '') {
				filterResult = (allVehicleData || []).filter(item => item.propulsion === filterByPropulsionState || '');
			}

			if (filterByAgencyState !== '') {
				filterResult = (allVehicleData || []).filter(item => item.agency_id === filterByAgencyState || 0);
			}
		}

		if (filterBySearchState) {
			filterResult = (allVehicleData || []).filter(item =>
				item.license_plate?.toLowerCase().includes(filterBySearchState.toLowerCase()),
			);
		}
		console.log(make);
		if (make) {
			filterResult = (allVehicleData || []).filter(item => item.make?.toLocaleLowerCase().includes(make.toLowerCase()));
		}

		if (model) {
			filterResult = (allVehicleData || []).filter(item => item.model?.toLocaleLowerCase().includes(model.toLowerCase()));
		}

		if (filterByMakeAndModelState) {
			filterResult = (allVehicleData || []).filter(item =>
				item.make?.toLowerCase().includes(filterByMakeAndModelState.toLowerCase()),
			);
		}
		console.log('fiter: ', filterBySearchState);

		return filterResult;

		//
	};

	const getAllMakesAndModels = () => {
		if (!allVehicleData) return [];

		const makesMap = new Map();
		let makeIdCounter = 1;
		let modelIdCounter = 1;

		allVehicleData.forEach((vehicle) => {
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

	const getAllAgencys = () => {
		const agencysMap = new Map();

		allVehicleData?.forEach((vehicle) => {
			if (vehicle.agency_id !== undefined) {
				const agency_Id = vehicle.agency_id;
				const agencyOverrides = {
					41: 'Viação Alvorada',
					42: 'Rodoviária de Lisboa (RL)',
					43: 'Transportes Sul do Tejo (TST)',
					44: 'Alsa Todi',
				};

				if (!agencysMap.has(agency_Id)) {
					agencysMap.set(agency_Id, { agency_id: agency_Id, name: agencyOverrides[agency_Id] });
				}
			}
		});
		const agencys = Array.from(agencysMap.values());
		setAllAgencys(agencys);
		return agencys;
	};
	const getAllPropulsion = () => {
		if (!allVehicleData) return [];

		const propulsionsMap = new Map();
		let idCounter = 1;

		allVehicleData.forEach((vehicle) => {
			if (vehicle.propulsion !== undefined) {
				const propulsionType = vehicle.propulsion;

				if (!propulsionsMap.has(propulsionType)) {
					propulsionsMap.set(propulsionType, { id: idCounter, name: propulsionType });
					idCounter++;
				}
			}
		});

		const propulsions = Array.from(propulsionsMap.values());
		setAllPropulsions(propulsions);
		return propulsions;
	};

	useEffect(() => {
		if (filterBySearchState || filterByAgencyState || filterByBicycleAllowedState || filterByMakeAndModelState || filterByWheelchairAccesibleState) {
			const filteredVehicles = applyFiltersToData();
			setDataFilteredState(filteredVehicles || []);
		}
	}, [filterBySearchState, filterByAgencyState, filterByBicycleAllowedState, filterByMakeAndModelState, filterByWheelchairAccesibleState]);

	useEffect(() => {
		if (!allVehicleData && !allVehiclesLoading) return;
		getAllAgencys();
		getAllMakesAndModels();
		getAllPropulsion();
	}, [allVehicleData]);
	//
	// D. Handle actions

	const updateFilterBySearch = (search: string | string[]) => {
		if (Array.isArray(search)) {
			setFilterBySearchState(search.join(' '));
		}
		else {
			setFilterBySearchState(search);
		}
	};

	const updateFilterByAgency = (agency: string | string[]) => {
		if (Array.isArray(agency)) {
			setFilterByAgencyState(agency.join(' '));
		}
		else {
			setFilterByAgencyState(agency);
		}
	};

	const updateFilterByIsBikeAllowed = (isBikeAllowed: string) => {
		if (Array.isArray(isBikeAllowed)) {
			setByBicycleAllowedState(isBikeAllowed.join(' '));
		}
		else {
			setByBicycleAllowedState(isBikeAllowed);
		}
	};

	const updateFilterByWheelchair = (isWheelchair: string) => {
		if (Array.isArray(isWheelchair)) {
			setWheelchairAccesibleState(isWheelchair.join(' '));
		}
		else {
			setWheelchairAccesibleState(isWheelchair);
		}
	};

	const updateFilterByMakeAndModel = (makeAndModel: string[]) => {
		const extractedValues = makeAndModel.map((str) => {
			const [make, model] = str.split('-');
			setMake(make);
			setModel(model);
			return { make, model };
		});
		if (Array.isArray(makeAndModel)) {
			setFilterByMakeAndModelState(makeAndModel.join(' '));
		}
		else {
			setFilterByMakeAndModelState(makeAndModel);
		}
	};

	const updateFilterByPropulsion = (propulsion: string | string[]) => {
		if (Array.isArray(propulsion)) {
			setFilterByPropulsion(propulsion.join(' '));
		}
		else {
			setFilterByPropulsion(propulsion);
		}
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
			updateFilterByAgency,
			updateFilterByIsBikeAllowed,
			updateFilterByMakeAndModel,
			updateFilterByPropulsion,
			updateFilterBySearch,
			updateFilterByWheelchair,
			updateSelectedVehicle,
		},
		data: {
			agencys: allAgencys || [],
			filtered: dataFilteredState,
			makes_and_models: allMakesAndModels || [],
			propulsions: allPropulsions || [],
			raw: allVehicleData || [],
			selected: dataSelectedState,

		},
		filters: {
			by_agency: filterByAgencyState,
			by_isBicicleAllowed: filterByBicycleAllowedState,
			by_isWheelchairAcessible: filterByWheelchairAccesibleState,
			by_makeAndModel: filterByMakeAndModelState,
			by_propulsion: filterByPropulsionState,
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
