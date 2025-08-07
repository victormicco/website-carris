'use client';

/* * */

import { MapView } from '@/components/map/MapView';
import { MapViewStylePathInteractiveLayerId } from '@/components/map/MapViewStylePath';
import { useMap } from '@vis.gl/react-maplibre';
import { useCallback, useEffect } from 'react';

import styles from './styles.module.css';

import { ArrabidaBeachPins } from './components/ArrabidaBeachPins';
import { ArrabidaLineDisplay } from './components/ArrabidaLineDisplay';
import { BEACH_PINS } from './constants';
import { useArrabidaLineData } from './hooks/useArrabidaLineData';
import { useArrabidaMapInteractions } from './hooks/useArrabidaMapInteractions';
import { useMapZoom } from './hooks/useMapZoom';
import { type ArrabidaMapProps } from './types';

/* * */

export function ArrabidaMap({ onPinClick, selectedAccordionId, selectedLineId }: ArrabidaMapProps = {}) {
	//

	//
	// A. Setup variables

	const { arrabidaMap } = useMap();
	const currentZoom = useMapZoom();

	//
	// B. Setup hooks

	const lineData = useArrabidaLineData();
	const mapInteractions = useArrabidaMapInteractions(onPinClick);

	//
	// C. Handle actions

	useEffect(() => {
		if (selectedLineId) {
			lineData.actions.selectLine(selectedLineId);
		}
		else {
			lineData.actions.clearSelection();
			mapInteractions.actions.setActiveWaypoint(null);
		}
	}, [selectedLineId, lineData.actions, mapInteractions.actions]);

	useEffect(() => {
		if (!arrabidaMap) return;
		arrabidaMap.flyTo({
			center: [-8.9, 38.48],
			duration: 1000,
			zoom: 12,
		});
	}, [arrabidaMap]);

	// Center map on selected accordion pin
	useEffect(() => {
		if (!arrabidaMap || !selectedAccordionId) return;

		const selectedBeach = BEACH_PINS.find(beach => beach.accordionId === selectedAccordionId);

		if (selectedBeach) {
			arrabidaMap.flyTo({
				center: selectedBeach.coordinates,
				duration: 1000,
				zoom: 14, // Zoom in a bit more to focus on the pin
			});
		}
	}, [arrabidaMap, selectedAccordionId]);

	const handleCenterMap = useCallback(() => {
		if (!arrabidaMap) return;
		arrabidaMap.flyTo({
			center: [-8.9, 38.48],
			duration: 1000,
			zoom: 12,
		});
	}, [arrabidaMap]);

	//
	// D. Render components

	return (
		<div className={styles.container}>
			<div className={styles.mapContainer}>
				<MapView
					id="arrabidaMap"
					interactiveLayerIds={[MapViewStylePathInteractiveLayerId]}
					onCenterMap={handleCenterMap}
					onClick={mapInteractions.actions.handleLayerClick}
				>

					<ArrabidaBeachPins
						currentZoom={currentZoom}
						onPinClick={mapInteractions.actions.handlePinClick}
						selectedAccordionId={selectedAccordionId}
					/>

					<ArrabidaLineDisplay
						activeWaypoint={mapInteractions.data.activeWaypoint}
						coloredShapeData={lineData.data.coloredShapeData}
						selectedLinePattern={lineData.data.selectedLinePattern}
					/>

				</MapView>
			</div>
		</div>
	);

	//
}
