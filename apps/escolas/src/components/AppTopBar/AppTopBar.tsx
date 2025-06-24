import styles from './AppTopBar.module.css';

export default function AppTopBar() {
	//

	const AppTopBarLink = ({ active, href, label }) => (
		<a className={`${styles.link} ${active && styles.active}`} href={href}>
			<div className={styles.label}>{label}</div>
			<div className={styles.indicatorWrapper}>
				<div className={styles.indicatorActive} />
			</div>
		</a>
	);

	return (
		<div className={styles.container}>
			<AppTopBarLink href="//www.tmlmobilidade.pt/" label="TML" />
			<AppTopBarLink active href="//www.carrismetropolitana.pt/" label="Carris Metropolitana" />
			<AppTopBarLink href="//www.navegante.pt/" label="navegante®" />
		</div>
	);
}
