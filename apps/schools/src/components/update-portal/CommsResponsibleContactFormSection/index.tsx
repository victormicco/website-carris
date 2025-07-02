'use client';

/* * */

import { useUpdateSchoolFormContext } from '@/form/form';
import { Paper, Stack, Text, TextInput, Title } from '@mantine/core';

/* * */

export function CommsResponsibleContactFormSection() {
	//

	//
	// A. Setup variables

	const form = useUpdateSchoolFormContext();

	//
	// B. Render components

	return (
		<Paper p={16} radius="md" shadow="sm">
			<Title fw={700} order={3} style={{ marginLeft: '4px' }}>Dados de contacto do responsável </Title>
			<Text c="dimmed" size="sm" style={{ marginBottom: '10px', marginLeft: '4px' }}>A pessoa responsável no departamento de comunicação pelo preenchimento do formulário</Text>
			<Stack gap={15}>

				<TextInput
					{...form.getInputProps('comms_contact.name')}
					label="Nome do responsável de comunicação"
					placeholder="Ana Silva"
					size="md"
				/>

				<TextInput
					{...form.getInputProps('comms_contact.email')}
					description="Email(s) separados por vírgulas"
					label="Email"
					placeholder="email@exemplo.pt"
					size="md"
				/>

				<TextInput
					{...form.getInputProps('comms_contact.phone')}
					label="Telefone"
					placeholder="910001337"
					size="md"
				/>

			</Stack>
		</Paper>
	);

	//
}
