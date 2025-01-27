/* * */

import { NewsDetail } from '@/components/news/NewsDetail';

/* * */

export async function generateMetadata({ params }) {
	const data = await params;
	try {
		const id = await data.news_id;
		const newsData = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/news/${id}`).then(res => res.json());

		return {
			description: newsData.title,
			openGraph: {
				description: newsData.title,
				title: newsData.title,
			},
			title: newsData.title,
		};
	}
	catch (error) {
		console.error('There was an error loading the page metadata: ', error);
		return {
			description: 'Notícias',
			openGraph: {
				description: 'Notícias',
				title: 'CMetropolitana - Notícias',
			},
			title: 'Notícias',
		};
	}
}

export default async function Page({ params }) {
	const { news_id } = await params;
	return <NewsDetail newsId={news_id} />;
}
