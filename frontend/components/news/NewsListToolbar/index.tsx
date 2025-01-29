'use client';

/* * */

import { FoundItemsCounter } from '@/components/common/FoundItemsCounter';
import { Section } from '@/components/layout/Section';
import { useNewsListContext } from '@/contexts/NewsList.context';
import { TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconArrowLoopRight, IconCalendarEvent } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import styles from './styles.module.css';

/* * */

export function NewsListToolbar() {
	// A. Setup variables
	const newsListContext = useNewsListContext();
	const t = useTranslations('news.NewsListToolbar');
	const typingTimeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null);
	const [textInput, setTextInput] = useState<null | string>(null);
	const [dateInput, setDateInput] = useState<Date | null>(null);
	//
	// B . Handle Actions

	const handleTextInputChange = ({ currentTarget }) => {
		setTextInput(currentTarget.value);
		if (!newsListContext.flags.is_loading && newsListContext.data.raw) {
			try {
				if (typingTimeoutRef.current) {
					clearTimeout(typingTimeoutRef.current);
				}
				typingTimeoutRef.current = setTimeout(() => {
					newsListContext.actions.updateFilterByTitle(currentTarget.value);
					console.log('News filtered with success ✅');
				}, 500);
			}
			catch (error) {
				console.error('Filtering failed ❌: ', error);
			}
		}
	};

	const handleDateInputChange = (value: Date | null) => {
		setDateInput(value);
		newsListContext.actions.updateFilterByDate(value || new Date());
	};

	// C. Cleanup;
	useEffect(() => {
		return () => {
			if (typingTimeoutRef.current) {
				clearTimeout(typingTimeoutRef.current);
			}
		};
	}, []);

	// D. Render Components

	return (
		<>
			<Section heading={t('heading')} withBottomDivider withPadding>
				<div className="row-container" style={{ display: 'flex', gap: '1rem', width: '100%' }}>
					<TextInput leftSection={<IconArrowLoopRight size={20} />} onChange={handleTextInputChange} placeholder={t('SearchInput.placeholder')} type="search" value={textInput || ''} w="100%" />
					<DatePickerInput
						classNames={{ input: styles.datePickerInput, placeholder: styles.datePickerPlaceholder, section: styles.datePickerPlaceholder }}
						dropdownType="modal"
						leftSection={<IconCalendarEvent />}
						onChange={handleDateInputChange}
						placeholder={t('DateInput.placeholder')}
						size="lg"
						value={dateInput}
						valueFormat="DD MMM YYYY"
						variant="unstyled"
					/>
				</div>
				<FoundItemsCounter text={t('found_items_counter', { count: newsListContext.data.filtered.length })} />
			</Section>

		</>
	);
	//
}
