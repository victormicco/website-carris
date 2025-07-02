'use client';

/* * */

import { useUpdateSchoolFormContext } from '@/form/form';
import { Paper, Textarea, Title } from '@mantine/core';

/* * */

export function CommentsFormSection() {
	//

	//
	// A. Setup variables

	const form = useUpdateSchoolFormContext();

	//
	// B. Render components

	return (
		<Paper p={16} radius="md" shadow="sm">
			<Title fw={700} order={3}>Informação adicional</Title>
			<Textarea
				description="Informação adicional que pretenda transmitir à CMetropolitana."
				label="Comentário"
				placeholder="A Escola tem horário noturno a partir das 18:35 até às 22:40 / Há muitos estudantes que vêm do sitio X / Não há aulas às sextas-feiras..."
				size="md"
				{...form.getInputProps('comments')}
			/>
		</Paper>
	);
}
