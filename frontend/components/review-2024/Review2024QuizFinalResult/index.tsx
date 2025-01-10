'use client';

/* * */

import { LottiePlayer } from '@/components/common/LottiePlayer';
import { useTranslations } from 'next-intl';

import { allQuizData } from '../_data/quiz';
import styles from './styles.module.css';

/* * */

interface Props {
	points: number
}

/* * */

export function Review2024QuizFinalResult({ points }: Props) {
	//

	//
	// A. Transform data

	const t = useTranslations('review-2024.Review2024QuizFinalResult');

	//
	// B. Transform data

	const totalPoints = allQuizData.reduce((acc, quiz) => acc + quiz._points, 0);

	const pointTiers = [
		{ _id: 'terrible', value: totalPoints * 0.2 },
		{ _id: 'bad', value: totalPoints * 0.4 },
		{ _id: 'acceptable', value: totalPoints * 0.6 },
		{ _id: 'very_good', value: totalPoints * 0.8 },
		{ _id: 'incredible', value: totalPoints - 1 },
		{ _id: 'perfect', value: totalPoints },
	];

	const pointTier = pointTiers.find(tier => tier.value >= points) || pointTiers[0];

	//
	// C. Render components

	return (
		<div className={styles.container}>

			<div className={styles.animation}>
				<LottiePlayer path="/assets/review-2024/animations/digital/website_daily.json" loop play />
			</div>

			<p className={styles.title}>{t(`${pointTier._id}.title`)}</p>

			<p className={styles.subtitle}>{t(`${pointTier._id}.subtitle`, { points: points })}</p>

		</div>
	);

	//
}
