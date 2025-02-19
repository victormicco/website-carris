'use client';

/* * */

import { Surface } from '@/components/layout/Surface';
import { Image } from '@mantine/core';

import styles from './styles.module.css';

/* * */

export function Survey2024Intro() {
	return (
		<Surface forceOverflow>
			<Image alt="Review 2024" className={styles.image} src="/assets/survey-2024/images/AF _ Inquérito _ Banner _ Small.png" />
		</Surface>
	);
}
