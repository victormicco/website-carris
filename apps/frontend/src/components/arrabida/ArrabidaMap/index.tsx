'use client';

/* * */

import Image from 'next/image';
import { useMemo } from 'react';

import styles from './styles.module.css';

import { AlbarquelPin, CreiroPin, FigueirinhaPin, GalaposPin } from './components/BeachPins';
import { type ArrabidaMapProps } from './types';

// Base and overlays
import BaseMap from './_Export/Mapa365_Base.svg';
import LinhasOff from './_Export/Mapa365_LinhasOff.svg';

// Line-specific overlays
import Line4414 from './_Export/Linhas/Mapa365_4414.svg';
import Line4415 from './_Export/Linhas/Mapa365_4415.svg';
import Line4470 from './_Export/Linhas/Mapa365_4470.svg';
import Line4471 from './_Export/Linhas/Mapa365_4471.svg';
import Line4474 from './_Export/Linhas/Mapa365_4474.svg';
import Line4477 from './_Export/Linhas/Mapa365_4477.svg';

// Legend overlays
import Legend from './_Export/Legenda/Mapa365_Legenda.svg';

/* * */

export function ArrabidaMap({ onPinClick, selectedAccordionId, selectedLineId }: ArrabidaMapProps = {}) {
	//

	const lineOverlay = useMemo(() => {
		const mapping: Record<string, any> = {
			'4414': Line4414,
			'4415': Line4415,
			'4470': Line4470,
			'4471': Line4471,
			'4474': Line4474,
			'4477': Line4477,
		};
		return selectedLineId ? mapping[selectedLineId] ?? LinhasOff : LinhasOff;
	}, [selectedLineId]);

	return (
		<div className={styles.container}>
			<div className={styles.mapContainer}>
				{/* Base map */}
				<Image alt="Mapa Arrábida 365 - Base" className={styles.baseImage} fill priority src={BaseMap} />

				{/* Lines overlay (off or selected line) */}
				<Image alt="Linhas" className={styles.overlayImage} fill src={lineOverlay} />

				{/* Pin overlays - each covers the full map area */}
				<button
					aria-label="Praia de Albarquel"
					className={styles.pinOverlay}
					onClick={() => onPinClick?.('praia-albarquel')}
					type="button"
				>
					<AlbarquelPin isActive={selectedAccordionId === 'praia-albarquel'} zoom={12} />
				</button>

				<button
					aria-label="Praia do Creiro"
					className={styles.pinOverlay}
					onClick={() => onPinClick?.('praia-creiro')}
					type="button"
				>
					<CreiroPin isActive={selectedAccordionId === 'praia-creiro'} zoom={12} />
				</button>

				<button
					aria-label="Praia da Figueirinha"
					className={styles.pinOverlay}
					onClick={() => onPinClick?.('praia-figueirinha')}
					type="button"
				>
					<FigueirinhaPin isActive={selectedAccordionId === 'praia-figueirinha'} zoom={12} />
				</button>

				<button
					aria-label="Praia dos Galápos e Galapinhos"
					className={styles.pinOverlay}
					onClick={() => onPinClick?.('praia-galapos-galapinhos')}
					type="button"
				>
					<GalaposPin isActive={selectedAccordionId === 'praia-galapos-galapinhos'} zoom={12} />
				</button>

				{/* Legend (reference points) */}
				<div className={styles.legendOverlay}>
					<Image alt="Legenda" fill src={Legend} />
				</div>
			</div>
		</div>
	);
}
