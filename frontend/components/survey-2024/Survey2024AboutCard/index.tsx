'use client';

/* * */

import { Survery2024AboutCardSchema } from '@/components/survey-2024/_data/About/cards';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface Props {
	cardData: Survery2024AboutCardSchema

}
/* * */

export function Survey2024AboutCard({ cardData }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('review-2024.Review2024Card');

	//
	// D. Render components

	return (
		<div className={styles.container} id={cardData._id}>

			<div className={styles.header}>
				<p className={styles.headerTitle}>{cardData.header.value}</p>
				<p className={styles.headerNumber}>{cardData.content.legend}</p>
			</div>

			<div className={styles.content}>

				{/* {cardData.content.lottie_src && (
						<div className={styles.contentLottie}>
							{isOpen && (
								<LottiePlayer
									path={cardData.content.lottie_src}
									loop
									play
								/>
							)}
						</div>
					)} */}

			</div>
		</div>
	);

	//
}
