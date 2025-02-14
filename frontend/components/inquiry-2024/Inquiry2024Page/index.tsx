'use client';

/* * */

import { Inquiry2024Header } from '@/components/inquiry-2024/Inquiry2024Header';
import { Inquiry2024Intro } from '@/components/inquiry-2024/Inquiry2024Intro';
import { Inquiry2024LevelFour } from '@/components/inquiry-2024/Inquiry2024LevelFour';
import { Inquiry2024LevelOne } from '@/components/inquiry-2024/Inquiry2024LevelOne';
import { Inquiry2024LevelSix } from '@/components/inquiry-2024/Inquiry2024LevelSix';
import { Inquiry2024LevelThree } from '@/components/inquiry-2024/Inquiry2024LevelThree';
import { Inquiry2024LevelTwoA } from '@/components/inquiry-2024/Inquiry2024LevelTwoA';
import { Inquiry2024LevelTwoB } from '@/components/inquiry-2024/Inquiry2024LevelTwoB';
import { Inquiry2024LevelTwoC } from '@/components/inquiry-2024/Inquiry2024LevelTwoC';
import { useQueryState } from 'nuqs';

/* * */

export function Inquiry2024Page() {
	//

	//
	// A. Setup variables
	const [selectedAnchor, setAnchor] = useQueryState('anchor');
	//
	// B. Render components

	return (
		<>
			<Inquiry2024Intro />
			<Inquiry2024Header />
			<Inquiry2024LevelOne />
			<Inquiry2024LevelThree />
			<Inquiry2024LevelTwoA />
			<Inquiry2024LevelTwoB />
			<Inquiry2024LevelTwoC />
			<Inquiry2024LevelFour />
			<Inquiry2024LevelSix />
		</>
	);

	//
}
