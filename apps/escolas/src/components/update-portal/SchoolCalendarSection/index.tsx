'use client';

/* * */

import { useUpdateSchoolFormContext } from '@/form/form';
import { ActionIcon, Button, Group, Paper, SegmentedControl, Stack, Text, Title } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconTrash } from '@tabler/icons-react';

/* * */

export function SchoolCalendarSection() {
	//

	//
	// A. Setup variables

	const form = useUpdateSchoolFormContext();

	//
	// B. Handle actions

	const handleInsertInterruption = () => {
		const emptyInterruptionObject = { _key: crypto.randomUUID(), end_date: null, start_date: null };
		form.insertListItem('school_calendar.interruptions', emptyInterruptionObject);
	};

	const handleRemoveInterruption = (index: number) => {
		form.removeListItem('school_calendar.interruptions', index);
	};

	//
	// C. Render components

	return (
		<Paper p={16} radius="md" shadow="sm">

			<Title fw={700} order={3} style={{ marginLeft: '4px' }}>Calendário Escolar</Title>

			<Stack gap={10}>

				<Text size="md" style={{ marginLeft: '4px', marginTop: '10px' }}>Modo de funcionamento</Text>

				<SegmentedControl
					color="blue"
					size="sm"
					w={200}
					data={[
						{ label: 'Semestral', value: 'semester' },
						{ label: 'Trimestral', value: 'trimester' },
					]}
					{...form.getInputProps('school_calendar.calendar_type')}
				/>

				{form.getValues().school_calendar?.calendar_type === 'semester' && (
					<Stack gap={15}>
						<div>
							<Text size="md">Periodo letivo do Primeiro Semestre</Text>
							<DatePickerInput
								maw={300}
								{...form.getInputProps('school_calendar.semester_calendar.semester_1.start_date')}
							/>
							<DatePickerInput
								maw={300}
								{...form.getInputProps('school_calendar.semester_calendar.semester_1.end_date')}
							/>
						</div>
						<div>
							<Text size="md">Periodo letivo do Segundo Semestre</Text>
							<DatePickerInput
								maw={300}
								{...form.getInputProps('school_calendar.semester_calendar.semester_2.start_date')}
							/>
							<DatePickerInput
								maw={300}
								{...form.getInputProps('school_calendar.semester_calendar.semester_2.end_date')}
							/>
						</div>
					</Stack>
				)}

				{form.getValues().school_calendar?.calendar_type === 'trimester' && (
					<Stack gap={15}>
						<div>
							<Text size="md">Periodo letivo do Primeiro Período</Text>
							<DatePickerInput
								maw={300}
								{...form.getInputProps('school_calendar.trimester_calendar.trimester_1.start_date')}
							/>
							<DatePickerInput
								maw={300}
								{...form.getInputProps('school_calendar.trimester_calendar.trimester_1.end_date')}
							/>
						</div>
						<div>
							<Text size="md">Periodo letivo do Segundo Período</Text>
							<DatePickerInput
								maw={300}
								{...form.getInputProps('school_calendar.trimester_calendar.trimester_2.start_date')}
							/>
							<DatePickerInput
								maw={300}
								{...form.getInputProps('school_calendar.trimester_calendar.trimester_2.end_date')}
							/>
						</div>
						<div>
							<Text size="md">Periodo letivo do Terceiro Período</Text>
							<DatePickerInput
								maw={300}
								{...form.getInputProps('school_calendar.trimester_calendar.trimester_3.start_date')}
							/>
							<DatePickerInput
								maw={300}
								{...form.getInputProps('school_calendar.trimester_calendar.trimester_3.end_date')}
							/>
						</div>
					</Stack>
				)}

				<Stack gap={8}>
					<div style={{ marginBottom: '15px', marginLeft: '4px', marginTop: '15px' }}>
						<Text fw={500} size="md">Lista de Interrupções dentro do período escolar</Text>
						<Text c="dimmed" fw={400} size="sm">Não indique férias entre semestres/trimestres, apenas interrupções dentro desses períodos.</Text>
					</div>
					{form.getValues().school_calendar?.interruptions?.map((item, index) => (
						<Group key={item._key} align="flex-start" gap={10}>
							<DatePickerInput
								key={form.key(`school_calendar.interruptions.${index}.start_date`)}
								maw={300}
								{...form.getInputProps(`school_calendar.interruptions.${index}.start_date`)}
							/>
							<DatePickerInput
								key={form.key(`school_calendar.interruptions.${index}.end_date`)}
								maw={300}
								{...form.getInputProps(`school_calendar.interruptions.${index}.end_date`)}
							/>
							<ActionIcon color="red" onClick={() => handleRemoveInterruption(index)} size="lg" style={{ marginLeft: '-10px' }}>
								<IconTrash size="1.3rem" />
							</ActionIcon>
						</Group>
					))}
					<Group justify="flex-start">
						<Button color="blue" onClick={handleInsertInterruption} size="md" variant="light">
							Adicionar Interrupção
						</Button>
					</Group>
				</Stack>

			</Stack>
		</Paper>
	);

	//
}
