'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { allQuizData, type Review2024QuizAnswerSchema } from '@/components/review-2024/_data/quiz';
import { Review2024QuizFinalResult } from '@/components/review-2024/Review2024QuizFinalResult';
import { Review2024QuizPoints } from '@/components/review-2024/Review2024QuizPoints';
import { Review2024QuizQuestion } from '@/components/review-2024/Review2024QuizQuestion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import styles from './styles.module.css';

/* * */

interface Props {
	points: number
	progress: number
	setPoints: (value: number) => void
	setProgress: (value: number) => void
}

/* * */

export function Review2024QuizWrapper({ points, progress, setPoints, setProgress }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('review-2024.Review2024QuizWrapper');

	const [answerStatus, setAnswerStatus] = useState<'correct' | 'wrong' | null>(null);

	//
	// B. Handle actions

	const handleClickAnswerOption = (answerData: Review2024QuizAnswerSchema) => {
		if (answerStatus === null) {
			if (answerData.is_correct) {
				setAnswerStatus('correct');
				setPoints(points);
			}
			else {
				setAnswerStatus('wrong');
			}
		}
	};

	const handleAdvanceQuestion = () => {
		setAnswerStatus(null);
		setProgress(progress + 1);
	};

	//
	// C. Render components

	if (progress >= allQuizData.length) {
		return (
			<div className={styles.container}>
				<Review2024QuizFinalResult points={points} />
			</div>
		);
	}

	return (
		<Surface forceOverflow>
			<Grid columns="ab">

				<Section withPadding="desktop" withGap>
					<div className={styles.headingWrapper}>
						<h2 className={styles.heading}>{t('digital.heading')}</h2>
						<h5 className={styles.subheading}>{t('digital.subheading')}</h5>
					</div>
					<Review2024QuizPoints points={points} />
				</Section>

				<Section withPadding="desktop" withGap>
					<div className={styles.container}>
						<Review2024QuizQuestion
							answerStatus={answerStatus}
							onAnswer={handleClickAnswerOption}
							onClickNext={handleAdvanceQuestion}
							quizData={allQuizData[progress]}
						/>
					</div>
				</Section>

			</Grid>
		</Surface>
	);

	//
}
