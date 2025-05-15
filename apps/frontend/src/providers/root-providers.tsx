'use client';

/* * */

import { AnalyticsContextProvider } from '@/contexts/Analytics.context';
import { ConsentContextProvider } from '@/contexts/Consent.context';
import { LocaleContextProvider } from '@/contexts/Locale.context';
import { Suspense } from 'react';

/* * */

export function RootProviders({ children }) {
	return (
		<Suspense>
			<LocaleContextProvider>
				<ConsentContextProvider>
					<AnalyticsContextProvider>
						{children}
					</AnalyticsContextProvider>
				</ConsentContextProvider>
			</LocaleContextProvider>
		</Suspense>
	);
}
