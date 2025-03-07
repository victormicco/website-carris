/* * */

import Button from '@/components/common/Button';
import { Municipality } from '@carrismetropolitana/api-types/locations';
import { Line } from '@carrismetropolitana/api-types/network';
import { Select } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import styles from './styles.module.css';
/* * */

interface Props {
	allLines: Line[]
	filter_type: (value) => void
	filter_value: (value) => void
}

export function MetricsPageContactsToolbar({ allLines, filter_type, filter_value }: Props) {
	//

	//
	// A. Setup variables
	// const t = useTranslations('metrics.MetricsPageContactsSelector');
	const [line, setLine] = useState<string>('');
	const [municipality, setMunicipality] = useState<string>('');

	const AML = [
		{ label: 'Alcochete', value: '1520' },
		{ label: 'Almada', value: '1503' },
		{ label: 'Amadora', value: '1115' },
		{ label: 'Barreiro', value: '1504' },
		{ label: 'Cascais', value: '1105' },
		{ label: 'Lisboa', value: '1106' },
		{ label: 'Loures', value: '1107' },
		{ label: 'Mafra', value: '1109' },
		{ label: 'Moita', value: '1506' },
		{ label: 'Montijo', value: '1507' },
		{ label: 'Odivelas', value: '1116' },
		{ label: 'Oeiras', value: '1110' },
		{ label: 'Palmela', value: '1508' },
		{ label: 'Seixal', value: '1510' },
		{ label: 'Setúbal', value: '1512' },
		{ label: 'Sintra', value: '1111' },
		{ label: 'Vila Franca de Xira', value: '1114' },
	];

	// B. Handle Actions
	const handleLineChange = (value) => {
		if (municipality) {
			setMunicipality('');
		}

		filter_type('line');
		filter_value(value);
		setLine(value);
	};

	const handleMunicipalityChange = (value) => {
		if (line) {
			setLine('');
		}

		filter_type('municipality');
		filter_value(value);
		setMunicipality(value);
	};

	const handleGlobalClick = () => {
		if (municipality || line) {
			setLine('');
			setMunicipality('');
		}
		filter_value('-');
		filter_type('global');
	};
	//
	// C. Render Components
	return (
		<div className={styles.toolbarContainer}>
			<Select
				data={allLines.map(item => ({ label: `${item.id} - ${item.long_name}`, value: item.id }))}
				label="Linhas"
				onChange={_value => handleLineChange(_value)}
				onClear={() => handleLineChange}
				placeholder="Linhas"
				value={line}
				clearable
				searchable
			/>
			<Select
				data={AML.map(item => ({ label: item.label, value: item.value }))}
				label="Municípios"
				onChange={_value => handleMunicipalityChange(_value)}
				onClear={() => handleMunicipalityChange}
				placeholder="Municípios"
				value={municipality}
				clearable
				searchable
			/>
			<Button
				label="Geral"
				onClick={handleGlobalClick}
			/>
		</div>
	);

	//
}
