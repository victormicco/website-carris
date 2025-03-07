/* * */

import { allCardsData } from '@/components/metrics/MetricsPageContacts/_data/cards';
import { MetricsPageContactsCard } from '@/components/metrics/MetricsPageContactsCard';

import styles from './styles.module.css';

/* * */
interface Complaints {
	_id: number
	complaints: number
	email: number
	filter_value: string
	info_request: number
	other: number
	phone: number
	total: number
	type: string
}

interface Props {
	data: Complaints[]
}

/* * */

export function MetricsContactsPage2024CardGroup({ data }: Props) {
	//

	//
	// A. Transform data

	// const groupCards = allCardsData.filter(card => card._group === groupId);

	// B. Render components

	return (
	// <div className={styles.container}>
	// 	{groupCards[0]._group_title && <h3 className={styles.groupTitle}>{groupCards[0]._group_title}</h3>}
	// 	{groupCards.map((cardData, index) => (
	// 		<MetricsPageContactsCard
	// 			key={cardData._id}
	// 			cardData={cardData}
	// 			isFirstChild={index === 0}
	// 			isLastChild={index === groupCards.length - 1}
	// 		/>
	// 	))}
	// </div>
		<div className={styles.cardSection}>
			<div className={styles.container}>
				<div className={styles.cardMainWrapperShadow}>
					<p className={styles.headerTitle}>Lisboa</p>
				</div>
				<div className={styles.cardMainWrapper}>
					<div className={styles.header}>
						<p className={styles.intro}>120K</p>
						<p className={styles.headerNumber}>Reclamações</p>
						<p className={styles.contentLegend}>0,78%</p>
					</div>
				</div>
			</div>

			<div className={styles.container}>
				<div className={styles.cardMainWrapperShadow}>
					<p className={styles.headerTitle}>Lisboa</p>
				</div>
				<div className={styles.cardMainWrapper}>
					<div className={styles.header}>
						<p className={styles.intro}>120K</p>
						<p className={styles.headerNumber}>Reclamações</p>
						<p className={styles.contentLegend}>0,78%</p>
					</div>
				</div>
			</div>
			<div className={styles.container}>
				<div className={styles.cardMainWrapperShadow}>
					<p className={styles.headerTitle}>Lisboa</p>
				</div>
				<div className={styles.cardMainWrapper}>
					<div className={styles.header}>
						<p className={styles.intro}>120K</p>
						<p className={styles.headerNumber}>Reclamações</p>
						<p className={styles.contentLegend}>0,78%</p>
					</div>
				</div>
			</div>

		</div>
	);

	//
}
