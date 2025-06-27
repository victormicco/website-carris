'use client';

/* * */

import { Button, Modal } from '@mantine/core';
import { useRouter } from 'next/navigation';

import styles from './styles.module.css';

/* * */

export function ModalSection({ setSuccessMessage, successMessage }) {
	const router = useRouter();
	return (
		<Modal
			opened={successMessage != null}
			withCloseButton={false}
			onClose={() => {
				setSuccessMessage(null);
			}}
			centered
		>
			<div className={styles.modal}>
				<h1>Obrigado pela sua submissão.</h1>
				<p>{successMessage}</p>
				<Button onClick={() => {
					router.push('/portal-escolas');
				}}
				>
					Fechar
				</Button>
				<Button
					variant="subtle"
					onClick={() => {
						setSuccessMessage(null);
					}}
				>
					Voltar ao formulário
				</Button>
			</div>
		</Modal>
	);
}
