/* * */

import { type PropsWithChildren } from 'react';

/* * */

import '@/themes/_reset/reset.css';

/* * */

export default async function Layout({ children }: PropsWithChildren) {
	return (
		<>
			<head>
				<meta content="transparent" name="theme-color" />
			</head>
			<body>
				{children}
			</body>
		</>
	);
}
