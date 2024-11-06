'use client';

/* * */

import { MapView } from '@/components/map/MapView';
import { MapViewStyleActiveStops } from '@/components/map/MapViewStyleActiveStops';
import { MapViewStylePath, MapViewStylePathInteractiveLayerId } from '@/components/map/MapViewStylePath';
import { MapViewStyleVehicles } from '@/components/map/MapViewStyleVehicles';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';
import { transformStopDataIntoGeoJsonFeature, useStopsContext } from '@/contexts/Stops.context';
import { useVehiclesContext } from '@/contexts/Vehicles.context';
import { centerMap, getBaseGeoJsonFeatureCollection, moveMap } from '@/utils/map.utils';
import { useEffect, useMemo } from 'react';
import { useMap } from 'react-map-gl/maplibre';

/* * */

export function LinesDetailPathMap() {
	//

	//
	// A. Setup variables

	const stopsContext = useStopsContext();
	const vehiclesContext = useVehiclesContext();
	const linesDetailContext = useLinesDetailContext();

	const { linesDetailMap } = useMap();

	//
	// B. Transform Data

	const activeVehiclesFeatureCollection = useMemo(() => {
		if (!linesDetailContext.data.active_pattern_group?.id) return;
		return vehiclesContext.actions.getVehiclesByTripIdGeoJsonFC(linesDetailContext.data.active_pattern_group?.id);
	}, [linesDetailContext.data.active_pattern_group, vehiclesContext.data.vehicles]);

	const activePathFeatureCollection = useMemo(() => {
		if (!linesDetailContext.data.active_pattern_group?.path) return;
		const collection = getBaseGeoJsonFeatureCollection();
		linesDetailContext.data.active_pattern_group.path.forEach((pathStop) => {
			const stopData = stopsContext.actions.getStopById(pathStop.stop_id);
			if (!stopData) return;
			const result = transformStopDataIntoGeoJsonFeature(stopData);
			result.properties = {
				...result.properties,
				color: linesDetailContext.data.active_pattern_group?.color,
				text_color: linesDetailContext.data.active_pattern_group?.text_color,
			};
			collection.features.push(result);
		});
		return collection;
	}, [linesDetailContext.data.active_pattern_group, vehiclesContext.data.vehicles]);

	const activeStopGeoJson = useMemo(() => {
		if (!linesDetailContext.data.active_stop || !linesDetailContext.data.active_pattern_group) return;
		const collection = getBaseGeoJsonFeatureCollection();
		const result = transformStopDataIntoGeoJsonFeature(linesDetailContext.data.active_stop.stop);
		result.properties = {
			...result.properties,
			color: linesDetailContext.data.active_pattern_group.color,
			text_color: linesDetailContext.data.active_pattern_group.text_color,
		};
		collection.features.push(result);
		return collection;
	}, [linesDetailContext.data.active_stop, linesDetailContext.data.active_pattern_group]);

	//
	// C. Handle Actions

	useEffect(() => {
		// If map is not yet in interactive mode, then that means the user has not yet selected a stop.
		// Center the map on the full shape and path of the selected pattern.
		// After the user selects a stop, move map to the selected stop.
		if (linesDetailContext.flags.is_interactive_mode) {
			if (!linesDetailContext.data.active_stop?.stop) return;
			moveMap(linesDetailMap, [linesDetailContext.data.active_stop.stop.lon, linesDetailContext.data.active_stop?.stop.lat]);
		}
		else {
			if (!linesDetailContext.data.active_shape?.geojson) return;
			centerMap(linesDetailMap, [linesDetailContext.data.active_shape.geojson], { padding: 60 });
		}
	}, [linesDetailMap, linesDetailContext.data.active_stop, linesDetailContext.data.active_shape]);

	function handleLayerClick(event) {
		if (!linesDetailMap) return;
		const features = linesDetailMap.queryRenderedFeatures(event.point, { layers: [MapViewStylePathInteractiveLayerId] });
		if (!features.length) return;
		for (const feature of features) {
			if (feature.properties.id === linesDetailContext.data.active_stop?.stop.id) {
				continue;
			}
			else {
				linesDetailContext.actions.setActiveStopByStopId(feature.properties.sequence, feature.properties.id);
				return;
			}
		}
	}

	//
	// D. Render copmonents

	return (
		<MapView
			id="linesDetailMap"
			interactiveLayerIds={[MapViewStylePathInteractiveLayerId]}
			onClick={handleLayerClick}
		>

			<MapViewStylePath
				shapeData={linesDetailContext.data.active_shape?.geojson}
				stopsData={activePathFeatureCollection}
			/>

			<MapViewStyleActiveStops
				stopsData={activeStopGeoJson}
			/>

			<MapViewStyleVehicles
				showCounter="always"
				vehiclesData={activeVehiclesFeatureCollection}
			/>

		</MapView>
	);

	//
}
