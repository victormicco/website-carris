'use client';

import { useRouter } from 'next/navigation';

import styles from './Titles.module.css';

export default function Titles({ goHome, municipality_name, school_name }: { goHome?: boolean, municipality_name: string, school_name: string }) {
	//

	//
	// A. Setup variables

	const router = useRouter();

	//
	// B. Handle actions

	const handleClick = () => {
		if (goHome) router.push('/');
	};

	//
	// C. Render components

	return (
		<div className={styles.container} data-clickable={!!goHome} onClick={handleClick}>
			<div className={styles.schoolName}>{school_name}</div>
			<div className={styles.municipalityName}>{municipality_name}</div>
		</div>
	);

	//
}
