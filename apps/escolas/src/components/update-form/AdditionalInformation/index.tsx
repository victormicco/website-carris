'use client';

import { Paper, Textarea, Title } from '@mantine/core';

export function SchoolAdditionalInformation({ form }) {
	return (
		<Paper p={16} radius="md" shadow="sm">
			<Title fw={700} order={3}>Informação adicional</Title>
			<Textarea
				description="Informação extra que queira transmitir sobre a escola"
				label="Comentário"
				placeholder="A Escola tem horário noturno desde as 18:35 até às 22:40/Há muitos estudantes que vêm de sitio X/Não há aulas sextas-feiras/etc"
				size="md"
				{...form.getInputProps('comment')}
			/>
		</Paper>
	);
}
