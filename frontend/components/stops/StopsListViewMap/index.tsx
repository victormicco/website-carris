/* * */

import { Surface } from '@/components/layout/Surface';
import { MapView } from '@/components/map/MapView';
import { MapViewStyleStops, MapViewStyleStopsInteractiveLayerId } from '@/components/map/MapViewStyleStops';
import { transformStopDataIntoGeoJsonFeature } from '@/contexts/Stops.context';
import { useStopsListContext } from '@/contexts/StopsList.context';
import { getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';
import * as turf from '@turf/turf';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { useMap } from 'react-map-gl/maplibre';

/* * */

export function StopsListViewMap() {
	//

	//
	// A. Setup variables

	const { stopsListMap } = useMap();
	const router = useRouter();
	const stopsListContext = useStopsListContext();

	//
	// B. Transform data

	const allStopsGeoJson = useMemo(() => {
		const collection = getBaseGeoJsonFeatureCollection();
		stopsListContext.data.filtered.forEach(stop => collection.features.push(transformStopDataIntoGeoJsonFeature(stop)));
		return collection;
	}, [stopsListContext.data.filtered]);

	//
	// C. Handle Actions

	useEffect(() => {
		if (!allStopsGeoJson || !stopsListMap) return;
		const [minX, minY, maxX, maxY] = turf.bbox(allStopsGeoJson);
		stopsListMap.fitBounds([Number(maxX), Number(maxY), Number(minX), Number(minY)], { padding: 50 });
	}, [allStopsGeoJson, stopsListMap]);

	useEffect(() => {
		if (!allStopsGeoJson || !stopsListMap) return;
		const envelope = turf.envelope(allStopsGeoJson);
		if (!envelope || !envelope.bbox) return;
		stopsListMap.fitBounds([envelope.bbox[0], envelope.bbox[1], envelope.bbox[2], envelope.bbox[3]], { padding: 25 });
	}, [allStopsGeoJson, stopsListMap]);

	function handleLayerClick(event) {
		if (!stopsListMap) return;
		const features = stopsListMap.queryRenderedFeatures(event.point);
		if (!features.length) return;
		for (const feature of features) {
			if (feature.layer.id === MapViewStyleStopsInteractiveLayerId) {
				router.push(`/stops/${feature.properties.id}`);
				return;
			}
		}
	}

	//
	// D. Render components

	return (
		<Surface forceOverflow>
			<div style={{ height: 600 }}>
				<MapView
					id="stopsListMap"
					interactiveLayerIds={[MapViewStyleStopsInteractiveLayerId]}
					onClick={handleLayerClick}
				>
					<MapViewStyleStops stopsData={allStopsGeoJson} />
				</MapView>
			</div>
		</Surface>
	);

	//
}
