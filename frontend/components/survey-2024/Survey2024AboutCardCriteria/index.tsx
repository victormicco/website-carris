/* * */

import { useTranslations } from 'next-intl';

import styles from './styles.module.css';
/* * */

export function Survey2024AboutCardCriteria() {
	//

	//
	// A. Setup Variables
	const t = useTranslations('survey-2024.Survey2024CriteriaCard');
	//
	// B. Render Components
	return (
		<div>
			<div className={styles.cardMainWrapperShadow}>
				<p className={styles.headerTitle}>{t('header')}</p>
			</div>
			<div className={styles.cardMainWrapper}>
				<div className={styles.cardContent}>
					<div className={styles.firstRow}>
						<p>{t('firstRowValue')}</p>
						<p>{t('firstRowText')}</p>
					</div>
					<div className={styles.secondRow}>
						<p>{t('secondRowValue')}</p>
						<p>{t('secondRowText')}</p>
					</div>
					<div className={styles.thirdRow}>
						<p>{t('thirdRowValue')}</p>
						<p>{t('thirdRowText')}</p>
					</div>
					<p>{t('fourthRowText')}</p>
				</div>
			</div>
		</div>

	// <div className={styles.containerStatistics}>
	// 	<div className={styles.header}>
	// 		<p className={styles.headerNumberStatistics}>95,5%</p>
	// 	</div>

	// 	<p className={styles.headerTitle}>{t('Survey2024AboutCard.confidence_interval')}</p>

	// 	<div className={styles.header}>
	// 		<p className={styles.headerNumberStatistics}>1,8%</p>
	// 		<p className={styles.headerTitle}>{t('Survey2024AboutCard.error_margin')}</p>
	// 	</div>
	// </div>
	);
	//
}
