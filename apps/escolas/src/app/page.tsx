'use client';

import Layout from '@/components/Layout/Layout';
import SelectMunicipalityAndSchool from '@/components/SelectMunicipalityAndSchool/SelectMunicipalityAndSchool';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
	//

	//
	// A. Setup variables

	const router = useRouter();
	const [selectedMunicipalityId, setSelectedMunicipalityId] = useState(null);
	const [selectedEducationLevel, setSelectedEducationLevel] = useState(null);
	const [selectedSchool, _setSelectedSchool] = useState();

	//
	// B. Handle actions

	const handleSelectSchool = (schoolId) => {
		if (schoolId) router.push(`/${schoolId}`);
	};

	//
	// C. Render components

	return (
		<Layout>
			<SelectMunicipalityAndSchool
				onSelectEducationLevel={setSelectedEducationLevel}
				onSelectMunicipalityId={setSelectedMunicipalityId}
				onSelectSchool={handleSelectSchool}
				selectedEducationLevel={selectedEducationLevel}
				selectedMunicipalityId={selectedMunicipalityId}
				selectedSchool={selectedSchool}
				title="Pesquise as linhas que servem a sua escola ou universidade."
			/>
		</Layout>
	);

	//
}
