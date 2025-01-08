'use client';

/* * */

import { Review2024CardSchema } from '@/components/review-2024/_data/cards';
import { Player } from '@lottiefiles/react-lottie-player';
import { useClipboard, useElementSize } from '@mantine/hooks';
import { IconCheck, IconShare2 } from '@tabler/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

/* * */

interface Props {
	cardData: Review2024CardSchema
	isFirstChild?: boolean
	isLastChild?: boolean
}

interface CustomCSSProperties extends React.CSSProperties {
	'--color-border'?: string
	'--color-primary': string
	'--color-text': string
	'--content-height': string
}

/* * */

export function Review2024Card({ cardData, isFirstChild, isLastChild }: Props) {
	//

	//
	// A. Setup variables

	const [isOpen, setIsOpen] = useState(false);
	const clipboard = useClipboard({ timeout: 500 });

	const { height: contentHeight, ref: contentRef } = useElementSize();

	//
	// C. Transform data

	const stylesData: CustomCSSProperties = {
		'--color-border': cardData.colors.border || 'transparent',
		'--color-primary': cardData.colors.primary,
		'--color-text': cardData.colors.text,
		'--content-height': `${contentHeight}px`,
	};

	//
	// C. Handle actions

	const handleToggleIsOpen = () => {
		setIsOpen(prev => !prev);
	};

	const handleShareUrl = () => {
		clipboard.copy('Hello, world!');
	};

	//
	// C. Render components

	return (
		<div className={styles.container} data-is-first={isFirstChild} data-is-last={isLastChild} data-open={isOpen} style={stylesData}>
			<div className={styles.header} onClick={handleToggleIsOpen}>
				<p className={styles.headerTitle}>{cardData.header.title}</p>
				<p className={styles.headerNumber}>{cardData.header.number}</p>
			</div>
			<div ref={contentRef} className={styles.content}>
				<div className={styles.innerWrapper}>
					<div className={styles.contentNumber}>
						<p className={styles.contentNumberValue}>{cardData.content.number_value}</p>
						<p className={styles.contentNumberLegend}>{cardData.content.number_legend}</p>
					</div>
					{cardData.content.lottie_src && (
						<div className={styles.contentLottie}>
							<Player src={cardData.content.lottie_src} autoplay loop />
						</div>
					)}
					<p className={styles.contentTitle}>{cardData.content.title}</p>
					<p className={styles.contentDescription}>{cardData.content.description}</p>
					<div className={styles.shareButton} onClick={handleShareUrl}>
						{clipboard.copied
							? <IconCheck />
							: <IconShare2 />}
					</div>
				</div>
			</div>
		</div>
	);

	//
}
