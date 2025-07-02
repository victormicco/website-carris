'use client';

/* * */

import { useUpdateSchoolFormContext } from '@/form/form';
import { UpdateSchoolFormType } from '@/form/schema';
import { ActionIcon, Button, Paper, SegmentedControl, Stack, Text, Title } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

/* * */

export function SchoolCalendarSection() {
	//

	//
	// A. Setup variables

	const form = useUpdateSchoolFormContext();

	const [selectedCalendarType, setSelectedCalendarType] = useState<UpdateSchoolFormType['school_calendar']['calendar_type']>(null);

	//
	// B. Handle actions

	form.watch('school_calendar.calendar_type', (changeEvent) => {
		setSelectedCalendarType(changeEvent.value);
	});

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
					size="lg"
					data={[
						{ label: 'Semestral', value: 'semester' },
						{ label: 'Trimestral', value: 'trimester' },
					]}
					{...form.getInputProps('school_calendar.calendar_type')}
				/>

				{form.errors['school_calendar.calendar_type'] && (
					<Text c="red" size="md" style={{ marginBottom: 10 }}>
						Por favor, selecione um tipo de calendário.
					</Text>
				)}

				{selectedCalendarType === 'semester' && (
					<div className={styles.calendarDatesWrapper}>
						<div className={styles.calendarDateRow}>
							<Text>Periodo letivo do 1º Semestre</Text>
							<DatePickerInput
								{...form.getInputProps('school_calendar.block_1.start_date')}
								label="Início do 1º Semestre"
								placeholder="Início do 1º Semestre"
							/>
							<DatePickerInput
								{...form.getInputProps('school_calendar.block_1.end_date')}
								label="Fim do 1º Semestre"
								placeholder="Fim do 1º Semestre"
							/>
						</div>
						<div className={styles.calendarDateRow}>
							<Text>Periodo letivo do 2º Semestre</Text>
							<DatePickerInput
								{...form.getInputProps('school_calendar.block_2.start_date')}
								label="Início do 2º Semestre"
								placeholder="Início do 2º Semestre"
							/>
							<DatePickerInput
								{...form.getInputProps('school_calendar.block_2.end_date')}
								label="Fim do 2º Semestre"
								placeholder="Fim do 2º Semestre"
							/>
						</div>
					</div>
				)}

				{selectedCalendarType === 'trimester' && (
					<div className={styles.calendarDatesWrapper}>
						<div className={styles.calendarDateRow}>
							<Text size="md">Periodo letivo do 1º Período</Text>
							<DatePickerInput
								{...form.getInputProps('school_calendar.block_1.start_date')}
								label="Início do 1º Período"
								placeholder="Início do 1º Período"
							/>
							<DatePickerInput
								{...form.getInputProps('school_calendar.block_1.end_date')}
								label="Fim do 1º Período"
								placeholder="Fim do 1º Período"
							/>
						</div>
						<div className={styles.calendarDateRow}>
							<Text size="md">Periodo letivo do 2º Período</Text>
							<DatePickerInput
								{...form.getInputProps('school_calendar.block_2.start_date')}
								label="Início do 2º Período"
								placeholder="Início do 2º Período"
							/>
							<DatePickerInput
								{...form.getInputProps('school_calendar.block_2.end_date')}
								label="Fim do 2º Período"
								placeholder="Fim do 2º Período"
							/>
						</div>
						<div className={styles.calendarDateRow}>
							<Text size="md">Periodo letivo do 3º Período</Text>
							<DatePickerInput
								{...form.getInputProps('school_calendar.block_3.start_date')}
								label="Início do 3º Período"
								placeholder="Início do 3º Período"
							/>
							<DatePickerInput
								{...form.getInputProps('school_calendar.block_3.end_date')}
								label="Fim do 3º Período"
								placeholder="Fim do 3º Período"
							/>
						</div>
					</div>
				)}

				<div style={{ marginBottom: '15px', marginLeft: '4px', marginTop: '15px' }}>
					<Text fw={500} size="md">Lista de Interrupções dentro do período escolar</Text>
					<Text c="dimmed" fw={400} size="sm">Não indique férias entre semestres/trimestres, apenas interrupções dentro desses períodos.</Text>
				</div>

				{form.getValues().school_calendar?.interruptions?.map((item, index) => (
					<div key={item._key} className={styles.interruptionRow}>
						<DatePickerInput
							key={form.key(`school_calendar.interruptions.${index}.start_date`)}
							{...form.getInputProps(`school_calendar.interruptions.${index}.start_date`)}
							label="Início da Interrupção"
							placeholder="Início da Interrupção"
						/>
						<DatePickerInput
							key={form.key(`school_calendar.interruptions.${index}.end_date`)}
							{...form.getInputProps(`school_calendar.interruptions.${index}.end_date`)}
							label="Fim da Interrupção"
							placeholder="Fim da Interrupção"
						/>
						<ActionIcon color="red" onClick={() => handleRemoveInterruption(index)} size="lg" variant="subtle">
							<IconTrash size={20} />
						</ActionIcon>
					</div>
				))}

				<div>
					<Button color="blue" onClick={handleInsertInterruption} size="md" variant="light">
						Adicionar Interrupção
					</Button>
				</div>

			</Stack>
		</Paper>
	);

	//
}
