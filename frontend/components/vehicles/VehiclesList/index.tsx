'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import VehiclesListGroup from '@/components/vehicles/VehiclesListGroup';
import VehiclesListToolbar from '@/components/vehicles/VehiclesListToolbar';
import { useTranslations } from 'next-intl';

import VehiclesListMap from '../VehiclesListMap';
import styles from './styles.module.css';

/* * */

export default function Component() {
	const t = useTranslations('vehicles.VehiclesListToolbar');

	return (
		<>
			<Surface>
				<Section heading={t('heading')} subheading={t('subheading')} />
			</Surface>
			<Surface>
				<Section withGap withPadding>
					<VehiclesListGroup />
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
}
