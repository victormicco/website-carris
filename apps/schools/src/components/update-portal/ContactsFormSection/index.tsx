'use client';

/* * */

import { useUpdateSchoolFormContext } from '@/form/form';
import { Paper, Stack, TextInput, Title } from '@mantine/core';

/* * */

export function ContactsFormSection() {
	//

	//
	// A. Setup variables

	const form = useUpdateSchoolFormContext();

	//
	// B. Render components

	return (
		<Paper p={16} radius="md" shadow="sm">
			<Title fw={700} order={3} style={{ marginBottom: '30px' }}>Dados de contacto</Title>
			<Stack gap={15}>
				<TextInput
					description="Email(s) separados por vírgulas"
					label="Email"
					placeholder="email@exemplo.pt"
					size="md"
					{...form.getInputProps('contacts.email')}
				/>
				<TextInput
					label="Website"
					placeholder="www.escola.pt"
					size="md"
					{...form.getInputProps('contacts.website')}
				/>
				<TextInput
					label="Telefone"
					placeholder="910001337"
					size="md"
					{...form.getInputProps('contacts.phone')}
				/>
				<TextInput
					label="Nome do responsável pela submissão do formulário"
					placeholder="João Silva"
					size="md"
					{...form.getInputProps('contacts.responder_name')}
				/>
				<TextInput
					label="Cargo do responsável pela submissão do formulário"
					placeholder="Diretor da Escola"
					size="md"
					{...form.getInputProps('contacts.responder_position')}
				/>
			</Stack>
		</Paper>
	);

	//
}
