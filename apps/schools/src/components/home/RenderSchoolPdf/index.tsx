'use client';

/* * */

import StopInfo from '@/components/StopInfo/StopInfo';
import Image from 'next/image';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

interface Props {
	schoolId: string
}

/* * */

export function RenderSchoolPdf({ schoolId }: Props) {
	//

	//
	// A. Fetch data

	const { data: schoolData } = useSWR(`https://api.carrismetropolitana.pt/datasets/facilities/schools/${schoolId}`);

	//
	// B. Render components

	if (!schoolData) {
		return <div className={styles.loading}>A carregar...</div>;
	}

	return (
		<div className={styles.container}>

			<div className={styles.header}>
				<Image alt="Logotipo Carris Metropolitana próxima das escolas" height={100} src="/images/CM-Escolas.svg" width={100} priority />
				<div className={styles.headerWrapper}>
					<div className={styles.title}>Carris Metropolitana mais próxima das escolas</div>
					<div className={styles.subtitle}>O teu regresso às aulas vai correr sobre rodas!</div>
				</div>
			</div>

			<div className={styles.schoolDetails}>
				<p className={styles.schoolName}>{schoolData.name}</p>
				<p className={styles.municipalityName}>{schoolData.municipality_name}</p>
			</div>

			<div className={styles.stopsWrapper}>
				{schoolData.stops.map(stopId => (
					<div key={stopId}>
						<StopInfo index={stopId} stop_id={stopId} />
					</div>
				))}
			</div>

		</div>
	);

	//
}
