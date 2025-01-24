/* * */

import { Review2024Page } from '@/components/review-2024/Review2024Page';
import { Metadata } from 'next';

/* * */

export default function Page() {
	return <Review2024Page />;
}

export const metadata: Metadata = {
	openGraph: {
		description: 'Viagens 2024',
		title: 'CMetropolitana - Viagens 2024',
	},
};
