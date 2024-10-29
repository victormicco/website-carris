/* * */

import { Section } from '@/components/layout/Section';
import { Link } from '@/i18n/routing';
import { ImagesCommon } from '@/settings/assets.settings';
import { Image } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface Props {
	coverImageSrc: string
	href: string
	target?: string
	title: string
}

/* * */

export default function Component({ coverImageSrc, href, target = '_blank', title }: Props) {
	//

	//
	// C. Render Components

	return (
		<Link href={href} target={target}>
			<Image alt={title} className={styles.coverImage} fallbackSrc={ImagesCommon.PLACEHOLDER} src={coverImageSrc} />
		</Link>
	);

	//
}
