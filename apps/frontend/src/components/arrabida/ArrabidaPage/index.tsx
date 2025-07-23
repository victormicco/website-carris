'use client';

/* * */

import { ArrabidaHeader } from '@/components/arrabida/ArrabidaHeader';
import { Surface } from '@/components/layout/Surface';
import { Accordion, Image, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

import { Arrabida365 } from '../Arrabida365';
import { ArrabidaAbout } from '../ArrabidaAbout';
import { ArrabidaList } from '../ArrabidaList';

/* * */

export function ArrabidaPage() {
	//

	//
	// A. Setup variables

	const t = useTranslations('arrabida.ArrabidaPage');

	//
	// B. Render components

	return (
		<>
			<Arrabida365 />

			<ArrabidaList />

			<ArrabidaAbout />

			<Surface forceOverflow>
				<Accordion>
					<Accordion.Item value="section-1">
						<Accordion.Control>{t('sections.section-1.title')}</Accordion.Control>
						<Accordion.Panel>
							<Text className={styles.text}>{t('sections.section-1.text-1')}</Text>
							<Text className={styles.text}>{t('sections.section-1.text-2')}</Text>
						</Accordion.Panel>
					</Accordion.Item>

					<Accordion.Item value="section-2">
						<Accordion.Control>{t('sections.section-2.title')}</Accordion.Control>
						<Accordion.Panel>
							<Text className={styles.text}>{t('sections.section-2.text-1')}</Text>
							<Text className={styles.text}>{t('sections.section-2.text-2')}</Text>
						</Accordion.Panel>
					</Accordion.Item>

					<Accordion.Item value="section-3">
						<Accordion.Control>{t('sections.section-3.title')}</Accordion.Control>
						<Accordion.Panel>
							<Text className={styles.text}>{t('sections.section-3.text-1')}</Text>
							<Text className={styles.text}>{t('sections.section-3.text-2')}</Text>
						</Accordion.Panel>
					</Accordion.Item>
				</Accordion>
			</Surface>
		</>
	);
}
