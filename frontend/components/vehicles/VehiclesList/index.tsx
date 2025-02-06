'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import VehiclesListMap from '@/components/vehicles/VehiclesListMap';
import VehiclesListToolbar from '@/components/vehicles/VehiclesListToolbar';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function VehiclesList() {
	//

	//
	// A. Setup variables

	const t = useTranslations('vehicles.VehiclesListToolbar');

	//
	// B. Render components

	return (
		<>
			<Surface>
				<Section heading={t('heading')} subheading={t('subheading')} />
			</Surface>
			<Surface>
				<Section withGap withPadding>
					<p>Informação</p>
				</Section>
			</Surface>
			<Surface>
				<div className={styles.container}>
					<VehiclesListMap />
					<div className={styles.sidebarWrapper}>
						<VehiclesListToolbar />
					</div>
				</div>

			</Surface>
		</>
	);

	//
}
