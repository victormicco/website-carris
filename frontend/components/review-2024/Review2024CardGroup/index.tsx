/* * */

import { allCardsData } from '../_data/cards';
import { Review2024Card } from '../Review2024Card';
import styles from './styles.module.css';

/* * */

interface Props {
	groupId: string
}

/* * */

export function Review2024CardGroup({ groupId }: Props) {
	//

	//
	// A. Transform data

	const groupCards = allCardsData.filter(card => card._group === groupId);

	//
	// B. Render components

	return (
		<div className={styles.container}>
			{groupCards.map((cardData, index) => (
				<Review2024Card
					key={cardData._id}
					cardData={cardData}
					isFirstChild={index === 0}
					isLastChild={index === groupCards.length - 1}
				/>
			))}
		</div>
	);

	//
}
