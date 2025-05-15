/* * */

import { type NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

/* * */

const nextConfig: NextConfig = {
	output: 'standalone',
	reactStrictMode: true,
	async redirects() {
		return [
			//

			/* * */
			/* SCHEDULES */

			{ destination: '/lines', permanent: true, source: '/linhas' },
			{ destination: '/lines', permanent: true, source: '/horarios' },

			{ destination: '/stops', permanent: true, source: '/paragens' },

			{ destination: '/planner', permanent: true, source: '/planeador' },
			{ destination: '/planner', permanent: true, source: '/planear-viagem' },

			{ destination: '/alerts', permanent: true, source: '/alertas' },
			{ destination: '/alerts', permanent: true, source: '/avisos' },

			/* * */
			/* FARES */

			{ destination: '/tickets', permanent: true, source: '/tarifarios' },
			{ destination: '/tickets', permanent: true, source: '/bilhetes' },

			{ destination: '/cards', permanent: true, source: '/cartoes' },
			{ destination: '/cards', permanent: true, source: '/passes' },

			{ destination: '/helpdesks', permanent: true, source: '/comprar' },
			{ destination: '/helpdesks', permanent: true, source: '/onde-comprar' },

			/* * */
			/* SUPPORT */

			{ destination: '/faq', permanent: true, source: '/perguntas' },
			{ destination: '/faq', permanent: true, source: '/perguntas-frequentes' },

			{ destination: '/lost-and-found', permanent: true, source: '/perdidos-e-achados' },

			{ destination: '/stores', permanent: true, source: '/encm' },
			{ destination: '/stores', permanent: true, source: '/lojas' },
			{ destination: '/stores', permanent: true, source: '/espacos-navegante' },

			{ destination: '/contacts', permanent: true, source: '/contactos' },
			{ destination: '/contacts', permanent: true, source: '/apoio' },

			/* * */
			/* MORE */

			{ destination: '/news', permanent: true, source: '/noticias' },

			{ destination: '/metrics', permanent: true, source: '/metricas' },

			{ destination: '/open-data', permanent: true, source: '/opendata' },
			{ destination: '/open-data', permanent: true, source: '/dados-abertos' },

			{ destination: '/about', permanent: true, source: '/sobre' },

			{ destination: '/vehicles', permanent: true, source: '/veiculos' },
			{ destination: '/vehicles', permanent: true, source: '/frota' },

			/* * */
			/* UNLISTED */

			{ destination: '/survey', permanent: true, source: '/inquerito' },

			{ destination: '/viagem-2024', permanent: true, source: '/viagem2024' },

			/* * */
			/* LEGACY */

			{ destination: 'https://backoffice.carrismetropolitana.pt/imprensa', permanent: false, source: '/imprensa' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/embreveform', permanent: false, source: '/embreveform' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/knowledgebase', permanent: false, source: '/knowledgebase' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/viagemvirtual', permanent: false, source: '/viagemvirtual' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/participe', permanent: false, source: '/participe' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/motoristas', permanent: false, source: '/drivers' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/motoristas', permanent: false, source: '/motoristas' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/motoristas', permanent: false, source: '/recrutamento' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/novobanco', permanent: false, source: '/novobanco' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/mini-passageiros', permanent: false, source: '/mini-passageiros' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/praias-area1', permanent: false, source: '/praias-area1' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/praias-area2', permanent: false, source: '/praias-area2' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/praias-area3', permanent: false, source: '/praias-area3' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/praias-area4', permanent: false, source: '/praias-area4' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/freeport-pt', permanent: false, source: '/freeport-pt' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/freeport-en', permanent: false, source: '/freeport-en' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/notasdeimprensa', permanent: false, source: '/notasdeimprensa' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/wtclisboa', permanent: false, source: '/wtclisboa' },
			{ destination: 'https://backoffice.carrismetropolitana.pt/taguspark', permanent: false, source: '/taguspark' },

		];
	},
};

/* * */

export default createNextIntlPlugin()(nextConfig);
