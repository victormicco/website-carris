'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { RangeSlider, Select, TextInput } from '@mantine/core';
import {
	IconFilter,
	IconSearch,
	IconX,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';
import { useEffect } from 'react';

import styles from './styles.module.css';

/* * */

export function SurveyResultsToolbar({ handleSearch }) {
	//

	//
	// A. Setup variables
	const [avaliationValue, setAvalitaionValue] = useQueryState('avaliation');
	const [category, setCategory] = useQueryState('category');
	const [search, setSearch] = useQueryState('search');
	const t = useTranslations('survey.SurveyResultsToolbar');
	const filterCategories = [
		{ label: 'Paragens', value: 'info_stops' },
		{ label: 'Rede', value: 'info_rede' },
		{ label: 'Autocarros', value: 'info_bus' },
		{ label: 'Suporte', value: 'info_support' },
	];
	const marks = [
		{ label: '0', value: 0 },
		{ label: '1', value: 1 },
		{ label: '2', value: 2 },
		{ label: '3', value: 3 },
		{ label: '4', value: 4 },
		{ label: '5', value: 5 },
		{ label: '6', value: 6 },
		{ label: '7', value: 7 },
		{ label: '8', value: 8 },
		{ label: '9', value: 9 },
		{ label: '10', value: 10 },
	];

	//

	//
	// B. Handle Action

	const handleAvaliationValue = (value: [number, number]) => {
		setAvalitaionValue(JSON.stringify(value));
	};

	useEffect(() => {
		handleSearch(search, category, avaliationValue);
	}, [search, category, avaliationValue]);

	//
	// C. Render components

	return (
		<Section withPadding>
			<Grid columns="abc" withGap>
				<TextInput
					leftSection={<IconSearch size={20} />}
					onChange={e => setSearch(e.target.value)}
					placeholder={t('searchInput')}
					type="search"
					value={search || ''}
					w="100%"
					rightSection={
						search && (
							<IconX
								cursor="pointer"
								onClick={() => setSearch(null)}
								size={20}
							/>
						)
					}
				/>
				<Select
					data={filterCategories}
					leftSection={<IconFilter size={20} />}
					onChange={_value => setCategory(_value)}
					onClear={() => setCategory(null)}
					placeholder={t('by_category')}
					value={category}
					w="100%"
					clearable
				/>
				<div>
					<p>{t('by_avaliation')}</p>

					<RangeSlider
						color="#ffdd01"
						defaultValue={[0, 10]}
						marks={marks}
						max={10}
						min={0}
						minRange={0.1}
						onChange={_value => handleAvaliationValue(_value)}
						step={0.1}
						value={avaliationValue ? JSON.parse(avaliationValue) : [0, 10]}
						w="100%"
						classNames={{
							mark: styles.custom_slider_mark,
							thumb: styles.custom_slider_thumb,
						}}
					/>
				</div>
			</Grid>
		</Section>
	);

	//
}
