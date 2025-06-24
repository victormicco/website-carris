'use client';

import { Divider } from '@mantine/core';
import maplibregl from 'maplibre-gl';
import { useState } from 'react';
import Map, { FullscreenControl, Marker, NavigationControl, Popup, ScaleControl } from 'react-map-gl/maplibre';

import 'maplibre-gl/dist/maplibre-gl.css';
import styles from './Mapa.module.css';

export default function Mapa({ children, height, id, interactiveLayerIds = [], latitude, longitude, mapStyle, onClick = () => {}, schoolInfo, scrollZoom = true, toolbar, width }) {
	//

	//
	// setup variables
	// DEFAULTS FOR OSM MAP

	// Bearing, Pitch and Zoom
	const defaultBearing = 0;
	const defaultPicth = 0;
	const defaultZoom = 15;

	// Min and Max Zoom
	const minZoom = 5;
	const maxZoom = 18;

	// MAP STYLES

	const styleMap = 'https://maps.carrismetropolitana.pt/styles/default/style.json';

	const styleSatellite = {
		layers: [
			{
				id: 'simple-tiles',
				source: 'raster-tiles',
				type: 'raster',
			},
		],
		sources: {
			'raster-tiles': {
				attribution:
					'Map tiles by <a target="_top" rel="noopener" href="http://stamen.com">Stamen Design</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>',
				tiles: ['https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
				tileSize: 256,
				type: 'raster',
			},
		},
		version: 8,
	};

	//
	// EXPORT SINGLE OBJECT

	const osmMapDefaults = {
		center: [longitude, latitude],
		initialViewState: { bearing: defaultBearing, latitude: latitude, longitude: longitude, pitch: defaultPicth, zoom: defaultZoom },
		maxZoom: maxZoom,
		minZoom: minZoom,
		styles: { default: styleMap, map: styleMap, satellite: styleSatellite },
		viewport: { bearing: defaultBearing, center: [longitude, latitude], pitch: defaultPicth, zoom: defaultZoom },
	};

	// variables to toggle the popup

	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const handleMarkerClick = () => {
		setIsPopupOpen(!isPopupOpen); // Toggle the popup state
	};

	// const [selectedStop, setSelectedStop] = useState(null);
	// const _handleStopMarkerClick = stop => {
	// 	setSelectedStop(stop);
	// };

	//
	// rendered content

	return (
		<div className={styles.container} style={{ height: height || '100%', width: width || '100%' }}>
			<Map
				id={`${id}Map`}
				mapLib={maplibregl}
				initialViewState={osmMapDefaults.initialViewState}
				minZoom={osmMapDefaults.minZoom}
				maxZoom={osmMapDefaults.maxZoom}
				scrollZoom={scrollZoom}
				mapStyle={osmMapDefaults.styles[mapStyle] || osmMapDefaults.styles.default}
				style={{ height: height || '100%', width: width || '100%' }}
				onClick={onClick}
				interactive={interactiveLayerIds ? true : false}
				interactiveLayerIds={interactiveLayerIds}
				attributionControl={false}
			>
				<Marker latitude={latitude} longitude={longitude}>
					<div className={styles.customMarker} onMouseOut={handleMarkerClick} onMouseOver={handleMarkerClick}>
						{}
						<img alt="escola" className={styles.markerImage} src="/images/escola.png" />
					</div>

					{isPopupOpen && (
						<Popup className={styles.popup} closeButton={true} closeOnClick={false} latitude={latitude} longitude={longitude} onClose={() => setIsPopupOpen(false)}>
							<div className={styles.school}>
								<div className={styles.schoolName}>{schoolInfo.name}</div>
								<div className={styles.schoolAddress}>{schoolInfo.address}</div>
								<div className={styles.schoolPostalCode}>{schoolInfo.postal_code}</div>
							</div>
						</Popup>
					)}
				</Marker>

				{/* {stops.map((stop, index) => (
					<Marker key={index} latitude={parseFloat(stop.stop_lat)} longitude={parseFloat(stop.stop_lon)}>
						<div className={styles.circleMarker} onMouseOver={() => handleStopMarkerClick(stop)}></div>
					</Marker>
				))} */}

				{/* {selectedStop && (
					<Popup latitude={parseFloat(selectedStop.stop_lat)} longitude={parseFloat(selectedStop.stop_lon)} onClose={() => setSelectedStop(null)} closeOnClick={true} className={styles.popup}>
						<Stop stop={selectedStop} isMap={true} />
					</Popup>
				)} */}

				<NavigationControl />
				<FullscreenControl />
				<ScaleControl maxWidth={200} unit="metric" />
				{children}
			</Map>
			<Divider />
			{toolbar && <div className={styles.toolbar}>{toolbar}</div>}
		</div>
	);
}
