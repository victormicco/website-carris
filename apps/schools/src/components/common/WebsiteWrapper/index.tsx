/* * */

import Image from 'next/image';

import styles from './styles.module.css';

/* * */

import CarrisMetropolitanaLogo from '@/images/carris-metropolitana-logo.svg';
import CMSchoolsLogo from '@/images/cm-schools-logo.svg';

/* * */

export function WebsiteWrapper({ children }) {
	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<Image alt="Logotipo Carris Metropolitana próxima das escolas" height={100} src={CMSchoolsLogo} width={100} priority />
				<Image alt="Logotipo Carris Metropolitana" height={58} src={CarrisMetropolitanaLogo} width={180} priority />
			</header>
			<main className={styles.main}>
				{children}
			</main>
		</div>
	);
}
