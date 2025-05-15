/* * */

import { RootProviders } from '@/providers/root-providers';
import { getPublicVariable } from '@carrismetropolitana/website-settings';
import { type Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

/* * */

import '@/themes/_reset/reset.css';

/* * */

const inter = Inter({
	display: 'swap',
	subsets: ['latin'],
	variable: '--font-inter',
	weight: ['400', '500', '600', '700', '800'],
});

/* * */

export const metadata: Metadata = {
	description: 'Horários e Paragens em Tempo Real',
	metadataBase: new URL(getPublicVariable('public_url')),
	title: 'CMetropolitana',
};

/* * */

export default async function RootLayout({ children }) {
	return (
		<html className={inter.variable}>
			<head>
				<meta content="transparent" name="theme-color" />
			</head>
			<body>
				<NuqsAdapter>
					<RootProviders>
						{children}
					</RootProviders>
				</NuqsAdapter>
			</body>
		</html>
	);
}
