'use client';

/* * */
import { CopyBadge } from '@/components/common/CopyBadge';
import { MapView } from '@/components/map/MapView';
import { MapViewStylePath } from '@/components/map/MapViewStylePath';
import { MapViewStyleVehicles, MapViewStyleVehiclesInteractiveLayerId, MapViewStyleVehiclesPrimaryLayerId } from '@/components/map/MapViewStyleVehicles';
import { useStopsContext } from '@/contexts/Stops.context';
import { useVehiclesContext } from '@/contexts/Vehicles.context';
import { useVehiclesListContext } from '@/contexts/VehiclesList.context';
import { Routes } from '@/utils/routes';
import { IconBike, IconBikeOff, IconWheelchair, IconWheelchairOff } from '@tabler/icons-react';
import { Popup, useMap } from '@vis.gl/react-maplibre';
import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { DateTime } from 'luxon';
import { useEffect, useMemo, useState } from 'react';

import styles from './styles.module.css';

/* * */

export default function Component() {
	// A. Setup variables
	const { vehiclesListMap } = useMap();
	const vehiclesListContext = useVehiclesListContext();
	const vehiclesContext = useVehiclesContext();
	const stopsContext = useStopsContext();
	const [activePathShapeGeoJson, setActivePathShapeGeoJson] = useState<Feature<Geometry, GeoJsonProperties> | FeatureCollection<Geometry, GeoJsonProperties> | undefined>(undefined);

	// B. Fetch Data
	const findTodaysDate = () => {
		return DateTime.now().toFormat('yyyyLLdd');
	};

	const fetchPattern = async (patternId) => {
		const date = await findTodaysDate();

		if (patternId) {
			const actualPattern = await fetch(`${Routes.API}/patterns/${patternId}`).then(res => res.json());
			const isAvailable = actualPattern.filter(item => item.valid_on.includes(date));
			return isAvailable;
		}
	};

	const fetchShape = async (id) => {
		if (id) {
			const shape = await fetch(`${Routes.API}/shapes/${id[0].shape_id}`).then(res => res.json());
			return shape.geojson;
		}
	};

	const activeVehiclesGeoJson = useMemo(() => {
		return vehiclesContext.actions.getAllVehiclesGeoJsonFC();
	}, [vehiclesContext.data.vehicles]);

	// const activePathWaypointsGeoJson = useMemo(() => {
	// 	const patternId = vehiclesListContext.data.selected?.pattern_id;

	// 	if (!vehiclesListContext.data.selected?.pattern_id) return;

	// 	// vehiclesByPatternId.forEach((pathStop) => {
	// 	// 	const stopData = stopsContext.actions.getStopById(pathStop.stop_id || '');
	// 	// 	if (!stopData) return;
	// 	// 	const result = transformStopDataIntoGeoJsonFeature(stopData);
	// 	// 	result.properties = {
	// 	// 		...result.properties,
	// 	// 	};
	// 	// 	collection.features.push(result);
	// 	// });

	// 	// return collection;
	// }, [vehiclesListContext.data.selected, vehiclesContext.data.vehicles]);

	// B. Transform data

	useEffect(() => {
		const fetchData = async () => {
			const patternId = vehiclesListContext.data.selected?.pattern_id;

			if (!patternId) return;

			const shapeId = await fetchPattern(patternId);
			if (!shapeId) return;

			const shapeGeoJson = await fetchShape(shapeId);

			setActivePathShapeGeoJson(shapeGeoJson);
		};

		fetchData();
	}, [vehiclesListContext.data.selected]);

	// C. Handle actions
	function handleLayerClick(event) {
		if (event.features.length !== 0) {
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
			{vehiclesListContext.data.selected
			&& (
				<>
					<Popup key={vehiclesListContext.data.selected.id} anchor="left" className={styles.popupWrapper} closeButton={true} closeOnClick={true} latitude={vehiclesListContext.data.selected.lat} longitude={vehiclesListContext.data.selected.lon} maxWidth="none">
						<div className={styles.iconList}>
							{vehiclesListContext.data.selected.bikes_allowed ? <IconBike /> : <IconBikeOff />}
							{vehiclesListContext.data.selected.wheelchair_accessible ? <IconWheelchair /> : <IconWheelchairOff />}
						</div>
						<CopyBadge label={`Sentados: ${vehiclesListContext.data.selected.capacity_seated ?? 0}`} value={vehiclesListContext.data.selected.capacity_seated ?? 0} hasBorder />
						<CopyBadge label={`Em pé: ${vehiclesListContext.data.selected.capacity_standing ?? 0}`} value={vehiclesListContext.data.selected.capacity_standing ?? 0} />
						<CopyBadge label={`Capacidade Total: ${vehiclesListContext.data.selected.capacity_total ?? 0}`} value={vehiclesListContext.data.selected.capacity_total ?? 0} />
						<CopyBadge label={`Estado: ${vehiclesListContext.data.selected.current_status ?? 'Não defindo'}`} value={vehiclesListContext.data.selected.current_status ?? 'Não defindo'} />
						<CopyBadge label={`Emissões: ${vehiclesListContext.data.selected.emission_class ?? 'Não definido'}`} value={vehiclesListContext.data.selected.emission_class ?? 'Não definido'} />
						<CopyBadge label={`ID: ${vehiclesListContext.data.selected.id ?? 'Não definido'}`} value={vehiclesListContext.data.selected.id ?? 0} />
						<CopyBadge label={`Marca: ${vehiclesListContext.data.selected.make ?? 'Não definido'}`} value={vehiclesListContext.data.selected.make ?? 'Não definido'} />
						<CopyBadge label={`Modelo: ${vehiclesListContext.data.selected.model}`} value={vehiclesListContext.data.selected.model ?? 'Não definido'} />
						<CopyBadge label={`Tipo de propulsão: ${vehiclesListContext.data.selected.propulsion ?? 'Não definido'}`} value={vehiclesListContext.data.selected.propulsion ?? 'Não defenido'} />
					</Popup>
				</>
			)}

			<MapViewStyleVehicles
				vehiclesData={activeVehiclesGeoJson}
			/>

			<MapViewStylePath
				presentBeforeId={MapViewStyleVehiclesPrimaryLayerId}
				shapeData={activePathShapeGeoJson}
				// waypointsData={activePathWaypointsGeoJson}
			/>
		</MapView>
	);
}
