/* * */
import { MetricsContactsPageCardGroupCard } from '@/components/metrics/MetricsPageContactsCardGroupCard';
import { Complaints } from '@carrismetropolitana/api-types/metrics';

import styles from './styles.module.css';
/* * */
interface Props {
	data: Complaints[]
	filter_type: string
	filter_value: string
	totalPassengersLastWeek: number
}
/* * */
export function MetricsContactsPageCardGroup({ data, filter_type, filter_value, totalPassengersLastWeek }: Props) {
	//

	//
	// A. Setup variables
	const filteredData = data.filter(item => item.filter_value === filter_value && item.type === filter_type);
	const totalInfoRequests = filteredData.reduce((acc, item) => acc + item.info_requests, 0);
	const totalComplaints = filteredData.reduce((acc, item) => acc + item.complaints, 0);
	const totalOther = filteredData.reduce((acc, item) => acc + item.other, 0);
	//
	// B. Fetch data
	const calcPercentage = (value: number, total: number) => {
		return `${((value / total) * 100).toFixed(3)}%`;
	};

	const createCardData = (description1: string, value: number, image: string, title: string, footer?: string) => ({
		description1,
		description2: calcPercentage(value, totalPassengersLastWeek),
		description3: 'do total de passageiros transportados na amL na última semana',
		footer,
		image,
		subheading: 'área metropolitana de Lisboa',
		title,
		value,
	});

	const cardData = [
		createCardData('total de pedidos de informação', totalInfoRequests, '/assets/complaints/pedidos_info.svg', 'Pedidos de Informação'),
		createCardData('total de reclamações', totalComplaints, '/assets/complaints/reclamacoes_info.svg', 'Reclamações'),
		createCardData('total de outro* tipo de contactos', totalOther, '/assets/complaints/outros_info.svg', 'Outros*', '*perdidos e achados, sugestões e agradecimentos'),
	];
	//
	// C. Render components
	return (
		<div className={styles.container}>
			{cardData.map((card, index) => (
				<MetricsContactsPageCardGroupCard
					key={index}
					description1={card.description1}
					description2={card.description2}
					description3={card.description3}
					footer={card.footer}
					image={card.image}
					subheading={card.subheading}
					title={card.title}
					value={card.value}
				/>
			))}
		</div>
	);
	//
}
