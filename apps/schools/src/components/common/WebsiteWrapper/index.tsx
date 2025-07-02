/* * */

import Image from 'next/image';

import styles from './styles.module.css';

/* * */

export function WebsiteWrapper({ children }) {
	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<Image alt="Logotipo Carris Metropolitana próxima das escolas" height={100} src="/images/CM-Escolas.svg" width={100} priority />
				<Image alt="Logotipo Carris Metropolitana" height={58} src="/images/carris-metropolitana.svg" width={180} priority />
			</header>
			<main className={styles.main}>
				{children}
			</main>
		</div>
	);
}
