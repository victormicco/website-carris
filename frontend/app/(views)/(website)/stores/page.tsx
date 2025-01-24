/* * */

import StoresList from '@/components/stores/StoresList';
import { Metadata } from 'next';

/* * */

export default function Page() {
	return (
		<StoresList />
	);
}

export const metadata: Metadata = {
	openGraph: {
		description: 'Lojas e Rede de Agentes',
		title: 'CMetropolitana - Lojas',
	},
};
