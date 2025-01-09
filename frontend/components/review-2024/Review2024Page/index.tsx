'use client';

/* * */

import { Review2024Intro } from '@/components/review-2024/Review2024Intro';
import { Review2024LevelFive } from '@/components/review-2024/Review2024LevelFive';
import { Review2024LevelFour } from '@/components/review-2024/Review2024LevelFour';
import { Review2024LevelOne } from '@/components/review-2024/Review2024LevelOne';
import { Review2024LevelThree } from '@/components/review-2024/Review2024LevelThree';
import { Review2024LevelTwo } from '@/components/review-2024/Review2024LevelTwo';
import { Review2024QuizPoints } from '@/components/review-2024/Review2024QuizPoints';
import { Review2024QuizWrapper } from '@/components/review-2024/Review2024QuizWrapper';
import { Review2024TabSelector } from '@/components/review-2024/Review2024TabSelector';
// import { Text } from '@mantine/core';
// import { modals } from '@mantine/modals';
// import { useTranslations } from 'next-intl';
import { useState } from 'react';

/* * */

export function Review2024Page() {
	//

	//
	// A. Setup variables

	// const t = useTranslations('review-2024.Review2024Page');

	const [selectedTab, setSelectedTab] = useState('quiz');

	const [quizPoints, setQuizPoints] = useState(1);
	const [quizProgress, setQuizProgress] = useState(0);

	//
	// B. Handle actions

	const handleSelectTab = (tab: string) => {
		// if (tab !== 'quiz' && (quizPoints > 0 || quizProgress > 0)) {
		// 	modals.openConfirmModal({
		// 		children: (
		// 			<Text>{t('modal.message')}</Text>
		// 		),
		// 		confirmProps: {
		// 			variant: 'secondary',
		// 		},
		// 		labels: {
		// 			cancel: t('modal.cancel'),
		// 			confirm: t('modal.confirm'),
		// 		},
		// 		onConfirm: () => {
		// 			setQuizPoints(0);
		// 			setQuizProgress(0);
		// 			setSelectedTab(tab);
		// 			return;
		// 		},
		// 		title: t('modal.title'),
		// 	});
		// }
		// else {
		setSelectedTab(tab);
		// }
	};

	//
	// C. Render components

	return (
		<>
			<Review2024Intro />
			<Review2024TabSelector onSelectTab={handleSelectTab} selectedTab={selectedTab} />
			{selectedTab === 'overview' && (
				<>
					<Review2024LevelOne />
					<Review2024LevelTwo />
					<Review2024LevelThree />
					<Review2024LevelFour />
					<Review2024LevelFive />
				</>
			)}
			{selectedTab === 'quiz' && (
				<>
					<Review2024QuizPoints points={quizPoints} progress={quizProgress} />
					<Review2024QuizWrapper points={quizPoints} progress={quizProgress} setPoints={setQuizPoints} setProgress={setQuizProgress} />
				</>
			)}
		</>
	);

	//
}
