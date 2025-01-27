/* * */

import { StopsList } from '@/components/stops/StopsList';
import { Metadata } from 'next';

/* * */

export const metadata: Metadata = {
	description: 'Descubra as paragens de autocarro da CMetropolitana.',
	title: 'CMetropolitana | Paragens',
};

/* * */

export default function Page() {
	return <StopsList />;
}
