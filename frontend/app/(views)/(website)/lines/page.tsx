/* * */

import { LinesList } from '@/components/lines/LinesList';
import { Metadata } from 'next';

/* * */

export const metadata: Metadata = {
	description: 'Descubra as linhas de autocarro da CMetropolitana.',
	title: 'CMetropolitana | Linhas',
};

/* * */

export default function Page() {
	return <LinesList />;
}