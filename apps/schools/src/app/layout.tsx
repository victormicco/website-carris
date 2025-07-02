/* * */

import { WebsiteWrapper } from '@/components/common/WebsiteWrapper';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { Notifications } from '@mantine/notifications';
import { type Metadata } from 'next';
import { Inter } from 'next/font/google';
import { type PropsWithChildren } from 'react';

import { Providers } from './providers';

/* * */

const inter = Inter({
	display: 'swap',
	subsets: ['latin'],
	variable: '--font-inter',
	weight: ['400', '500', '600', '700', '800'],
});

/* * */

export const metadata: Metadata = {
	description: 'Escolas servidas pela CMetropolitana',
	metadataBase: new URL(getPublicVariable('server_url_schools')),
	title: 'CMetropolitana',
};

/* * */

export default async function RootLayout({ children }: PropsWithChildren) {
	return (
		<html className={inter.variable}>
			<head>
				<meta content="transparent" name="theme-color" />
			</head>
			<body>
				<Providers>
					<Notifications />
					<WebsiteWrapper>
						{children}
					</WebsiteWrapper>
				</Providers>
			</body>
		</html>
	);
}
