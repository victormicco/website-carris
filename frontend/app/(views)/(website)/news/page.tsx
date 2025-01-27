/* * */

import { NewsList } from '@/components/news/NewsList';
import { Metadata } from 'next';

/* * */

export const metadata: Metadata = {
	description: 'Todas as noticias da carris metropolitana',
	title: 'CMetropolitana - Notícias',
};

/* * */

export default function Page() {
	return <NewsList />;
}