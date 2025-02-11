'use client';

/* * */

import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { default as NextLink, type LinkProps as NextLinkProps } from 'next/link';

/* * */

interface Props extends NextLinkProps {
	children: React.ReactNode
	className?: string
	rel?: string
	target?: string
	track?: boolean
}

/* * */

export function Link({ track = true, ...props }: Props) {
	//

	//
	// A. Setup variables

	const analyticsContext = useAnalyticsContext();

	//
	// B. Handle actions

	const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (track && typeof window !== 'undefined') {
			const currentWindowUrl = window.location.pathname;
			const hrefString = props.href?.toString() || 'not provided';
			const target = hrefString.includes('//') ? hrefString.split('//')[1].split('/')[0] : 'not provided';
			const internalTarget = hrefString || 'not provided';
			analyticsContext.actions.capture(ampli => ampli.clickLink({
				destination_target: hrefString.startsWith('/') ? internalTarget : target,
				destination_url: hrefString,
				pathname: currentWindowUrl,
			}));
		}
		if (props.onClick) {
			props.onClick(e);
		}
	};

	//
	// C. Render components

	return (
		<NextLink {...props} onClick={handleLinkClick}>
			{props.children}
		</NextLink>
	);

	//
}
