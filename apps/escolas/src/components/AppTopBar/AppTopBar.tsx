import styles from './AppTopBar.module.css';

import AppTopBarLink from './AppTopBarLink';

export default function AppTopBar() {
	return (
		<div className={styles.container}>
			<AppTopBarLink href="//www.tmlmobilidade.pt/" label="TML" />
			<AppTopBarLink href="//www.carrismetropolitana.pt/" label="Carris Metropolitana" active />
			<AppTopBarLink href="//www.navegante.pt/" label="navegante®" />
		</div>

	);
}
