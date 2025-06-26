'use client';

/* * */

import { Button, Paper, PasswordInput, Text, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { isPasswordCorrect } from '../../SchoolInfoUpdate/SubmitAction';

/* * */

export function SubmitCodeSection({ form, setFormOpen }) {
	//

	//
	// A. Handle actions

	const handleCheckPassword = async () => {
		const passwordValue = form.getValues().password;
		const isCorrect = await isPasswordCorrect(passwordValue);
		if (isCorrect) {
			notifications.show({ color: 'blue', message: '', title: 'Código de acesso aceite' });
			setFormOpen(true);
		}
		else {
			notifications.show({ color: 'red', message: '', title: 'Código de acesso inválido' });
			setFormOpen(false);
		}
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			handleCheckPassword();
		}
	};

	//
	// B. Render components

	return (
		<Paper p={16} radius="md" shadow="sm">
			<Title fw={700} order={3}>Código de acesso</Title>
			{form.getInputProps('password').error && <Text c="red" size="md">{form.getInputProps('password').error}</Text>}
			<PasswordInput
				placeholder="********"
				{...form.getInputProps('password')}
				onKeyDown={handleKeyDown}
			/>
			<Button
				mt={20}
				onClick={handleCheckPassword}
				size="md"
			>
				Verificar
			</Button>
		</Paper>
	);

	//
}
