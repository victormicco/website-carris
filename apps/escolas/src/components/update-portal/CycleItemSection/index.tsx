'use client';

/* * */

import { useUpdateSchoolFormContext } from '@/form/form';
import { Checkbox, Collapse, Flex, Paper, Stack } from '@mantine/core';
import { TimePicker } from '@mantine/dates';

/* * */

interface Props {
	fieldKey: string
	label: string
}

/* * */

export function CycleItemSection({ fieldKey, label }: Props) {
	//

	//
	// A. Setup Variables

	const form = useUpdateSchoolFormContext();

	const checked = form.getValues().school_cycles?.[fieldKey]?._is_enabled;

	//
	// B. Render Component

	return (
		<Paper bg={checked ? 'var(--mantine-color-blue-light)' : ''} shadow="none">
			<Stack p={8}>

				<Checkbox
					c={checked ? 'blue' : ''}
					fw={700}
					label={label}
					{...form.getInputProps(`school_cycles.${fieldKey}._is_enabled`, { type: 'checkbox' })}
				/>

				<Collapse in={checked}>
					<Stack gap={10}>
						<Flex gap={10} w="100%">
							<TimePicker
								label="Principal Hora de entrada de manhã"
								{...form.getInputProps(`school_cycles.${fieldKey}.morning_entry`)}
							/>
							<TimePicker
								label="Principal Hora de saída da manhã"
								{...form.getInputProps(`school_cycles.${fieldKey}.morning_exit`)}
							/>
						</Flex>
						<div>
							<TimePicker
								label="Principal Hora de entrada da tarde"
								{...form.getInputProps(`school_cycles.${fieldKey}.afternoon_entry`)}
							/>
						</div>
						<div>
							<TimePicker
								label="Principal Hora de saída da tarde"
								{...form.getInputProps(`school_cycles.${fieldKey}.afternoon_exit`)}
							/>
						</div>
					</Stack>
				</Collapse>

			</Stack>
		</Paper>
	);

	//
}
