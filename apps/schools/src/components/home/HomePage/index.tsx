'use client';

/* * */

import { SchoolFinder } from '@/components/common/SchoolFinder';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

/* * */

export function HomePage() {
	//

	//
	// A. Setup variables

	const router = useRouter();

	const [selectedMunicipalityId, setSelectedMunicipalityId] = useState(null);
	const [selectedEducationLevel, setSelectedEducationLevel] = useState(null);

	//
	// B. Handle actions

	const handleSelectSchool = (schoolId) => {
		if (!schoolId) return;
		router.push(`/${schoolId}`);
	};

	//
	// C. Render components

	return (
		<SchoolFinder
			onSelectEducationLevel={setSelectedEducationLevel}
			onSelectMunicipalityId={setSelectedMunicipalityId}
			onSelectSchool={handleSelectSchool}
			selectedEducationLevel={selectedEducationLevel}
			selectedMunicipalityId={selectedMunicipalityId}
			title="Pesquise as linhas que servem a sua escola ou universidade."
		/>
	);

	//
}
