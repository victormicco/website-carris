'use client';

import BackHome from '@/components/BackHome/BackHome';
import BlackHeader from '@/components/BlackHeader/BlackHeader';
import DownloadPDF from '@/components/DownloadPDF/DownloadPDF';
import NaveganteCard from '@/components/NaveganteCard/NaveganteCard';
import NoServiceMessage from '@/components/NoServiceMessage/NoServiceMessage';
import OSMMap from '@/components/OSMMap/OSMMap';
import Planner from '@/components/Planner/Planner';
import SourceDisclaimer from '@/components/SourceDisclaimer/SourceDisclaimer';
import StopInfo from '@/components/StopInfo/StopInfo';
import Titles from '@/components/Titles/Titles';
import { SegmentedControl } from '@mantine/core';
import * as turf from '@turf/turf';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { Layer, Marker, Source, useMap } from 'react-map-gl/maplibre';
import useSWR from 'swr';

import styles from './SchoolInfo.module.css';

export default function SchoolInfo({ school_id }) {
	//

	//
	// A. Setup variables

	const { schoolInfoMap } = useMap();
	const [mapStyle, setMapStyle] = useState('map');
	const [schoolStopsAsGeojson, setSchoolStopsAsGeojson] = useState(null);

	//
	// B. Fetch data

	const { data: schoolData } = useSWR(`https://api.carrismetropolitana.pt/datasets/facilities/schools/${school_id}`);
	const { data: allStopsData } = useSWR('https://api.carrismetropolitana.pt/stops');

	//
	// C. Transform data

	useEffect(() => {
		if (!schoolInfoMap || !schoolStopsAsGeojson?.features?.length) return;
		const boundingBox = turf.bbox(schoolStopsAsGeojson);
		// turf.bbox returns [minX, minY, maxX, maxY] => [north, south, east, west]
		const bounds: [[number, number], [number, number]] = [
			[boundingBox[0], boundingBox[1]],
			[boundingBox[2], boundingBox[3]],
		];

		schoolInfoMap.fitBounds(bounds, { duration: 2000, padding: 150 });
	}, [schoolInfoMap, schoolStopsAsGeojson]);

	useEffect(() => {
		(async () => {
			const geoJSON: GeoJSON.FeatureCollection = {
				features: [],
				type: 'FeatureCollection',
			};
			if (schoolData) {
				geoJSON.features.push({
					geometry: { coordinates: [parseFloat(schoolData.lon), parseFloat(schoolData.lat)], type: 'Point' },
					properties: {},
					type: 'Feature',
				});
			}
			if (schoolData && schoolData.stops.length) {
				for (const [stopIndex, stopCode] of schoolData.stops.entries()) {
					const stopResponse = await fetch(`https://api.carrismetropolitana.pt/stops/${stopCode}`);
					const stopData = await stopResponse.json();
					geoJSON.features.push({
						geometry: { coordinates: [parseFloat(stopData.lon), parseFloat(stopData.lat)], type: 'Point' },
						properties: { index: stopIndex + 1 },
						type: 'Feature',
					});
				}
			}

			setSchoolStopsAsGeojson(geoJSON);
		})();
	}, [schoolData]);

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
	// D. Render components

	return (
		schoolData && (
			<div className={styles.container}>
				<div className={styles.titles}>
					<Titles goHome={true} municipality_name={schoolData.municipality_name} school_name={schoolData.name} />
				</div>

				<div style={{ height: 400 }}>
					<OSMMap

						fullscreen={true}
						id="schoolInfoMap"
						mapStyle={mapStyle}
						navigation={true}
						scrollZoom={false}
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
							<Layer id="allStops" paint={{ 'circle-color': '#ffdd01', 'circle-radius': 4, 'circle-stroke-color': '#000000', 'circle-stroke-width': 1 }} source="allStops" type="circle" />
						</Source>
						<Source data={schoolStopsAsGeojson} id="schoolStops" type="geojson">
							<Layer id="schoolStops" paint={{ 'circle-color': '#235fe1', 'circle-radius': 10, 'circle-stroke-color': '#000000', 'circle-stroke-width': 2 }} source="schoolStops" type="circle" />
							<Layer id="school-stops-labels" layout={{ 'text-anchor': 'center', 'text-field': ['get', 'index'], 'text-offset': [0, 0], 'text-size': 12 }} paint={{ 'text-color': '#ffffff' }} source="schoolStops" type="symbol" />
						</Source>
						<Marker latitude={schoolData.lat} longitude={schoolData.lon}>
							<Image alt={schoolData.name} height={50} src="/images/escola.png" width={50} priority />
						</Marker>
					</OSMMap>
				</div> <br />

				<div className={styles.gridWrapper}>
					<div className={styles.stopsWrapper}>
						<BlackHeader text={`Paragens que servem a instituição: ${schoolData.name}`} />
						{schoolData && schoolData.stops.length > 0
							? (
								<div className={styles.stopsList}>
									{schoolData.stops.map((stopCode, stopIndex) => <StopInfo key={stopCode} index={stopIndex + 1} stop_id={stopCode} />)}
								</div>
							)
							: (
								<div className={styles.stopsList}>
									<NoServiceMessage municipality_id={schoolData.municipality_id} municipality_name={schoolData.municipality_name} />
								</div>
							)}
					</div>
					<div className={styles.actionsWrapper}>
						{schoolData && schoolData.stops.length > 0 && <DownloadPDF school_id={school_id} />}
						<Planner />
						<NaveganteCard />
					</div>
				</div>

				<BackHome />

				<SourceDisclaimer />
			</div>
		)

	);

	//
}
