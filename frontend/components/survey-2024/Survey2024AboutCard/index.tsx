'use client';

/* * */

import { LottiePlayer } from '@/components/common/LottiePlayer';
import { Survery2024AboutCardSchema } from '@/components/survey-2024/_data/About/cards';

import styles from './styles.module.css';

/* * */

interface Props {
	cardData: Survery2024AboutCardSchema

}
/* * */

export function Survey2024AboutCard({ cardData }: Props) {
	//

	//
	// A. Render components

	return (
		<div className={styles.container} id={cardData._id}>
			<div className={styles.header}>
				{cardData.content.lottie_src && (
					<LottiePlayer
						className={styles.lottie}
						path={cardData.content.lottie_src}
						loop
						play
					/>
				)}
				<p className={styles.headerNumber}>{cardData.header.value}</p>
				<p className={styles.headerTitle}>{cardData.content.legend}</p>
			</div>
		</div>
	);

	//
}
