'use client';

/* * */

import { NoDataLabel } from '@/components/layout/NoDataLabel';
import { Section } from '@/components/layout/Section';
import { LineBadge } from '@/components/lines/LineBadge';
import { LineName } from '@/components/lines/LineName';
import { useLinesContext } from '@/contexts/Lines.context';
import { useVehiclesListContext } from '@/contexts/VehiclesList.context';
import { Table } from '@mantine/core';
import { IconBike, IconBikeOff, IconDisabled2, IconDisabledOff } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

export function VehiclesListDetails() {
	//

	//
	// A. Setup variables

	const t = useTranslations('vehicles.VehiclesListDetails');

	const linesContext = useLinesContext();
	const vehiclesListContext = useVehiclesListContext();

	//
	// B. Fetch data

	const activeLineData = useMemo(() => {
		return linesContext.actions.getLineDataById(vehiclesListContext.data.selected?.line_id || '');
	}, [vehiclesListContext.data.selected?.line_id]);

	const rows = [
		{ label: 'ID', value: vehiclesListContext.data.selected?.id },
		{ label: 'Lugares Sentados', value: vehiclesListContext.data.selected?.capacity_seated },
		{ label: 'Lugares em pé', value: vehiclesListContext.data.selected?.capacity_standing },
		{ label: 'Capacidade Total', value: vehiclesListContext.data.selected?.capacity_total },
		{ label: 'Marca', value: vehiclesListContext.data.selected?.make },
		{ label: 'Modelo', value: vehiclesListContext.data.selected?.model },
		{ label: 'Propulsão', value: vehiclesListContext.data.selected?.propulsion },
		{ label: 'Emission Class', value: vehiclesListContext.data.selected?.emission_class },
		{ label: 'Estado Atual', value: vehiclesListContext.data.selected?.current_status },
	];

	//
	// C. Render components

	return (
		<Section withGap withPadding>
			{vehiclesListContext.data.selected ? (
				<div className={styles.dataWrapper}>

					<LineBadge lineData={activeLineData} size="lg" />
					<LineName align="center" lineData={activeLineData} size="lg" />

					<div className={styles.iconList}>
						{vehiclesListContext.data.selected?.bikes_allowed ? <IconBike /> : <IconBikeOff />}
						{vehiclesListContext.data.selected?.wheelchair_accessible ? <IconDisabled2 /> : <IconDisabledOff />}
						{vehiclesListContext.data.selected.license_plate && <p className={styles.licensePlate}>{vehiclesListContext.data.selected.license_plate}</p>}
					</div>

					<Table withRowBorders>
						<Table.Tbody>
							{rows.map(row => (
								<Table.Tr key={row.label}>
									<Table.Td className={styles.rowLabel}>{row.label}</Table.Td>
									<Table.Td className={styles.rowValue}>{row.value}</Table.Td>
								</Table.Tr>
							))}
						</Table.Tbody>
					</Table>

				</div>
			) : (
				<NoDataLabel text={t('no_data')} />
			)}
		</Section>
	);

	//
}
