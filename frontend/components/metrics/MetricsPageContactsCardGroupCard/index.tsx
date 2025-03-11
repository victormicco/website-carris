/* * */
import { Image, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';
/* * */
interface Props {
	description1?: string
	description2?: string
	description3?: string
	footer?: string
	image?: string
	subheading?: string
	title: string
	value: number
}
/* * */
export function MetricsContactsPageCardGroupCard({ description1, description2, description3, footer, image, subheading, title, value }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('metrics.MetricsPageContactsCardGroup');

	//
	// B. Render components
	return (
		<div>
			<div className={styles.cardMainWrapperShadow}>
				<Text className={styles.headerTitle}>{title}</Text>
			</div>
			<div className={styles.cardMainWrapper}>
				<div className={styles.cardBody}>
					<Text className={styles.subheading}>{subheading}</Text>
					<Image alt={title}className={styles.image} src={image} />
					<Text className={styles.bodyValue1}>{t('main_value', { value: value })}</Text>
					<Text className={styles.bodyDescription1}>{description1}</Text>
					<div className={styles.cardBodyInnerCard}>
						<Text className={styles.bodyDescription2}>{description2}</Text>
						<Text className={styles.bodyDescription3}>{description3}</Text>
					</div>
				</div>
				<div className={styles.cardFooter}>
					<Text className={styles.footerNotes}>{footer}</Text>
				</div>

			</div>
		</div>
	);
	//
}
