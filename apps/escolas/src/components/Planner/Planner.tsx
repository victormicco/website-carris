import Image from 'next/image';

import styles from './Planner.module.css';

import BlackHeader from '../BlackHeader/BlackHeader';

//

//
// A. star variables
const Planner = () => {
	return (
		<div className={styles.container}>
			<BlackHeader text="Planeador de Viagem" />
			<a href="https://www.carrismetropolitana.pt/planeador/" rel="noopener noreferrer" target="_blank">
				<Image alt="Logotipo Carris Metropolitana próxima das escolas" height={900} src="/images/planner.png" style={{ height: '100%', width: '100%' }} width={670} />
			</a>
		</div>
	);
};

//

//
// B. Render Component
export default Planner;
