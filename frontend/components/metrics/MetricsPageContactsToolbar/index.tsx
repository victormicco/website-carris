/* * */

import Button from '@/components/common/Button';
import { Select } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';
/* * */

interface Props {
	filter_type: (filter) => void
	// filter_value: string
}

export function MetricsPageContactsToolbar({ filter_type, filter_value }: Props) {
	//

	//
	// A. Setup variables
	// const t = useTranslations('metrics.MetricsPageContactsSelector');

	// B. Fetch Data

	//
	// C. Render Components
	return (
		<div className={styles.toolbarContainer}>
			<Select
				data={['React', 'Angular', 'Vue', 'Svelte']}
				label="Linhas"
				onChange={() => filter_type('line')}
				onClear={() => filter_type('global')}
				placeholder="Linhas"
				clearable
				searchable
			/>
			<Select
				data={['React', 'Angular', 'Vue', 'Svelte']}
				label="Municípios"
				onChange={() => filter_type('municipality')}
				onClear={() => filter_type('global')}
				placeholder="Municípios"
				clearable
				searchable
			/>
			<Button
				label="Geral"
				onClick={() => filter_type('global')}

			/>
		</div>
	);

	//
}
