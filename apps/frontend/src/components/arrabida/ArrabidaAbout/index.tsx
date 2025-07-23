/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';

import styles from './styles.module.css';
import { Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { SetubalLogo } from './SetubalLogo';
import { CarrisLogo } from './CarrisLogo';

import { ArrabidaIcon } from '../ArrabidaHeader/ArrabidaIcon';
import { ArrabidaLogo } from '../ArrabidaHeader/ArrabidaLogo';


/* * */

export function ArrabidaAbout() {
	//

	//
	// A. Setup variables

    const t = useTranslations('arrabida.ArrabidaPage.sections.ArrabidaAbout');

	//
	// B. Transform data

	//
	// C. Render components

	return (
		<Surface>
			<Section heading={t('title')} withPadding withGap>
                <div className={styles.container}>
                    <iframe className={styles.video} src="https://www.youtube.com/embed/LO6-1TvYBZU?si=AdR2UcktlnXQPDgD" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                    <div className={styles.textContainer}>
                        <div className={styles.textWrapper}>
                            <Text className={styles.text}>
                                <span className={styles.textBold}>{t('text-1')}</span>{' '}
                                {t('text-2')}{' '}
                                <span className={styles.textBold}>{t('text-3')}</span>
                            </Text>{' '}
                            <Text className={styles.text}>{t('text-4')}</Text>
                        </div>

                        <div className={styles.logos}>
                            <div className={styles.logoWrapper}>
                                <ArrabidaIcon />
                                <ArrabidaLogo />
                            </div>
                            <CarrisLogo />
                            <SetubalLogo />
                        </div>
                        
                    </div>
                </div>
                
			</Section>
		</Surface>
	);

	//
}
