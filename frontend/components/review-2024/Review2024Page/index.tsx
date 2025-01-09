'use client';

/* * */

import { Review2024Intro } from '@/components/review-2024/Review2024Intro';
import { Review2024LevelFive } from '@/components/review-2024/Review2024LevelFive';
import { Review2024LevelFour } from '@/components/review-2024/Review2024LevelFour';
import { Review2024LevelOne } from '@/components/review-2024/Review2024LevelOne';
import { Review2024LevelThree } from '@/components/review-2024/Review2024LevelThree';
import { Review2024LevelTwo } from '@/components/review-2024/Review2024LevelTwo';
import { Review2024TabSelector } from '@/components/review-2024/Review2024TabSelector';
import { useState } from 'react';

/* * */

export function Review2024Page() {
	//

	//
	// A. Setup variables

	const [selectedTab, setSelectedTab] = useState('overview');

	//
	// B. Render components

	return (
		<>
			<Review2024Intro />
			<Review2024TabSelector onSelectTab={setSelectedTab} selectedTab={selectedTab} />
			<Review2024LevelOne />
			<Review2024LevelTwo />
			<Review2024LevelThree />
			<Review2024LevelFour />
			<Review2024LevelFive />
		</>
	);

	//
}
