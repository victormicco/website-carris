'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { Review2024CardGroup } from '@/components/review-2024/Review2024CardGroup';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function Review2024LevelThree() {
	//

	//
	// A. Setup variables

	const t = useTranslations('review-2024.Review2024LevelThree');

	//
	// B. Render components

	return (
		<Surface forceOverflow>
			<Grid columns="abc">

				<Section withPadding="desktop" withGap>
					<div className={styles.headingWrapper}>
						<h2 className={styles.heading}>{t('municipio_lines.heading')}</h2>
						<h5 className={styles.subheading}>{t('municipio_lines.subheading')}</h5>
					</div>
					<Review2024CardGroup groupId="municipio_lines_area_1" />
					<Review2024CardGroup groupId="municipio_lines_area_2" />
				</Section>

				<Section withPadding="desktop" withGap>
					<Review2024CardGroup groupId="municipio_lines_area_3" />
					<Review2024CardGroup groupId="municipio_lines_area_4" />
				</Section>

			</Grid>
		</Surface>
	);

	//
}
