'use client';

/* * */

import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { enabledLocaleCodes } from '@/i18n/config';
import { setUserLocale } from '@/i18n/locale';
import { SegmentedControl, Skeleton } from '@mantine/core';
import { useLocale, useTranslations } from 'next-intl';
import { startTransition } from 'react';

import styles from './styles.module.css';

/* * */

export function LocaleSwitcher() {
	//

	//
	// A. Setup variables

	const currentLocale = useLocale();

	const analyticsContext = useAnalyticsContext();

	const t = useTranslations('header.LocaleSwitcher');

	//
	// B. Transform data

	const availableLocalesFormatted = enabledLocaleCodes.map(locale => ({
		label: t(`${locale}.label`),
		value: locale,
	}));

	//
	// C. Handle actions

	const handleLocaleChange = (value: string) => {
		startTransition(async () => {
			try {
				await setUserLocale(value);
				analyticsContext.actions.capture((ampli, props) => ampli.localeChanged({ ...props, locale: value }));
			}
			catch (error) {
				console.error(error);
			}
		});
	};

	//
	// D. Render Components

	if (!currentLocale) {
		return <Skeleton height={57} width="100%" />;
	}

	return (
		<SegmentedControl
			classNames={{ innerLabel: styles.innerLabel }}
			data={availableLocalesFormatted}
			onChange={handleLocaleChange}
			size="xs"
			value={currentLocale}
			w="100%"
		/>
	);

	//
}
