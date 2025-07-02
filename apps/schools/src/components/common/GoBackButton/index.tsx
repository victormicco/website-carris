/* * */

import Link from 'next/link';

import styles from './styles.module.css';

/* * */

interface Props {
	to: '/' | '/portal-escolas'
}

/* * */

export function GoBackButton({ to }: Props) {
	return (
		<Link className={styles.button} href={to}>
			← Voltar ao início
		</Link>
	);
}
