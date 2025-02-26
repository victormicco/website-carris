//

import { transformStopDataIntoGeoJsonFeature } from '@/contexts/Stops.context';
import { getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';

//
self.addEventListener('message', (event: MessageEvent) => {
	const { filteredStops, localities, municipalities, stops, type } = event.data;
	const collection = getBaseGeoJsonFeatureCollection();

	switch (type) {
		// This is the worker that will fetch the locality name for a given locality
		case 'stop_add_extra_fields':
			stops.forEach((stop) => {
				const municipality = municipalities.find(municipality => municipality.id === stop.municipality_id);
				const locality = localities.find(location => location.id === stop.locality_id);

				if (locality) {
					stop.locality_name = locality.name;
				}

				if (municipality) {
					stop.municipality_name = municipality.name;
				}
			});

			self.postMessage(stops);
			break;

		// This is the worker that is responsible to generate the point collection for the map
		case 'stop_map_geojson':
			filteredStops.forEach((stop) => {
				const stopFC = transformStopDataIntoGeoJsonFeature(stop);
				if (stopFC) collection.features.push(stopFC);
			});

			self.postMessage(collection);
			break;
		// Default behaviour
		default:
			break;
	}
});

//
