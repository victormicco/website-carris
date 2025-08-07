'use client';

/* * */

import { Marker } from '@vis.gl/react-maplibre';

import { BEACH_PINS } from '../constants';
import { type BeachPin } from '../types';
import { AlbarquelPin, CreiroPin, FigueirinhaPin, GalaposPin } from './BeachPins';

/* * */

interface ArrabidaBeachPinsProps {
	currentZoom: number
	onPinClick: (beachId: string) => void
	selectedAccordionId?: string
}

/* * */

function renderBeachPin(beach: BeachPin, isActive: boolean, currentZoom: number) {
	const commonProps = { isActive, zoom: currentZoom };

	switch (beach.id) {
		case 'albarquel':
			return <AlbarquelPin {...commonProps} />;
		case 'creiro':
			return <CreiroPin {...commonProps} />;
		case 'figueirinha':
			return <FigueirinhaPin {...commonProps} />;
		case 'galapos':
			return <GalaposPin {...commonProps} />;
		default:
			return (
				<div style={{ cursor: 'pointer' }}>
					<div>🏖️</div>
					<div>{beach.name.split(' ').pop()}</div>
				</div>
			);
	}
}

/* * */

export function ArrabidaBeachPins({ currentZoom, onPinClick, selectedAccordionId }: ArrabidaBeachPinsProps) {
	//

	//
	// A. Render components

	return (
		<>
			{BEACH_PINS.map((beach) => {
				const isActive = selectedAccordionId === beach.accordionId;
				return (
					<Marker
						key={beach.id}
						anchor="center"
						latitude={beach.coordinates[1]}
						longitude={beach.coordinates[0]}
						onClick={() => onPinClick(beach.id)}
					>
						{renderBeachPin(beach, isActive, currentZoom)}
					</Marker>
				);
			})}
		</>
	);

	//
}
