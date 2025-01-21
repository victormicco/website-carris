import { Arrival } from '@/types/stops.types';

import styles from './styles.module.css';
/* * */
interface Props {
	data: Arrival
	stop: string
}
/* * */

export function StopsDebugDetail({ data, stop }: Props) {
	return (
		<>
			<div className={styles.container}>
				<ul className={styles.unstyled}>
					<li><p>STOP_ID: {stop || 'NULL'}</p></li>
					<li><p>TRIP_ID: {data.trip_id || 'NULL'}</p></li>
					<li><p>STOP_SEQ: {data.stop_sequence || 'NULL'}</p></li>
					<li><p>VEHICLE_ID: {data.vehicle_id || 'NULL'}</p></li>
					<li><p>OBSERVADO: {data.observed_arrival || 'NULL'}</p></li>
					<li><p>ESTIMADO: {data.estimated_arrival || 'NULL'}</p></li>
					<li><p>PLANEADO: {data.scheduled_arrival || 'NULL'}</p></li>
				</ul>
			</div>
		</>
	);
}
