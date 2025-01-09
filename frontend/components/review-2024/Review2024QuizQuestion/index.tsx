'use client';

/* * */

import type { Review2024QuizAnswerSchema, Review2024QuizSchema } from '@/components/review-2024/_data/quiz';

import { LottiePlayer } from '@/components/common/LottiePlayer';

import styles from './styles.module.css';

/* * */

interface Props {
	onAnswer: (answerData: Review2024QuizAnswerSchema) => void
	quizData: Review2024QuizSchema
}

interface CustomCSSProperties extends React.CSSProperties {
	'--color-border'?: string
	'--color-primary': string
	'--color-text': string
}

/* * */

export function Review2024QuizQuestion({ onAnswer, quizData }: Props) {
	//

	//
	// A. Transform data

	const stylesData: CustomCSSProperties = {
		'--color-border': quizData.colors.border || quizData.colors.primary,
		'--color-primary': quizData.colors.primary,
		'--color-text': quizData.colors.text,
	};

	//
	// C. Render components

	return (
		<div className={styles.container} style={stylesData}>

			<div className={styles.header}>
				<p className={styles.headerTitle}>Pergunta {quizData._order}</p>
			</div>

			<div className={styles.question}>

				{quizData.question.lottie_src && (
					<div className={styles.questionLottie}>
						<LottiePlayer
							path={quizData.question.lottie_src}
							loop
							play
						/>
					</div>
				)}

				<p className={styles.questionTitle}>{quizData.question.title}</p>

				{quizData.question.description && <p className={styles.questionDescription}>{quizData.question.description}</p>}

				<div className={styles.answersWrapper}>
					{quizData.answers.map(answerData => (
						<div
							key={answerData._id}
							className={styles.answerOption}
							onClick={() => onAnswer(answerData)}
						>
							{answerData.label}
						</div>
					))}
				</div>

			</div>

		</div>
	);

	//
}
