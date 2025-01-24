/* * */

import { NewsList } from '@/components/news/NewsList';
import { Metadata } from 'next';

/* * */

export default function Page() {
	return <NewsList />;
}
export const metadata: Metadata = {
	openGraph: {
		description: 'Notícias',
		title: 'CMetropolitana - Notícias',
	},
};
