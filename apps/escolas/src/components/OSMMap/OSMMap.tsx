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
	return (
		<div className={styles.container}>
			<Map
				id={id}
				mapLib={maplibregl}
				initialViewState={osmMapDefaults.initialViewState}
				minZoom={osmMapDefaults.minZoom}
				maxZoom={osmMapDefaults.maxZoom}
				scrollZoom={scrollZoom}
				mapStyle={osmMapDefaults.styles[mapStyle] || osmMapDefaults.styles.default}
				style={{ height: '400px', width: '100%' }}
				onClick={onClick}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				onMove={onMove}
				onMoveStart={onMoveStart}
				onMoveEnd={onMoveEnd}
				interactive={interactiveLayerIds ? true : false}
				interactiveLayerIds={interactiveLayerIds}
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
