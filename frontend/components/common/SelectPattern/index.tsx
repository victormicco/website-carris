'use client';

/* * */

import { useDebugContext } from '@/contexts/Debug.context';
import { Pattern } from '@carrismetropolitana/api-types/network';
import { ComboboxItemGroup, Flex, Group, Select, SelectProps, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

/* * */

export interface Props extends SelectProps {
	date_filter?: string
	patterns: Pattern[]
}

/* * */

export function SelectPattern({ date_filter, onChange, patterns, value, ...props }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('SelectPattern');
	const debugContext = useDebugContext();

	//
	// B. Transform data

	const validPatternsSelectOptions = useMemo(() => {
		if (!patterns) return [];

		const data: ComboboxItemGroup[] = [];

		// Filter patterns by date
		patterns.map((patternGroupData) => {
			const group = data.find(group => group.group === patternGroupData.long_name);

			const item = {
				disabled: date_filter ? !patternGroupData.valid_on.includes(date_filter) : false,
				label: patternGroupData.headsign,
				value: patternGroupData.version_id,
			};

			if (group) {
				group.items.push(item);
			}
			else {
				data.push({
					group: patternGroupData.long_name,
					items: [item],
				});
			}
		});

		return data;
	}, [patterns]);

	//
	// C. Render components

	const renderSelectOption: SelectProps['renderOption'] = ({ option }) => {
		const pattern = patterns.find(pattern => pattern.version_id === option.value);

		if (!pattern) return null;
		if (pattern.path.length === 0) return null;

		return (
			<Group key={option.value} gap={2}>
				<Flex direction="column">
					<Flex align="center" gap={5}>
						<Text fw="bold">{pattern.headsign}</Text>
						{debugContext.flags.is_debug_mode && <Text c="gray" size="xs">({pattern.id})</Text>}
					</Flex>
					<Text size="xs">{t('option_label', { locality: pattern.path[0].stop_id })}</Text>
				</Flex>
			</Group>
		);
	};

	const renderSelectRoot = (props) => {
		const pattern = patterns.find(pattern => pattern.version_id === value);

		if (!pattern) {
			return (
				<div {...props} key="no-pattern">
					<Text c="gray">Select a pattern</Text>
				</div>
			);
		}

		return (
			<div {...props}>
				<Flex align="center" gap={5}>
					<Text fw="bold">{pattern.headsign}</Text>
					{debugContext.flags.is_debug_mode && <Text c="gray" size="xs">{pattern.id}</Text>}
				</Flex>
				<Text size="xs">{pattern.long_name}</Text>
			</div>
		);
	};

	return (
		<Select
			allowDeselect={false}
			data={validPatternsSelectOptions}
			onChange={onChange}
			renderOption={renderSelectOption}
			renderRoot={renderSelectRoot || undefined}
			value={value}
			w="100%"
			{...props}
		/>
	);
}
