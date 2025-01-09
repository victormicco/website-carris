'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';

import { Review2024QuizPoints } from '../Review2024QuizPoints';

// import styles from './styles.module.css';

/* * */

interface Props {
	points: number
	progress: number
}

/* * */

export function Review2024QuizWrapper({ points, progress }: Props) {
	//

	//
	// A. Setup variables

	//
	// B. Render components

	return (
		<>

			<Review2024QuizPoints points={points} progress={progress} />

			<Surface forceOverflow>
				<Section withPadding="desktop" withGap>
					quiz questions
				</Section>
			</Surface>

		</>
	);

	//
}
