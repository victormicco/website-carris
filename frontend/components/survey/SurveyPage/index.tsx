'use client';

/* * */

import { SurveyGlobalSatisfactionIndex } from '@/components/survey/SurveyGlobalSatisfactionIndex';
import { SurveyHeader } from '@/components/survey/SurveyHeader';
import { SurveyIntro } from '@/components/survey/SurveyIntro';
import { SurveyLevelAbout } from '@/components/survey/SurveyLevelAbout';
import { SurveyLevelPasgrCharacter } from '@/components/survey/SurveyLevelPasgrCharacter';
import { SurveyLevelResults } from '@/components/survey/SurveyLevelResults';

/* * */

export function SurveyPage() {
	//

	//
	// A. Render components

	return (
		<>
			<SurveyIntro />
			<SurveyHeader />
			<SurveyLevelAbout />
			<SurveyLevelPasgrCharacter />
			<SurveyLevelResults />
			<SurveyGlobalSatisfactionIndex />
		</>
	);

	//
}
