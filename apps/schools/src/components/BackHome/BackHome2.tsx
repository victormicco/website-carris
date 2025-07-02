'use client';

import { useRouter } from 'next/navigation';

import styles from './BackHome.module.css';

export default function BackHome2() {
	//

	//
	// A. Setup variables

	const router = useRouter();

	//
	// B. Handle actions

	const handleClick = () => {
		router.push('/');
	};

	//
	// C. Render components

	return (
		<div className={styles.backHome} onClick={handleClick}>
			← Voltar ao início
		</div>
	);

	//
}
