import Head from 'next/head';
import Image from 'next/image';

import styles from './Layout.module.css';

import AppTopBar from '../AppTopBar/AppTopBar';

export default function Layout({ children }) {
	return (
		<div className={styles.layout}>
			<Head>
				<title>Escolas • Carris Metropolitana</title>
				<link href="/images/cm.png" rel="icon" />
				<meta content="Saiba as linhas que existem perto duma escola" name="description" />
				<meta content="Escolas" name="og:title" />
			</Head>

			<AppTopBar />

			<div className={styles.container}>
				<header className={styles.header}>
					<Image alt="Logotipo Carris Metropolitana próxima das escolas" height={100}src="/images/CM-Escolas.svg" width={100} priority />
					<Image alt="Logotipo Carris Metropolitana" height={58} src="/images/carris-metropolitana.svg" width={180} priority />
				</header>

				<main className={styles.main}>{children}</main>
			</div>
		</div>
	);
}
