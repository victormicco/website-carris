/* * */

import { Section } from '@/components/layout/Section';
import { LineBadge } from '@/components/lines/LineBadge';
import { Table } from '@mantine/core';
import { IconBike, IconBikeOff, IconDisabled2, IconDisabledOff } from '@tabler/icons-react';

import styles from './styles.module.css';

/* * */

export function VehicleListMapDetails({ lineData, selectedVehicle }) {
	//

	//
	// A. Setup variables

	const {
		bikes_allowed,
		capacity_seated = 'Não Definido',
		capacity_standing = 'Não Definido',
		capacity_total = 'Não Definido',
		current_status = 'Não Definido',
		emission_class = 'Não Definido',
		id = 'Não Definido',
		license_plate = 'Não Definido',
		make = 'Não Definido',
		model = 'Não Definido',
		propulsion = 'Não Definido',
		wheelchair_accessible,
	} = selectedVehicle;

	const rows = [
		{ label: 'ID', value: id },
		{ label: 'Lugares Sentados', value: capacity_seated },
		{ label: 'Lugares em pé', value: capacity_standing },
		{ label: 'Capacidade Total', value: capacity_total },
		{ label: 'Marca', value: make },
		{ label: 'Modelo', value: model },
		{ label: 'Propulsão', value: propulsion },
		{ label: 'Emission Class', value: emission_class },
		{ label: 'Estado Atual', value: current_status },
	];

	return (
		<Section>
			<div key={id} className={styles.dataWrapper}>
				<LineBadge lineData={lineData} />

				<div className={styles.iconList}>
					{bikes_allowed ? <IconBike /> : <IconBikeOff />}
					{wheelchair_accessible ? <IconDisabled2 /> : <IconDisabledOff />}
					<p className={styles.license_plate}>{license_plate}</p>
				</div>

				<div className={styles.tableWrapper}>
					<Table withRowBorders>
						<Table.Thead>
							<Table.Tr>
								<Table.Th className={styles.tableHeaders}>Campo</Table.Th>
								<Table.Th className={styles.tableHeaders}>Valor</Table.Th>
							</Table.Tr>
						</Table.Thead>
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
			</div>
		</Section>
	);
}
