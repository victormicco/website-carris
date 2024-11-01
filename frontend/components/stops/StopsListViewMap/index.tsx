/* * */

import { Surface } from '@/components/layout/Surface';
import { MapView } from '@/components/map/MapView';
import { MapViewStyleStops, MapViewStyleStopsInteractiveLayerId } from '@/components/map/MapViewStyleStops';
import { transformStopDataIntoGeoJsonFeature } from '@/contexts/Stops.context';
import { useStopsListContext } from '@/contexts/StopsList.context';
import { getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';
import * as turf from '@turf/turf';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useMap } from 'react-map-gl/maplibre';

/* * */

export function StopsListViewMap() {
	//

	//
	// A. Setup variables

	const { stopsListMap } = useMap();
	const router = useRouter();
	const stopsListContext = useStopsListContext();

	const [mapisLoaded, setMapisLoaded] = useState(false);

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
		console.log([minX, minY, maxX, maxY]);
		stopsListMap.fitBounds([maxX, maxY, minX, minY], { padding: 50 });
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
