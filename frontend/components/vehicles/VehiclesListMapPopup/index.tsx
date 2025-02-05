import { Section } from '@/components/layout/Section';
import { VehicleListMapPopupBadge } from '@/components/vehicles/VehicleListMapPopupBadge';
import { Table } from '@mantine/core';
import {
	IconBike,
	IconBikeOff,
	IconWheelchair,
	IconWheelchairOff,
} from '@tabler/icons-react';

import styles from './styles.module.css';

export function VehicleListMapPopup({ lineData, selectedVehicle }) {
	// A. Setup Variables

	const id = selectedVehicle.id;
	const license_plate = selectedVehicle.license_plate;
	const capacity_seated = selectedVehicle.capacity_seated;
	const capacity_standing = selectedVehicle.capacity_standing;
	const capacity_total = selectedVehicle.capacity_total;
	const make = selectedVehicle.make;
	const model = selectedVehicle.model;
	const propulsion = selectedVehicle.propulsion;
	const emission_class = selectedVehicle.emission_class;
	const current_status = selectedVehicle.current_status;

	//

	// B. Render Components
	return (
		<Section>
			<div key={id} className={styles.dataWrapper}>
				<VehicleListMapPopupBadge lineData={lineData} />

				<div className={styles.iconList}>
					{selectedVehicle.bikes_allowed ? <IconBike /> : <IconBikeOff />}
					{selectedVehicle.wheelchair_accessible ? <IconWheelchair /> : <IconWheelchairOff />}
					<p className={styles.license_plate}>{license_plate ? license_plate : 'Não Definido'}</p>
				</div>

				<div className={styles.tableWrapper}>
					<Table striped withColumnBorders withRowBorders withTableBorder>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>Campo</Table.Th>
								<Table.Th>Valor </Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{[
								{ label: 'ID', value: id ? id : 'Não Definido.' },
								{ label: 'Lugares Sentados', value: capacity_seated ? capacity_seated : 'Não Definido' },
								{ label: 'Lugares em pé', value: capacity_standing ? capacity_standing : 'Não Definido' },
								{ label: 'Capacidade Total', value: capacity_total ? capacity_total : 'Não Definido' },
								{ label: 'Marca', value: make ? make : 'Não Definido' },
								{ label: 'Modelo', value: model ? model : 'Não Definido.' },
								{ label: 'Propulsão', value: propulsion ? propulsion : 'Não Definido' },
								{ label: 'Emission Class', value: emission_class ? emission_class : 'Não Definido' },
								{ label: 'Estado Atual', value: current_status ? current_status : 'Não Definido' },
							].map(row => (
								<Table.Tr key={row.label}>
									<Table.Td>{row.label}</Table.Td>
									<Table.Td>{row.value}</Table.Td>
								</Table.Tr>
							))}
						</Table.Tbody>
					</Table>
				</div>
			</div>
		</Section>
	);
}
