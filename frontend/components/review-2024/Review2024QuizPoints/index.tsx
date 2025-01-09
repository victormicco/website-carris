'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { useTranslations } from 'next-intl';

import { allQuizData } from '../_data/quiz';
import styles from './styles.module.css';

/* * */

interface Props {
	points: number
	progress: number
}

/* * */

export function Review2024QuizPoints({ points, progress }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('review-2024.Review2024QuizPoints');

	//
	// B. Render components

	return (
		<Section withPadding="mobile">
			<Grid columns="ab" withGap>

				<div className={styles.points}>
					<p className={styles.value}>{t('points', { points: points })}</p>
					{/* <p className={styles.label}>{t('points.label')}</p> */}
				</div>

				<div className={styles.progress}>
					<p className={styles.value}>{t('progress', { answered: progress, total: allQuizData.length })}</p>
					{/* <p className={styles.label}>{t('progress.label')}</p> */}
				</div>

			</Grid>
		</Section>
	);

	//
}
