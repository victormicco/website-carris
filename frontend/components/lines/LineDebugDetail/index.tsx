import { Pattern } from '@carrismetropolitana/api-types/network';

import styles from './styles.module.css';
/* * */
interface Props {
	line_color: string
	pattern_id: null | Pattern
	total_stops: number | undefined
}
/* * */

export function LineDebugDetail({ line_color, pattern_id, total_stops }: Props) {
	return (
		<>
			<div className={styles.container}>
				<ul className={styles.unstyled}>
					<li><p>PATTERN_ID: {pattern_id?.id || 'NULL'}</p></li>
					<li><p>DIRECTION:  {pattern_id?.direction_id || 'NULL'}</p></li>
					<li><p>HEADSIGN: {pattern_id?.headsign || 'NULL'}</p></li>
					<li><p>LINE_COLOR: {line_color || 'NULL'}</p></li>
					<li><p>TOTAL STOPS: {total_stops || 'NULL'}</p></li>
				</ul>
			</div>
		</>
	);
}
