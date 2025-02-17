'use client';

/* * */

import { Accordion, Select, TextInput } from '@mantine/core';
import { IconAdjustments, IconFilter, IconSearch } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function Survey2024ResultsToolbar() {
	//

	//
	// A. Setup variables

	const t = useTranslations('survey-2024.Survey2024ResultsToolbar');

	//
	// B. Render components

	return (

		<Accordion>
			<Accordion.Item value="filters">
				<Accordion.Control>
					<span className={styles.subheading}>{t('subheading')}</span>
				</Accordion.Control>
				<Accordion.Panel>
					<div className={styles.resultsToolbar}>
						<TextInput leftSection={<IconSearch size={20} />} placeholder={t('searchInput')} type="search" w="100%" />
						<Select leftSection={<IconFilter size={20} />} placeholder={t('by_category')} w="100%" />
						<Select leftSection={<IconAdjustments size={20} />} placeholder={t('by_avaliation')} w="100%" />
					</div>
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion>

	);

	//
}
