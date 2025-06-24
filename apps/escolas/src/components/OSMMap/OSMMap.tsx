/* eslint-disable @typescript-eslint/no-empty-function */
import maplibregl from 'maplibre-gl';
import Map, { FullscreenControl, NavigationControl, ScaleControl } from 'react-map-gl/maplibre';

import styles from './OSMMap.module.css';

import osmMapDefaults from './OSMMap.config';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function OSMMap({
	children,
	fullscreen = true,
	id,
	interactiveLayerIds = [],
	mapStyle,
	navigation = true,
	onClick = () => {},
	onMouseEnter = () => {},
	onMouseLeave = () => {},
	onMove = () => {},
	onMoveEnd = () => {},
	onMoveStart = () => {},
	scale = true,
	scrollZoom = true,
	toolbar,
}) {
	//

	//
	// A. Render Componente
	return (

		<div className={styles.container}>
			<Map
				id={id}
				initialViewState={osmMapDefaults.initialViewState}
				interactive={interactiveLayerIds ? true : false}
				interactiveLayerIds={interactiveLayerIds}
				mapLib={maplibregl}
				mapStyle={osmMapDefaults.styles[mapStyle] || osmMapDefaults.styles.default}
				maxZoom={osmMapDefaults.maxZoom}
				minZoom={osmMapDefaults.minZoom}
				onClick={onClick}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				onMove={onMove}
				onMoveEnd={onMoveEnd}
				onMoveStart={onMoveStart}
				scrollZoom={scrollZoom}
				style={{ height: '400px', width: '100%' }}
			>
				{navigation && <NavigationControl />}
				{fullscreen && <FullscreenControl />}
				{scale && <ScaleControl maxWidth={100} unit="metric" />}
				{children}
			</Map>
			{toolbar && <div className={styles.toolbar}>{toolbar}</div>}
		</div>
	);
}
