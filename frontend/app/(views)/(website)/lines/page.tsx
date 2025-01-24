/* * */

import { LinesList } from '@/components/lines/LinesList';
import { Metadata } from 'next';

/* * */

export default function Page() {
	return (
		<LinesList />
	);
}
export const metadata: Metadata = {
	openGraph: {
		description: 'Linhas',
		title: 'CMetropolitana - Linhas',
	},
};
