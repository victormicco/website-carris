'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import VehiclesListGroup from '@/components/vehicles/VehiclesListGroup';
import VehiclesListMap from '@/components/vehicles/VehiclesListMap';
import VehiclesListToolbar from '@/components/vehicles/VehiclesListToolbar';

import styles from './styles.module.css';

/* * */

export default function Component() {
	return (
		<>
			<VehiclesListToolbar />
			<Surface>
				<VehiclesListGroup />
			</Surface>
			<Surface>
				<Section>
					<div className={styles.contentWrapper}>
						<VehiclesListMap />
					</div>
				</Section>
			</Surface>
		</>
	);
}
