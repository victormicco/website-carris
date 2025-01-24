/* * */

import { StopsList } from '@/components/stops/StopsList';
import { Metadata } from 'next';

/* * */

export default function Page() {
	return (
		<StopsList />
	);
}

export const metadata: Metadata = {
	openGraph: {
		description: 'Paragens',
		title: 'CMetropolitana - Paragens',
	},
};
