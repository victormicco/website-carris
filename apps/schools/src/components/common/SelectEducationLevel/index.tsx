'use client';

/* * */

import { Select } from '@mantine/core';

/* * */

interface Props {
	onSelectEducationLevel: (educationLevel: string) => void
	selectedEducationLevel: null | string
}

/* * */

export function SelectEducationLevel({ onSelectEducationLevel, selectedEducationLevel }: Props) {
	//

	//
	// A. Setup variables

	const allEducationLevels = [
		{ label: 'Pré-escolar', value: 'pre_school' },
		{ label: '1º Ciclo', value: 'basic_1' },
		{ label: '2º Ciclo', value: 'basic_2' },
		{ label: '3º Ciclo', value: 'basic_3' },
		{ label: 'Secundário', value: 'high_school' },
		{ label: 'Ensino Profissional', value: 'professional' },
		{ label: 'Ensino Especial', value: 'special' },
		{ label: 'Ensino Artístico', value: 'artistic' },
		{ label: 'Universidade', value: 'university' },
		{ label: 'Outros', value: 'other' },
	];

	//
	// B. Render components

	return (
		<Select
			aria-label="Filtrar por nível de escolaridade"
			data={allEducationLevels}
			onChange={onSelectEducationLevel}
			placeholder="Escolha um nível de educação"
			value={selectedEducationLevel}
			clearable
			searchable
		/>
	);

	//
}
