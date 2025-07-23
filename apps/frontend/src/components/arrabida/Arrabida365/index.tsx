/* * */

import { GridNav } from '@/components/layout/GridNav';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';

import styles from './styles.module.css';
import Image from 'next/image';
import { BackButton } from '@/components/common/BackButton';
import Link from 'next/link';
import { IconArrowDownRight, IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { Button } from '@mantine/core';
import { useTranslations } from 'next-intl';

/* * */

export function Arrabida365() {
	//

	//
	// A. Setup variables

    const t = useTranslations('arrabida.ArrabidaPage.sections.Arrabida365');

	//
	// B. Transform data

	//
	// C. Render components

	return (
		<div id="arrabida365">
			<Surface forceOverflow>
				<div className={styles.backButton}>
					<Link className={styles.container} href="/">
					<IconArrowLeft size={14} />
					<span className={styles.label}>Carris Metropolitana</span>
				</Link>
				</div>
				<Section heading={t('title')} withPadding withGap>
                	<h6 className={styles.subheading}>{t('subtitle')}</h6>
					<Button className={styles.expandButton} leftSection={<IconArrowDownRight size={18} />}>{t('button')}</Button>
				<div className={styles.imagesWrapper}>
                    <Image className={styles.imageMap} src='/assets/arrabidas/arrabida_365_map.png' alt="Arrabida 365" width={1920} height={1080} />
                    <div className={styles.imageBeeWrapper}>
						<Image className={styles.imageBee} src='/assets/arrabidas/arrabida_365.png' alt="Arrabida 365" width={1920} height={1080} />
						<Button className={styles.buttonSeeMore} rightSection={<IconArrowRight size={18} />}>{t('buttonSeeMore')}</Button>
                    </div>
                </div>
                
			</Section>
		</Surface>
		</div>
	);

	//
}
