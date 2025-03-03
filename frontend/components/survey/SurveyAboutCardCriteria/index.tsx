/* * */

import { useTranslations } from 'next-intl';

import styles from './styles.module.css';
/* * */

export function SurveyAboutCardCriteria() {
	//

	//
	// A. Setup Variables
	const t = useTranslations('survey.SurveyCriteriaCard');
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

	);
	//
}
