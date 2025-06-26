'use client';

import { Paper, SegmentedControl, Text, TextInput, Title } from '@mantine/core';

export function SchoolLocation({ form }) {
	return (
		<Paper p={16} radius="md" shadow="sm">
			<Title fw={700} order={3} style={{ marginLeft: '4px' }}>Localização</Title>
			<Text c="dimmed" size="sm" style={{ marginBottom: '10px', marginLeft: '4px' }}>A posição da escola no mapa corresponde com a posição da porta príncipal de entrada da escola?</Text>
			{form.getInputProps('correctLocation').error && <Text c="red" size="md">{form.getInputProps('correctLocation').error}</Text>}
			<SegmentedControl
				size="sm"
				style={{ flexShrink: 0, marginBottom: '38px' }}
				data={[
					{ label: 'Sim', value: 'sim' },
					{ label: 'Quase', value: 'quase' },
					{ label: 'Não', value: 'nao' },
				]}

				{...form.getInputProps('correctLocation', { type: 'input' })}
			/>
			<TextInput
				label="Código Postal"
				placeholder="1234-567"
				size="md"
				{...form.getInputProps('postal_code')}
			/>
		</Paper>
	);
}
