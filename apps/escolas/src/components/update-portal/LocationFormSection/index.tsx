'use client';

/* * */

import { useUpdateSchoolFormContext } from '@/form/form';
import { Paper, SegmentedControl, Text, TextInput, Title } from '@mantine/core';

/* * */

export function LocationFormSection() {
	//

	//
	// A. Setup variables

	const form = useUpdateSchoolFormContext();

	//
	// B. Render components

	return (
		<Paper p={16} radius="md" shadow="sm">

			<Title fw={700} order={3} style={{ marginLeft: '4px' }}>
				Localização
			</Title>
			<Text c="dimmed" size="sm" style={{ marginBottom: '10px', marginLeft: '4px' }}>
				A posição da escola no mapa corresponde com a posição da porta príncipal de entrada da escola?
			</Text>

			<SegmentedControl
				size="sm"
				style={{ flexShrink: 0, marginBottom: '38px' }}
				data={[
					{ label: 'Sim', value: 'yes' },
					{ label: 'Quase', value: 'almost' },
					{ label: 'Não', value: 'no' },
				]}
				{...form.getInputProps('location.is_correct')}
			/>

			<TextInput
				label="Código Postal"
				placeholder="1234-567"
				size="md"
				{...form.getInputProps('location.postal_code')}
			/>

		</Paper>
	);

	//
}
