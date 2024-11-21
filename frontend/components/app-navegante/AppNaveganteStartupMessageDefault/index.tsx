'use client';

/* * */

import { useEnvironmentContext } from '@/contexts/Environment.context';
import { URLS } from '@/settings/urls.settings';
import { Button } from '@mantine/core';
import { IconArrowBigUpLinesFilled } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function AppNaveganteStartupMessageDefault() {
	//

	//
	// A. Setup variables

	const t = useTranslations('app-navegante.AppNaveganteStartupMessageDefault');
	const environmentContext = useEnvironmentContext();

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<div className={styles.introWrapper}>
				<IconArrowBigUpLinesFilled className={styles.icon} />
				<h1 className={styles.heading}>{t('heading')}</h1>
				<h2 className={styles.subheading}>{t('subheading')}</h2>
				<p className={styles.text}>{t('text')}</p>
			</div>
			<div className={styles.actionsWrapper}>
				{environmentContext.data.value === 'app-navegante-android' && (
					<Button component={Link} href={URLS.app_navegante.google_play_store.prod}>
						{t('actions.update_android')}
					</Button>
				)}
				{environmentContext.data.value === 'app-navegante-ios' && (
					<Button component={Link} href={URLS.app_navegante.apple_app_store.prod}>
						{t('actions.update_ios')}
					</Button>
				)}
			</div>
		</div>
	);

	//
}
