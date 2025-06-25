import styles from './AppTopBar.module.css';

interface Props {
	active?: boolean
	href: string
	label: string
}

export default function AppTopBarLink({ active = false, href, label }: Props) {
	return (
		<a className={`${styles.link} ${active ? styles.active : styles.inactive}`} href={href}>
			<div className={styles.label}>{label}</div> {}
			<div className={styles.indicatorWrapper}>
				<div className={styles.indicatorActive} />
			</div>
		</a>
	);
}
