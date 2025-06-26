'use client';

import { CloseButton, Select } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { useMemo } from 'react';
import useSWR from 'swr';

import styles from './SelectMunicipality.module.css';

export default function SelectMunicipality({ onSelectMunicipalityId, selectedMunicipalityId }) {
	//

	//
	// A. Fetch data

	const { data: allMunicipalitiesData } = useSWR('https://api.carrismetropolitana.pt/municipalities');

	//
	// B. Transform data

	const allMunicipalitiesDataAsSelectOptions = useMemo(() => {
		// Return empty array if data is not available
		if (!allMunicipalitiesData) return [];
		// Return formatted array for select
		const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
		const allMunicipalitiesSorted = allMunicipalitiesData.sort((a, b) => collator.compare(a.name, b.name));
		return allMunicipalitiesSorted.map(item => ({ label: item.name, value: item.id }));
		//
	}, [allMunicipalitiesData, selectedMunicipalityId]);

	//
	// C. Handle actions

	const handleClearSelectedMunicipalityId = () => {
		onSelectMunicipalityId(null);
	};

	//
	// D. Render components

	return (
		<div className={styles.container}>
			<Select
				aria-label="Filtrar por Município"
				data={allMunicipalitiesDataAsSelectOptions}
				nothingFoundMessage="Município inexistente"
				onChange={onSelectMunicipalityId}
				placeholder="Escolha ou digite um Municípios"
				rightSection={selectedMunicipalityId ? <CloseButton onClick={handleClearSelectedMunicipalityId} /> : <IconChevronDown size={18} />}
				value={selectedMunicipalityId}
				searchable
			/>
		</div>
	);

	//
}
