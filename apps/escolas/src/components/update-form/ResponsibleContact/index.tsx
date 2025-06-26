'use client';

import { Paper, Stack, Text, TextInput, Title } from '@mantine/core';

export function SchoolResponsibleContact({ form }) {
	return (
		<Paper p={16} radius="md" shadow="sm">
			<Title fw={700} order={3} style={{ marginBottom: '30px' }}>Dados de contacto do responsável </Title>
			<Text c="dimmed" size="sm" style={{ marginBottom: '10px', marginLeft: '4px' }}>A pessoa responsável em departamento de comunicação pelo preenchimento do formulário</Text>
			<Stack gap={15}>

				<TextInput
					label="Nome do responsável pela submissão do formulário"
					placeholder="Ana silva"
					size="md"
					{...form.getInputProps('fillerIdentifier')}
				/>

				<TextInput
					description="Email(s) separados por vírgulas"
					label="Email"
					placeholder="email@exemplo.pt"
					size="md"
					{...form.getInputProps('email')}
				/>

				<TextInput
					label="Telefone"
					placeholder="910001337"
					size="md"

					{...form.getInputProps('phone')}
				/>

			</Stack>
		</Paper>
	);
}
