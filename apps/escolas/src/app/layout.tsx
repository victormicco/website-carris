//
// ROOT LAYOUT

import '@/styles/reset.css';
import '@/styles/defaults.css';
import '@/styles/colors.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { ColorSchemeScript } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Inter } from 'next/font/google';
import React from 'react';

import Providers from './providers';

const inter = Inter({
	display: 'swap',
	subsets: ['latin'],
	variable: '--font-inter',
	weight: ['400', '500', '600', '700', '800'],
});

export const metadata = {
	description: 'Escolas servidas pela Carris Metropolitana',
	title: 'Carris Metropolitana',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html className={inter.variable}>
			<head>
				<ColorSchemeScript />
				<link href="/favicon.svg" rel="shortcut icon" />
			</head>
			<body>
				<Providers>
					<Notifications />
					{children}
				</Providers>
			</body>
		</html>
	);
}
