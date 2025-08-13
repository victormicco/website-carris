'use client';

/* * */

import { DraggableAllPins } from './components/BeachPins/DraggableAllPins';
// Line-specific overlays
import styles from './styles.module.css';
// Base and overlays
import type { ArrabidaMapProps } from './types';

/* * */

export function ArrabidaMap({
	onPinClick,
	selectedAccordionId,
	selectedLineId,
}: ArrabidaMapProps = {}) {
	return (
		<div className={styles.container}>
			<div className={styles.mapContainer}>
				{/* Base map */}
				{/* <Image
					alt="Mapa Arrábida 365 - Base"
					className={styles.baseImage}
					src={BaseMap}
					fill
					priority
				/> */}

				{/* Lines overlay (off or selected line) */}
				{/* <Image
					alt="Linhas"
					className={styles.overlayImage}
					src={lineOverlay}
					fill
				/> */}

				{/* Pin overlays - each covers the full map area */}
				<DraggableAllPins
					enableDoubleClickReset={true}
					style={{ display: 'block', height: '100%', width: '100%' }}
				/>
				{/* <button
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
				</button> */}

				{/* Legend (reference points) */}
				{/* <div className={styles.legendOverlay}>
					<Image alt="Legenda" src={Legend} fill />
				</div> */}
			</div>
		</div>
	);
}
