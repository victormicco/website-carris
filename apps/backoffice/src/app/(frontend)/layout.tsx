/* * */

import { type PropsWithChildren } from 'react';

/* * */

export const metadata = {
	description: 'Backoffice for Carris Metropolitana website.',
	title: 'Backoffice CM',
};

/* * */

export default async function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<body>
				<main>{children}</main>
			</body>
		</html>
	);
}
