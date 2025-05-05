'use client';

/* * */

import { EnvironmentContextProvider } from '@/contexts/Environment.context';
import { getCssVariableValue } from '@/utils/getCssVariableValue';
import { MantineProvider, MantineProviderProps } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { ModalsProvider } from '@mantine/modals';
import 'dayjs/locale/pt';
import { DatesProviderValue } from 'node_modules/@mantine/dates/lib/components/DatesProvider/DatesProvider';
import { useEffect } from 'react';

/* * */

interface Props {
	children: React.ReactNode
	themeData: MantineProviderProps['theme']
	themeId: string
}

/* * */

export function ThemeProviders({ children, themeData, themeId }: Props) {
	//

	//
	// A. Setup variables

	const mantineDatesSettings: Partial<DatesProviderValue> = {
		firstDayOfWeek: 1,
		locale: 'pt',
		weekendDays: [6, 0],
	};

	//
	// B. Handle actions

	useEffect(() => {
		const interval = setInterval(() => {
			if (typeof window === 'undefined' || !document) return;
			const themeColor = getCssVariableValue('--color-system-background-100');
			const metaTag = document.querySelector('meta[name="theme-color"]');
			if (metaTag && themeColor) metaTag.setAttribute('content', themeColor);
		}, 100);
		return () => clearInterval(interval);
	}, []);

	//
	// C. Render components

	return (
		<MantineProvider defaultColorScheme="auto" theme={themeData}>
			<DatesProvider settings={mantineDatesSettings}>
				<ModalsProvider>
					<EnvironmentContextProvider value={themeId}>
						{children}
					</EnvironmentContextProvider>
				</ModalsProvider>
			</DatesProvider>
		</MantineProvider>
	);

	//
}
