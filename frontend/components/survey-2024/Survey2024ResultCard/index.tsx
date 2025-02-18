'use client';

/* * */

import { Survery2024ResultsCardSchema } from '@/components/survey-2024/_data/Results/cards';

import styles from './styles.module.css';
/* * */

interface Props {
	cardData: Survery2024ResultsCardSchema
}
/* * */

export function Survey2024ResultCard({ cardData }: Props) {
	//

	//
	// A. Render components

	return (

		<div className={styles.container} id={cardData._id?.toString() || ''} style={{ border: `1px solid ${cardData.color.primary}` }}>
			<div className={styles.header}>

				<div className={styles.leftColumn}>
					<div className={styles.circledNumber}>
						<div className={styles.blurredCircle} style={{ backgroundColor: cardData.color.primary }} />
						<p className={styles.headerNumber} style={{ color: cardData.color.text }}>{cardData.header.value}</p>
					</div>
				</div>

				<div className={styles.rightColumn}>
					<p className={styles.headerTitle}>{cardData.content.description}</p>
				</div>

			</div>
		</div>

	);

	//
}
