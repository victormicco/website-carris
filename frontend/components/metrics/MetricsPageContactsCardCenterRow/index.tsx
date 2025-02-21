/* * */
import { ContactMetrics2024CardSchema } from '@/components/metrics/MetricsPageContacts/_data/cards';
import { IconGripVertical, IconInfoCircleFilled, IconMoodAngry } from '@tabler/icons-react';

import styles from './styles.module.css';
/* * */

interface Props {
	cardData: ContactMetrics2024CardSchema
}

export function ContactsCardCenterRow({ cardData }: Props) {
	// A. Render Components
	return (
		<div className={styles.miniCardContainer}>
			<div className={styles.miniCardcontentNumber}>
				<div className={styles.leftSection}>
					<span><IconInfoCircleFilled size={30} /></span>
				</div>
				<div className={styles.rightSection}>
					<p className={styles.miniCardContentNumberValue}>25%</p>
					<p className={styles.miniCardContentNumberLegend}>Pedidos de Informação</p>
				</div>
			</div>

			<div className={styles.miniCardcontentNumber}>
				<div className={styles.leftSection}>
					<span><IconMoodAngry size={40} /></span>
				</div>
				<div className={styles.rightSection}>
					<p className={styles.miniCardContentNumberValue}>30%</p>
					<p className={styles.miniCardContentNumberLegend}>Reclamações</p>
				</div>
			</div>

			<div className={styles.miniCardcontentNumber}>
				<div className={styles.leftSection}>
					<span><IconGripVertical size={50} /></span>
				</div>
				<div className={styles.rightSection}>
					<p className={styles.miniCardContentNumberValue}>35%</p>
					<p className={styles.miniCardContentNumberLegend}>Outro</p>
				</div>
			</div>
		</div>
	);
	//
}
