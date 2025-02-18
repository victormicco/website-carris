'use client';

/* * */

import { Select, TextInput } from '@mantine/core';
import { IconAdjustments, IconFilter, IconSearch } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';
import { useEffect } from 'react';

import styles from './styles.module.css';

/* * */

export function Survey2024ResultsToolbar({ handleSearch }) {
	//

	//
	// A. Setup variables
	const [avaliationValue, setAvalitaionValue] = useQueryState('avaliation');
	const [category, setCategory] = useQueryState('category');
	const [search, setSearch] = useQueryState('search');
	const t = useTranslations('survey-2024.Survey2024ResultsToolbar');
	const filterValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
	const filterCategories = [
		{ label: 'Paragens', value: 'info_stops' },
		{ label: 'Rede', value: 'info_rede' },
		{ label: 'Autocarros', value: 'info_bus' },
		{ label: 'Suporte', value: 'info_support' },
	];
	//

	//
	// B. Handle Action

	useEffect(() => {
		handleSearch(search, category, avaliationValue);
	}, [search, category, avaliationValue]);

	//
	// C. Render components

	return (

		<div className={styles.resultsToolbar}>
			<TextInput leftSection={<IconSearch size={20} />} onChange={e => setSearch(e.target.value)} placeholder={t('searchInput')} type="search" value={search || ''} w="100%" />
			<Select data={filterCategories} leftSection={<IconFilter size={20} />} onChange={_value => setCategory(_value)} placeholder={t('by_category')} value={category} w="100%" clearable />
			<Select data={filterValues} leftSection={<IconAdjustments size={20} />} onChange={_value => setAvalitaionValue(_value)} placeholder={t('by_avaliation')} value={avaliationValue} w="100%" clearable />
		</div>

	);

	//
}
