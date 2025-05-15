/* * */

import { OpenGraphNewsDefault } from '@/opengraph/OpenGraphNewsDefault';
import { OpenGraphNewsDynamic } from '@/opengraph/OpenGraphNewsDynamic';
import fs from 'fs';
import { ImageResponse } from 'next/og';

/* * */

export default async function Image({ params }) {
	//

	//
	// A. Fetch data

	const newsResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/news/${params.news_id}`);
	const newsData = await newsResponse.json();

	//
	// B. Render components

	if (!newsData) {
		return new ImageResponse(
			<OpenGraphNewsDefault />,
			{
				fonts: [
					{ data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-Medium.ttf`).buffer as ArrayBuffer, name: 'Inter', style: 'normal', weight: 500 },
					{ data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-SemiBold.ttf`).buffer as ArrayBuffer, name: 'Inter', style: 'normal', weight: 600 },
					{ data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-Bold.ttf`).buffer as ArrayBuffer, name: 'Inter', style: 'normal', weight: 700 },
				],
				height: 630,
				width: 1200,
			},
		);
	}

	return new ImageResponse(
		<OpenGraphNewsDynamic
			coverImageSrc={newsData.cover_image_src}
			title={newsData.title}
		/>,
		{
			fonts: [
				{ data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-Medium.ttf`).buffer as ArrayBuffer, name: 'Inter', style: 'normal', weight: 500 },
				{ data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-SemiBold.ttf`).buffer as ArrayBuffer, name: 'Inter', style: 'normal', weight: 600 },
				{ data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-Bold.ttf`).buffer as ArrayBuffer, name: 'Inter', style: 'normal', weight: 700 },
			],
			height: 630,
			width: 1200,
		},
	);

	//
}
