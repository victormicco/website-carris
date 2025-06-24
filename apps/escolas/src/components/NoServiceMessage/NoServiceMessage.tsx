'use client';

import { useMemo } from 'react';

import styles from './NoServiceMessage.module.css';

export default function NoServiceMessage({ municipality_id, municipality_name }) {
	//

	//
	// A. Setup variables

	//
	// B. Transform data

	const messages = useMemo(() => {
		const otherOperators = {
			1105: { article: 'de', operator_name: 'MobiCascais', operator_phone: '+351 800 203 186', operator_website: 'https://mobi.cascais.pt/geral/nova-rede-municipal-horarios-percursos-das-linhas-municipais' },
			1106: { article: 'de', operator_name: 'Carris Municipal', operator_phone: '+351 213 613 000', operator_website: 'https://www.carris.pt' },
			1504: { article: 'do', operator_name: 'TCB', operator_phone: '+351 212 068 592', operator_website: 'https://www.tcbarreiro.pt' },
		};
		//
		const localOperatorDetails = otherOperators[municipality_id];
		//
		return {
			subtitle: `Sugerimos que consulte o operador local "${localOperatorDetails.operator_name}" para mais detalhes sobre a oferta de transporte para esta instituição.`,
			title: `A Carris Metropolitana serve parcialmente o município ${localOperatorDetails.article} ${municipality_name}.`,
			...localOperatorDetails,
		};
	}, [municipality_id, municipality_name]);

	//
	// C. Render components

	return (
		<div className={styles.container}>
			<p className={styles.title}>{messages.title}</p>
			<p className={styles.subtitle}>{messages.subtitle}</p>
			<p className={styles.operatorName}>{messages.operator_name}</p>
			<a className={styles.operatorPhone} href={`tel:${messages.operator_phone}`}>
				{messages.operator_phone}
			</a>
			<a className={styles.operatorWebsite} href={messages.operator_website} target="__blank">
				Visitar Website
			</a>
		</div>
	);
}
