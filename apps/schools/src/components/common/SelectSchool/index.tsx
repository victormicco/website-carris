'use client';

/* * */

import useSearch from '@/hooks/useSearch';
import { Combobox, Highlight, Text, TextInput, useCombobox } from '@mantine/core';
import { useState } from 'react';

/* * */

export function SelectSchool({ allSchoolsData, onSelectSchool }) {
	//

	//
	// A. Setup variables

	const comboboxStore = useCombobox();
	const [searchQuery, setSearchQuery] = useState('');

	const allSchoolsDataFilteredBySearchQuery = useSearch(searchQuery, allSchoolsData, { keys: ['id', 'name', 'locality'] });

	//
	// B. Handle actions

	const handleSearchQueryChange = ({ currentTarget }) => {
		setSearchQuery(currentTarget.value);
		comboboxStore.updateSelectedOptionIndex();
		comboboxStore.openDropdown();
	};

	//
	// C. Render components

	return (
		<Combobox onOptionSubmit={onSelectSchool} store={comboboxStore}>

			<Combobox.Target>
				<TextInput
					aria-label="Selecione uma instituição"
					onBlur={() => comboboxStore.closeDropdown()}
					onChange={handleSearchQueryChange}
					onClick={() => comboboxStore.openDropdown()}
					onFocus={() => comboboxStore.openDropdown()}
					placeholder="Procure pelo nome da instituição"
					rightSection={<Combobox.Chevron />}
					size="lg"
					value={searchQuery}
				/>
			</Combobox.Target>

			<Combobox.Dropdown>
				<Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
					{allSchoolsDataFilteredBySearchQuery.length === 0
						? <Combobox.Empty>Nenhuma instituição encontrada</Combobox.Empty>
						: allSchoolsDataFilteredBySearchQuery.map(item => (
							<Combobox.Option key={item.id} value={item.id}>
								<div>
									<Highlight fw={500} fz="sm" highlight={searchQuery}>
										{item.name}
									</Highlight>
									<Text fz="xs">{item.municipality_name}</Text>
								</div>
							</Combobox.Option>
						))}
				</Combobox.Options>
			</Combobox.Dropdown>

		</Combobox>
	);

	//
}
