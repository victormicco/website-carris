'use client';

/* * */

import { MapViewStyleActiveStops } from '@/components/map/MapViewStyleActiveStops';
import { MapViewStylePath } from '@/components/map/MapViewStylePath';
import { transformStopDataIntoGeoJsonFeature, useStopsContext } from '@/contexts/Stops.context';
import { getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';
import { type Pattern } from '@carrismetropolitana/api-types/network';
import { useMemo } from 'react';

/* * */

interface ArrabidaLineDisplayProps {
	activeWaypoint?: null | { stop_id: string, stop_sequence: number }
	coloredShapeData?: GeoJSON.FeatureCollection
	selectedLinePattern?: null | Pattern
}

/* * */

export function ArrabidaLineDisplay({ activeWaypoint, coloredShapeData, selectedLinePattern }: ArrabidaLineDisplayProps) {
	//

	//
	// A. Setup variables

	const stopsContext = useStopsContext();

	//
	// B. Transform data

	const activePathFeatureCollection = useMemo(() => {
		if (!selectedLinePattern?.path) return undefined;
		const collection = getBaseGeoJsonFeatureCollection();

		selectedLinePattern.path.forEach((pathStop) => {
			const stopData = stopsContext.actions.getStopById(pathStop.stop_id);
			if (!stopData) return;
			const result = transformStopDataIntoGeoJsonFeature(stopData);
			result.properties = {
				...result.properties,
				color: selectedLinePattern?.color,
				sequence: pathStop.stop_sequence,
				text_color: selectedLinePattern?.text_color,
			};
			collection.features.push(result);
		});

		return collection;
	}, [selectedLinePattern, stopsContext]);

	const activeStopFeatureCollection = useMemo(() => {
		if (!activeWaypoint || !selectedLinePattern?.path) return undefined;
		const pathStop = selectedLinePattern.path.find(ps => ps.stop_id === activeWaypoint.stop_id);
		if (!pathStop) return undefined;

		const stopData = stopsContext.actions.getStopById(pathStop.stop_id);
		if (!stopData) return undefined;

		const collection = getBaseGeoJsonFeatureCollection();
		const result = transformStopDataIntoGeoJsonFeature(stopData);
		result.properties = {
			...result.properties,
			color: selectedLinePattern?.color,
			text_color: selectedLinePattern?.text_color,
		};
		collection.features.push(result);
		return collection;
	}, [activeWaypoint, selectedLinePattern, stopsContext]);

	//
	// C. Render components

	if (!coloredShapeData) return null;

	return (
		<>
			{activeStopFeatureCollection && (
				<MapViewStyleActiveStops
					stopsData={activeStopFeatureCollection}
				/>
			)}

			<MapViewStylePath
				shapeData={coloredShapeData}
				waypointsData={activePathFeatureCollection}
			/>
		</>
	);

	//
}
