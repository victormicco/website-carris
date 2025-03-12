import { MetricsContactsPageCardGroupCard } from '@/components/metrics/MetricsPageContactsCardGroupCard';
import { Complaints } from '@carrismetropolitana/api-types/metrics';
import { useMemo } from 'react';

import styles from './styles.module.css';

interface Props {
	data: Complaints[]
	filter_type: string
	filter_value: string
	lineColor?: string
	municipalityName?: string
	totalPassengersLastWeek?: number
	totalPassengersLastWeekLineId?: number
}

export function MetricsContactsPageCardGroup({ data, filter_type, filter_value, lineColor, municipalityName, totalPassengersLastWeek, totalPassengersLastWeekLineId }: Props) {
	// A. Setup variables
	const filteredData = useMemo(() => {
		return data.filter(item => item.filter_value === filter_value && item.type === filter_type);
	}, [data, filter_type, filter_value]);

	const totalInfoRequests = useMemo(() => {
		return filteredData.reduce((acc, item) => acc + item.info_requests, 0);
	}, [filteredData]);

	const totalComplaints = useMemo(() => {
		return filteredData.reduce((acc, item) => acc + item.complaints, 0);
	}, [filteredData]);

	const totalOther = useMemo(() => {
		return filteredData.reduce((acc, item) => acc + item.other, 0);
	}, [filteredData]);

	// B. Fetch data
	const calcPercentage = (value: number, total: number) => {
		return `${((value / total) * 100).toFixed(3)}%`;
	};

	const createCardData = (description1: string, value: number, image: string, title: string, footer?: string) => ({
		description1,
		description2: filter_type === 'line' ? calcPercentage(value, totalPassengersLastWeekLineId || 0) : calcPercentage(value, totalPassengersLastWeek || 0),
		description3: ` ${filter_type === 'line' ? `do total de passageiros (${totalPassengersLastWeekLineId}) transportados na linha ${filter_value} na última semana` : 'do total de passageiros tranpostados na última semana'}`,
		filter_value: filter_value,
		footer,
		image,
		line_color: lineColor,
		municipality_name: municipalityName,
		subheading: filter_type,
		title,
		value,
	});

	const cardData = useMemo(() => [
		createCardData('total de pedidos de informação', totalInfoRequests, '/assets/complaints/pedidos_info.svg', 'Pedidos de Informação'),
		createCardData('total de reclamações', totalComplaints, '/assets/complaints/reclamacoes_info.svg', 'Reclamações'),
		createCardData('total de outro* tipo de contactos', totalOther, '/assets/complaints/outros_info.svg', 'Outros*', '*perdidos e achados, sugestões e agradecimentos'),
	], [totalInfoRequests, totalComplaints, totalOther, totalPassengersLastWeek, totalPassengersLastWeekLineId, filter_value, filter_type, lineColor, municipalityName]);

	// C. Render components
	return (
		<div className={styles.container}>
			{cardData.map((card, index) => (
				<MetricsContactsPageCardGroupCard
					key={index}
					description1={card.description1}
					description2={card.description2}
					description3={card.description3}
					filter_value={filter_value}
					footer={card.footer}
					image={card.image}
					line_color={card.line_color}
					municipality_name={card.municipality_name}
					subheading={card.subheading}
					title={card.title}
					value={card.value}
				/>
			))}
		</div>
	);
}
