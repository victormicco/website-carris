'use client';

/* * */

import { SurveryResultsCardSchema } from '@/components/survey/_data/Results/cards';

import styles from './styles.module.css';
/* * */

interface Props {
	cardData: SurveryResultsCardSchema
}
/* * */

export function SurveyResultCard({ cardData }: Props) {
	//

	//
	// B. Render components

	return (

		<div className={styles.container} id={cardData._id?.toString() || ''} style={{ border: `1px solid ${cardData.color.primary}` }}>
			<div className={styles.header}>

				<div className={styles.leftColumn}>
					<div className={styles.circledNumber}>
						<div className={styles.blurredCircle} style={{ backgroundColor: cardData.color.primary, color: cardData.color.text }} />
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
