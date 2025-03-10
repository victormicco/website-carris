/* * */

import { Complaints } from '@carrismetropolitana/api-types/metrics';
import { Image, Text } from '@mantine/core';

import styles from './styles.module.css';
/* * */
interface Props {
	data: Complaints[]
	filter_type: string
	filter_value: string
	totalPassengersLastWeek: number
}

interface CardProps {
	description1?: string
	description2?: string
	footer?: string
	image?: string
	subheading?: string
	title: string
	value: number
}
/* * */
export function MetricsContactsPageCardGroup({ data, filter_type, filter_value, totalPassengersLastWeek }: Props) {
	//

	//
	// A. Setup variables
	const cardData = [
		{
			description1: data.map(item => item.info_requests),
			description2: 'total de pedidos de informação',
			description3: 'total de reclamações',
			description4: 'do total de passageiros transportados na amL na última semana',
			image: '/assets/complaints/pedidos_info.svg',
			subheading: 'área metropolitana de Lisboa',
			title: 'Pedidos de Informação',
			value: data.reduce((acc, item) => acc + item.info_requests, 0),
		},
		{
			description1: data.map(item => item.complaints),
			description2: 'total de reclamações',
			description3: 'total de reclamações',
			description4: 'do total de passageiros transportados na amL na última semana',
			image: '/assets/complaints/reclamacoes_info.svg',
			subheading: 'área metropolitana de Lisboa',
			title: 'Reclamações', value: data.reduce((acc, item) => acc + item.complaints, 0) },
		{
			description1: data.map(item => item.other),
			description2: 'total de outro* tipo de contactos',
			description3: 'total de reclamações',
			description4: 'do total de passageiros transportados na amL na última semana',
			footer: '*perdidos e achados, sugestões e agradecimentos',
			image: '/assets/complaints/outros_info.svg',
			subheading: 'área metropolitana de Lisboa',
			title: 'Outros*', value: data.reduce((acc, item) => acc + item.other, 0) },
	];
	//
	// B. Render Components
	const Card = ({ description1, description2, footer, image, subheading, title, value }: CardProps) => (
		<>
			<div className={styles.cardMainWrapperShadow}>
				<Text className={styles.headerTitle}>{title}</Text>
			</div>
			<div className={styles.cardMainWrapper}>
				<div className={styles.header}>
					<Text>{subheading}</Text>
					<Image alt={title} src={image} />
				</div>
				<div className={styles.cardBody}>
					<Text className={styles.bodyValue1}>{value}</Text>
					<Text className={styles.bodyDescription1}>{description1}</Text>
					<Text className={styles.bodyDescription2}>{description2}</Text>
				</div>
				<div className={styles.card_footer}>
					<Text className={styles.footerNotes}>{footer}</Text>
				</div>

			</div>
		</>
	);

	return (
		<div className={styles.container}>
			{cardData.map((card, index) => (
				<Card key={index} description1={card.description1.toString()} description2={card.description2} footer={card.footer} image={card.image} subheading={card.subheading} title={card.title} value={card.value} />
			))}
		</div>
	);
	//
}
