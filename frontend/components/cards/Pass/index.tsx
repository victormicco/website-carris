'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { Player } from '@lottiefiles/react-lottie-player';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

import metropolitanoAnimation from '@/assets/animations/cards/metropolitano.json';
import municipalAnimation from '@/assets/animations/cards/municipal.json';

/* * */

export function Pass() {
	//

	//
	// A. Setup variables

	const t = useTranslations('cards.Pass');

	//
	// B. Render components

	return (
		<Surface variant="brand2">
			<Section heading={t('heading')} subheading={t('subheading')} withPadding>
				<Grid columns="ab" withGap>

					<div className={styles.cardWrapper}>
						<Player src={metropolitanoAnimation} autoplay loop />
						<div className={styles.cardContents}>
							<p className={styles.cardTitle}>{t('metropolitano.title')}</p>
							<p className={styles.cardDescription}>{t('metropolitano.description')}</p>
						</div>
					</div>

					<div className={styles.cardWrapper}>
						<Player src={municipalAnimation} autoplay />
						<div className={styles.cardContents}>
							<p className={styles.cardTitle}>{t('municipal.title')}</p>
							<p className={styles.cardDescription}>{t('municipal.description')}</p>
						</div>
					</div>

				</Grid>
			</Section>
		</Surface>
	);

	//
}
