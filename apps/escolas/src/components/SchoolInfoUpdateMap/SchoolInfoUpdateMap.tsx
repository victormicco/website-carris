'use client';

import OSMMap from '@/components/OSMMap/OSMMap';
import { SegmentedControl } from '@mantine/core';
import * as turf from '@turf/turf';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Marker, useMap } from 'react-map-gl/maplibre';

import { SchoolData } from '../SchoolInfoUpdate/types';

export default function SchoolInfoUpdateMap({ schoolData }: { schoolData: SchoolData }) {
	//

	//
	// A. Setup variables

	const { schoolInfoMap } = useMap();
	const [mapStyle, setMapStyle] = useState('map');

	//
	// B. Fetch data

	//
	// C. Transform data

	useEffect(() => {
		if (!schoolInfoMap || !schoolData) return;
		schoolInfoMap.flyTo({
			center: [parseFloat(schoolData.lon), parseFloat(schoolData.lat)],
			speed: 0.5,
			zoom: 15,
		});
	}, [schoolData, schoolInfoMap]);

	//
	// D. Render components

	return (
		schoolData
		&& (
			<OSMMap
  id="schoolInfoMap"
  scrollZoom={false}
  navigation={true}
  fullscreen={true}
  mapStyle={mapStyle}
  toolbar={(
					<>
						<SegmentedControl
  value={mapStyle}
  onChange={setMapStyle}
  size="xs"
  data={[
								{ label: 'Map', value: 'map' },
								{ label: 'Satellite', value: 'satellite' },
							]}
						/>
					</>
				)}
			>
				<Marker latitude={parseFloat(schoolData.lat)} longitude={parseFloat(schoolData.lon)}>
					<Image alt={schoolData.name} height={50} priority src="/images/escola.png" width={50} />
				</Marker>
			</OSMMap>
		)

	);

	//
}
