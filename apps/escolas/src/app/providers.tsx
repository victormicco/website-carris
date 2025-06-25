'use client';

import { MantineProvider } from '@mantine/core';
import { MapProvider } from 'react-map-gl/maplibre';
import { SWRConfig } from 'swr';

export default function Providers({ children }: { children: React.ReactNode }) {
	//

	// Use SWR
	const swrOptions = {
		fetcher: async (...args: [RequestInfo, RequestInit?]) => {
			const res = await fetch(...args);
			if (!res.ok) {
				const errorDetails = await res.json();
				const error = new Error(errorDetails.message || 'An error occurred while fetching data.') as Error & { description?: string, status?: number };
				error.description = errorDetails.description || 'No additional information was provided by the API.';
				error.status = res.status;
				throw error;
			}
			return res.json();
		},
		refreshInterval: 30000,
	};

	return (
		<SWRConfig value={swrOptions}>
			<MantineProvider>
				<MapProvider>{children}</MapProvider>
			</MantineProvider>
		</SWRConfig>
	);

	//
}
