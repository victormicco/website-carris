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
			try {
				const destURl = new URL(props.href.toString());
				const target = destURl.hostname || 'not provided';
				analyticsContext.actions.capture(ampli => ampli.clickLink({
					destination_target: target,
					destination_url: destURl.href,
					pathname: currentWindowUrl,
				}));
			}
			catch (e) {
				analyticsContext.actions.capture(ampli => ampli.clickLink({
					destination_target: 'Internal',
					destination_url: 'www.carrismetropolitana.pt',
					pathname: currentWindowUrl,
				}));
			}
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
