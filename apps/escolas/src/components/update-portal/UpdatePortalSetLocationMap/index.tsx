'use client';

/* * */

import { MapView } from '@/components/map/MapView';
import { SchoolData } from '@/components/update-portal/PortalSchoolDetail/types';
import Image from 'next/image';
import { useEffect } from 'react';
import { Marker, useMap } from 'react-map-gl/maplibre';

/* * */

interface Props {
	schoolData: SchoolData
}

/* * */

export function UpdatePortalSetLocationMap({ schoolData }: Props) {
	//

	//
	// A. Setup variables

	const { schoolInfoMap } = useMap();

	//
	// B. Transform data

	useEffect(() => {
		if (!schoolInfoMap || !schoolData) return;
		schoolInfoMap.flyTo({
			center: [parseFloat(schoolData.lon), parseFloat(schoolData.lat)],
			speed: 0.5,
			zoom: 15,
		});
	}, [schoolData, schoolInfoMap]);

	//
	// C. Handle actions

	const handleMapMouseEnter = (event) => {
		if (event?.features[0].properties?.id) {
			schoolInfoMap.getCanvas().style.cursor = 'pointer';
		}
	};

	const handleMapMouseLeave = (event) => {
		if (event?.features[0].properties?.id) {
			schoolInfoMap.getCanvas().style.cursor = 'default';
		}
	};

	//
	// D. Render components

	if (!schoolData) {
		return <div>A carregar...</div>;
	}

	if (!schoolData.lat || !schoolData.lon) {
		return <div>A localização da escola não foi definida.</div>;
	}

	return (
		<MapView
			id="schoolInfoMap"
			onMouseEnter={handleMapMouseEnter}
			onMouseLeave={handleMapMouseLeave}
			scale
			scrollZoom
			toolbar
		>
			<Marker latitude={parseFloat(schoolData.lat)} longitude={parseFloat(schoolData.lon)}>
				<Image alt={schoolData.name} height="50" src="/images/escola.png" width="50" priority />
			</Marker>
		</MapView>
	);

	//
}
