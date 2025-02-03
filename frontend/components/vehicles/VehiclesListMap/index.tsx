'use client';

import { MapView } from '@/components/map/MapView';
import { MapViewStylePath } from '@/components/map/MapViewStylePath';
import {
	MapViewStyleVehicles,
	MapViewStyleVehiclesInteractiveLayerId,
	MapViewStyleVehiclesPrimaryLayerId,
} from '@/components/map/MapViewStyleVehicles';
import { useLinesContext } from '@/contexts/Lines.context';
import { transformStopDataIntoGeoJsonFeature, useStopsContext } from '@/contexts/Stops.context';
import { useVehiclesContext } from '@/contexts/Vehicles.context';
import { useVehiclesListContext } from '@/contexts/VehiclesList.context';
import { getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';
import { Routes } from '@/utils/routes';
import { Shape } from '@carrismetropolitana/api-types/network';
import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { DateTime } from 'luxon';
import { useEffect, useMemo, useState } from 'react';

import { VehicleListMapPopup } from '../VehiclesListMapPopup';

export default function Component() {
	// A. Setup variables
	const vehiclesListContext = useVehiclesListContext();
	const vehiclesContext = useVehiclesContext();
	const LinesContext = useLinesContext();
	const stopsContext = useStopsContext();
	const [shapeId, setShapeId] = useState<Shape [] | undefined>(undefined);
	const [patternId, setPattern] = useState();
	const [activePathShapeGeoJson, setActivePathShapeGeoJson] = useState<Feature<Geometry, GeoJsonProperties> | FeatureCollection<Geometry, GeoJsonProperties> | undefined>(undefined);
	const selectedVehicleFromList = vehiclesListContext.data.selected;
	const selectedVehicle = selectedVehicleFromList && vehiclesContext.data.vehicles.find(vehicle => vehicle.id === selectedVehicleFromList.id);

	// B. Fetch Data

	const lineData = LinesContext.actions.getLineDataById(selectedVehicle?.line_id || '');

	const findTodaysDate = () => DateTime.now().toFormat('yyyyLLdd');

	const fetchPattern = useMemo(async () => {
		if (!selectedVehicle) return [];
		const date = await findTodaysDate();
		const patternId = vehiclesListContext.data.selected?.pattern_id;

		if (patternId) {
			const actualPattern = await fetch(`${Routes.API}/patterns/${patternId}`).then(res => res.json());
			const isAvailable = actualPattern.filter(item => item.valid_on.includes(date));
			setShapeId(isAvailable);
			return isAvailable;
		}
	}, [vehiclesListContext.data.selected]);

	const fetchShape = useMemo(async () => {
		if (!shapeId) return [];
		const shape = await fetch(`${Routes.API}/shapes/${shapeId[0].shape_id}`).then(res => res.json());
		setActivePathShapeGeoJson(shape.geojson);
		return shape.geojson;
	}, [shapeId]);

	const activeVehiclesGeoJson = useMemo(() => {
		if (vehiclesListContext.data.filtered && vehiclesListContext.data.filtered.length > 0) {
			const features: Feature<Geometry, GeoJsonProperties>[] = [];
			vehiclesListContext.data.filtered.forEach((vehicle) => {
				const fc = vehiclesContext.actions.getVehicleByIdGeoJsonFC(vehicle.id);
				if (fc && fc.features && fc.features.length > 0) {
					features.push(fc.features[0]);
				}
			});
			return { features, type: 'FeatureCollection' as const };
		}
		else {
			return vehiclesContext.actions.getAllVehiclesGeoJsonFC();
		}
	}, [vehiclesListContext.data.filtered, vehiclesContext.data.vehicles]);

	// const activePathWaypointsGeoJson = useMemo(() => {
	// 	if (!stopsDetailContext.data.active_pattern_group?.path) return;
	// 	const collection = getBaseGeoJsonFeatureCollection();
	// 	stopsDetailContext.data.active_pattern_group.path.forEach((pathStop) => {
	// 		const stopData = stopsContext.actions.getStopById(pathStop.stop_id);
	// 		if (!stopData) return;
	// 		const result = transformStopDataIntoGeoJsonFeature(stopData);
	// 		result.properties = {
	// 			...result.properties,
	// 			color: stopsDetailContext.data.active_pattern_group?.color,
	// 			text_color: stopsDetailContext.data.active_pattern_group?.text_color,
	// 		};
	// 		collection.features.push(result);
	// 	});
	// 	return collection;
	// }, [stopsDetailContext.data.active_trip_id, vehiclesContext.data.vehicles]);

	// C. Handle actions
	function handleLayerClick(event) {
		console.log('event:', event);
		if (event.features.length === 0) {
			setActivePathShapeGeoJson(undefined);
		}
		if (event.features.length !== 0 && event.features[0].source === 'default-source-vehicles') {
			vehiclesListContext.actions.updateSelectedVehicle(event.features[0].properties.id);
		}
	}
	// D. Render component
	return (
		<MapView
			id="vehiclesListMap"
			interactiveLayerIds={[MapViewStyleVehiclesInteractiveLayerId]}
			onClick={handleLayerClick}
		>
			<MapViewStyleVehicles vehiclesData={activeVehiclesGeoJson} />

			<MapViewStylePath
				presentBeforeId={MapViewStyleVehiclesPrimaryLayerId}
				shapeData={activePathShapeGeoJson}
				// waypointsData={activePathFeatureCollection}
			/>
			{selectedVehicle && (
				<VehicleListMapPopup lineData={lineData} selectedVehicle={selectedVehicle} />
			)}
		</MapView>
	);
}
