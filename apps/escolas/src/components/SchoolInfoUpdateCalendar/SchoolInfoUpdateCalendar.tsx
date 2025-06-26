'use client';
import { ActionIcon, Button, Group, Paper, SegmentedControl, Stack, Text, Title } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { UseFormReturnType } from '@mantine/form';

import '@mantine/dates/styles.css';
import { IconTrash } from '@tabler/icons-react';

import { FormType } from '../SchoolInfoUpdate/types';

export function SchoolInfoUpdateCalendar({ form }: { form: UseFormReturnType<FormType, (_: FormType) => FormType> }) {
	// A. Setup Variables
	const cycleFrequencyProps = form.getInputProps('calendar.cycleFrequency', { type: 'input' });
	const cycleFrequency: '' | 'semester' | 'trimester' = cycleFrequencyProps.value;

	const datesProps = form.getInputProps('calendar.dates');
	const vacationsProps = form.getInputProps('calendar.vacations');

	// B. Render

	return (
		<Paper p={16} radius="md" shadow="sm">
			<Title fw={700} order={3}>Calendário Escolar</Title>
			<Stack gap={10}>
				<Text size="s">Modo de funcionamento</Text>
				<SegmentedControl
					color="blue"
					size="md"
					w={300}
					data={[
						{ label: 'Semestral', value: 'semester' },
						{ label: 'Trimestral', value: 'trimester' },
					]}
					{...cycleFrequencyProps}
				/>
				{cycleFrequencyProps.error && <Text c="red" size="md">{cycleFrequencyProps.error}</Text>}
				{datesProps.error && <Text c="red" size="md">{datesProps.error}</Text>}
				{cycleFrequency === 'semester' && (
					<Stack gap={10}>
						<Text size="md">Periodo letivo do Primeiro Semestre</Text>
						<DatePickerInput
							maw={300}
							type="range"
							{...form.getInputProps('calendar.dates.0')}
						/>
						<Text size="md">Periodo letivo do Segundo Semestre</Text>
						<DatePickerInput
							maw={300}
							type="range"
							{...form.getInputProps('calendar.dates.1')}
						/>
					</Stack>
				)}
				{cycleFrequency === 'trimester' && (
					<Stack gap={10}>
						<Text size="md">Periodo letivo do Primeiro Período</Text>
						<DatePickerInput
							maw={300}
							type="range"
							{...form.getInputProps('calendar.dates.0')}
						/>
						<Text size="md">Periodo letivo do Segundo Período</Text>
						<DatePickerInput
							maw={300}
							type="range"
							{...form.getInputProps('calendar.dates.1')}
						/>
						<Text size="md">Periodo letivo do Terceiro Período</Text>
						<DatePickerInput
							maw={300}
							type="range"
							{...form.getInputProps('calendar.dates.2')}
						/>
					</Stack>
				)}
				<Stack gap={8}>
					<Text fw={500} size="md">Lista de Interrupções dentro do período escolar</Text>
					<Text c="dimmed" fw={400} size="s">Não indique férias entre semestres/trimestres, apenas interrupções dentro desses períodos.</Text>
					{vacationsProps.error && <Text c="red" size="xs">{vacationsProps.error}</Text>}
					{form.getValues().calendar.vacations.map((item, index) => (
						<Group key={index}>
							<DatePickerInput
								allowSingleDateInRange={true}
								style={{ flex: 1 }}
								type="range"
								{...form.getInputProps(`calendar.vacations.${index}`)}
							/>

							<ActionIcon color="red" onClick={() => form.removeListItem('calendar.vacations', index)} size="lg">
								<IconTrash size="1rem" />
							</ActionIcon>
						</Group>
					))}
					<Group justify="flex-end">

						<Button
							onClick={() => form.insertListItem('calendar.vacations', [null, null])}
						>
							Adicionar Interrupção
						</Button>
					</Group>
				</Stack>
			</Stack>
		</Paper>
	);
}
