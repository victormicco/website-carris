'use client';

/* * */

import { Accordion, Select, TextInput } from '@mantine/core';
import { IconAdjustments, IconFilter, IconSearch } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';

import styles from './styles.module.css';

/* * */

export function Survey2024ResultsToolbar({ data }) {
	//

	//
	// A. Setup variables
	const [avaliationValue, setAvalitaionValue] = useQueryState('');
	const [category, setCategory] = useQueryState('');
	const [search, setSearch] = useQueryState('');
	const t = useTranslations('survey-2024.Survey2024ResultsToolbar');
	const filterValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	//
	// B. Render components

	return (

		<div className={styles.resultsToolbar}>
			<TextInput leftSection={<IconSearch size={20} />} placeholder={t('searchInput')} type="search" w="100%" />
			<Select leftSection={<IconFilter size={20} />} placeholder={t('by_category')} w="100%" />
			<Select leftSection={<IconAdjustments size={20} />} placeholder={t('by_avaliation')} w="100%" />
		</div>

	);

	//
}
