'use client';

import OSMMap from '@/components/OSMMap/OSMMap';
import generateUUID from '@/services/generateUUID';
import { SegmentedControl } from '@mantine/core';
import * as turf from '@turf/turf';
import { useEffect, useMemo, useState } from 'react';
import { Layer, Source, useMap } from 'react-map-gl/maplibre';
import useSWR from 'swr';

export default function SelectSchoolMap() {
	//

	//
	// A. Setup variables

	const { selectSchoolMap } = useMap();
	const [mapStyle, setMapStyle] = useState('map');
	const [allSchoolsAsGeojson, setAllSchoolsAsGeojson] = useState(undefined);

	//
	// B. Fetch data

	const { data: allSchoolsData } = useSWR('https://api.carrismetropolitana.pt/datasets/facilities/schools');
	const { data: allStopsData } = useSWR('https://api.carrismetropolitana.pt/stops');

	//
	// C. Transform data

	useEffect(() => {
		(async () => {
			if (!selectSchoolMap || !allSchoolsAsGeojson?.features?.length) return;
			const image = await selectSchoolMap.loadImage('/images/escola.png');
			selectSchoolMap.addImage('store-icon', image.data, { sdf: false });

			const boundingBox = turf.bbox(allSchoolsAsGeojson);
			const bounds: [[number, number], [number, number]] = [
				[boundingBox[0], boundingBox[1]], // southwest corner
				[boundingBox[2], boundingBox[3]], // northeast corner
			];
			selectSchoolMap.fitBounds(bounds, { duration: 2000, padding: 5 });
		})();
	}, [selectSchoolMap, allSchoolsAsGeojson]);

	useEffect(() => {
		(async () => {
			const geoJSON = {
				features: [],
				type: 'FeatureCollection',
			};
			if (allSchoolsData && allSchoolsData.stops.length) {
				for (const school of allSchoolsData) {
					for (const stop of allStopsData) {
						geoJSON.features.push({
							geometry: {
								coordinates: [school.lon, school.lat],
								type: 'Point',
							},
							properties: {
								id: school.id,
								mapid: `${stop.id}${generateUUID()}`,
							},
							type: 'Feature',
						});
					}
				}
				setAllSchoolsAsGeojson(geoJSON);
			}
		})();
	}, [allSchoolsData, allStopsData]);

	const allStopsDataAsGeojson = useMemo(() => {
		const geoJSON: GeoJSON.FeatureCollection = {
			features: [],
			type: 'FeatureCollection',
		};
		if (allStopsData) {
			for (const stop of allStopsData) {
				geoJSON.features.push({
					geometry: { coordinates: [stop.lon, stop.lat], type: 'Point' },
					properties: {},
					type: 'Feature',
				});
			}
		}
		return geoJSON;
	}, [allStopsData]);

	//
	// D. Handle actions

	const handleMapClick = (event) => {
		if (event?.features[0]) {
			selectSchoolMap.getCanvas();
		}
	};

	const handleMapMouseEnter = (event) => {
		if (event?.features[0]?.properties?.id) {
			selectSchoolMap.getCanvas().style.cursor = 'pointer';
		}
	};

	const handleMapMouseLeave = (event) => {
		if (event?.features[0]?.properties?.id) {
			selectSchoolMap.getCanvas().style.cursor = 'default';
		}
	};

	//
	// D. Render components

	return (
		allSchoolsData
		&& allStopsData
		&& (
			<div style={{ height: 400 }}>
				<OSMMap
					fullscreen={true}

					id="selectSchoolMap"
					interactiveLayerIds={['allSchools']}
					mapStyle={mapStyle}
					navigation={true}
					onClick={() => handleMapClick}
					onMouseEnter={() => handleMapMouseEnter}
					onMouseLeave={() => handleMapMouseLeave}
					scrollZoom={true}
					toolbar={(
						<>
							<SegmentedControl
								onChange={setMapStyle}
								size="xs"
								value={mapStyle}
								data={[
									{ label: 'Map', value: 'map' },
									{ label: 'Satellite', value: 'satellite' },
								]}
							/>
						</>
					)}
				>
					<Source data={allStopsDataAsGeojson} id="allStops" type="geojson">
						<Layer
							id="allStops"
							source="allStops"
							type="circle"
							paint={{
								'circle-color': ['case', ['boolean', ['feature-state', 'selected'], false], '#EE4B2B', '#ffdd01'],
								'circle-radius': ['interpolate', ['linear'], ['zoom'], 9, ['case', ['boolean', ['feature-state', 'selected'], false], 5, 1], 26, ['case', ['boolean', ['feature-state', 'selected'], false], 20, 10]],
								'circle-stroke-color': '#000000',
								'circle-stroke-width': ['interpolate', ['linear'], ['zoom'], 9, 0.35, 26, 5],
							}}
						/>
					</Source>
					<Source data={allSchoolsAsGeojson} id="allSchools" type="geojson">
						<Layer id="allSchools" layout={{ 'icon-image': 'store-icon', 'icon-size': ['interpolate', ['linear'], ['zoom'], 9, 0.1, 26, 0.75] }} source="allSchools" type="symbol" />
					</Source>
				</OSMMap>
			</div>
		)

	);

	//
}
