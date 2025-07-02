'use client';

/* * */

import { useUpdateSchoolFormContext } from '@/form/form';
import { Button, Paper, PasswordInput, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { type Dispatch, type SetStateAction } from 'react';

/* * */

interface Props {
	onSubmit: Dispatch<SetStateAction<boolean>>
}

/* * */

export function ValidateCodeSection({ onSubmit }: Props) {
	//

	//
	// A. Setup variables

	const form = useUpdateSchoolFormContext();

	//
	// B. Handle actions

	const handleShowPasswordError = (error: string) => {
		notifications.show({
			color: 'red',
			message: error,
			title: 'Erro ao validar o código de acesso.',
		});
	};

	const handleShowPasswordSuccess = () => {
		notifications.show({
			color: 'green',
			message: 'Já pode atualizar os dados da sua escola.',
			title: 'Código de acesso aceite!',
		});
	};

	const handleValidateCode = async () => {
		// Get the latest form values
		const formValues = form.getValues();
		// Check if the password field is empty
		if (!formValues._password) {
			form.setFieldError('_password', 'Por favor, introduza o código de acesso.');
			return;
		}
		// Make an API call to check if the password is correct
		const requestBody = JSON.stringify({ _password: formValues._password });
		const response = await fetch('/api/check-password', { body: requestBody, method: 'POST' });
		const responseData = await response.json();

		console.log('Response from API:', responseData);
		// Handle when the response is not ok
		if (!response.ok || !responseData.success) {
			handleShowPasswordError(responseData.message || 'Código de acesso inválido.');
			onSubmit(false);
			return;
		}
		// If the password is correct,
		// show a success notification and open the form
		handleShowPasswordSuccess();
		onSubmit(true);
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			handleValidateCode();
		}
	};

	//
	// C. Render components

	return (
		<Paper p={16} radius="md" shadow="sm">
			<Title fw={700} order={3}>Código de acesso</Title>
			<PasswordInput
				{...form.getInputProps('_password')}
				onKeyDown={handleKeyDown}
				placeholder="********"
			/>
			<Button mt={20} onClick={handleValidateCode} size="md">
				Verificar
			</Button>
		</Paper>
	);

	//
}
