'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { allQuizData, type Review2024QuizAnswerSchema } from '@/components/review-2024/_data/quiz';
import { Review2024QuizQuestion } from '@/components/review-2024/Review2024QuizQuestion';
import { useState } from 'react';

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

	const [answerStatus, setAnswerStatus] = useState<'correct' | 'wrong' | null>(null);

	//
	// C. Handle actions

	const handleClickAnswerOption = (answerData: Review2024QuizAnswerSchema) => {
		if (answerData.is_correct) {
			setAnswerStatus('correct');
			setPoints(points + 542);
		}
		else {
			setAnswerStatus('wrong');
		}
	};

	const handleAdvanceQuestion = () => {
		setAnswerStatus(null);
		setProgress(progress + 1);
	};

	//
	// B. Render components

	return (
		<Surface forceOverflow>
			<Section withPadding="desktop" withGap>
				<Grid columns="abc">
					<div />
					{answerStatus === null && (
						<Review2024QuizQuestion
							onAnswer={handleClickAnswerOption}
							quizData={allQuizData[progress]}
						/>
					)}
					{answerStatus === 'correct' && (
						<div onClick={handleAdvanceQuestion}>correct</div>
					)}
					{answerStatus === 'wrong' && (
						<div onClick={handleAdvanceQuestion}>wrong</div>
					)}
					<div />
				</Grid>
			</Section>
		</Surface>
	);

	//
}
