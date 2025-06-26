'use client';

import { Paper, Stack, TextInput, Title } from '@mantine/core';

export function SchoolContactData({ form }) {
	return (
		<Paper p={16} radius="md" shadow="sm">
			<Title fw={700} order={3} style={{ marginBottom: '30px' }}>Dados de contacto</Title>
			<Stack gap={15}>
				<TextInput
					description="Email(s) separados por vírgulas"
					label="Email"
					placeholder="email@exemplo.pt"
					size="md"
					{...form.getInputProps('email')}
				/>
				<TextInput
					label="Website"
					placeholder="www.escola.pt"
					size="md"
					{...form.getInputProps('url')}
				/>
				<TextInput
					label="Telefone"
					placeholder="910001337"
					size="md"

					{...form.getInputProps('phone')}
				/>
				<TextInput
					label="Nome do responsável pela submissão do formulário"
					placeholder="João Silva"
					size="md"
					{...form.getInputProps('fillerIdentifier')}
				/>
				<TextInput
					label="Cargo do responsável pela submissão do formulário"
					placeholder="Diretor da Escola"
					size="md"
					{...form.getInputProps('fillerIdentifierPosition')}
				/>
			</Stack>
		</Paper>
	);
}
