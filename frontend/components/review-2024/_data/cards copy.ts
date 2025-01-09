/* * */

export interface Review2024CardSchema {
	_group: string
	_id: string
	colors: {
		border?: string
		primary: string
		text: string
	}
	content: {
		description?: string
		lottie_src?: string
		number_legend: string
		number_source?: string
		number_value: string
		title?: string
	}
	header: {
		number: string
		title: string
	}
}

/* * */

export const allCardsData: Review2024CardSchema[] = [

	//
	// Group: "digital"

	{
		_group: 'digital',
		_id: 'followers_total',
		colors: {
			primary: '#3D85C6',
			text: '#FFFFFF',
		},
		content: {
			description: 'Seria preciso um prédio de 966 andares, com 3 frações por piso, para que toda a nossa comunidade vivesse junta.',
			lottie_src: '/assets/review-2024/animations/municipios/municipio_lines.json',
			number_legend: 'total de seguidores novos na nossa comunidade digital',
			number_value: '6 762',
			title: 'Este ano, andámos ligados!',
		},
		header: {
			number: '6K',
			title: 'Seguidores',
		},
	},

	{
		_group: 'digital',
		_id: 'news_total',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			description: 'Este ano, publicámos uma notícia a cada 6 dias.',
			lottie_src: '/assets/review-2024/animations/municipios/municipio_lines.json',
			number_legend: 'total de notícias publicadas pela Carris Metropolitana em 2024',
			number_value: '64',
			title: 'Em 2024, contámos tudo!',
		},
		header: {
			number: '64',
			title: 'Notícias',
		},
	},

	{
		_group: 'digital',
		_id: 'realtime_daily',
		colors: {
			border: '#00CD32',
			primary: '#FFFFFF',
			text: '#00CD32',
		},
		content: {
			description: 'Este ano, guardámos 3 milhões de eventos por dia enviados pelos nossos autocarro, a notificar a sua localização.',
			lottie_src: '/assets/review-2024/animations/municipios/municipio_lines.json',
			number_legend: 'eventos recibidos em real time, por dia',
			number_value: '3 000 000',
			title: 'Este ano, sabemos por onde andámos!',
		},
		header: {
			number: '3M',
			title: 'Eventos Tempo Real',
		},
	},

	{
		_group: 'digital',
		_id: 'app_total',
		colors: {
			primary: '#C61D23',
			text: '#FFFFFF',
		},
		content: {
			description: 'Seriam precisos 345 autocarros standard para caberem 90 mil telemóveis.',
			lottie_src: '/assets/review-2024/animations/municipios/municipio_lines.json',
			number_legend: 'utilizadores totais da aplicação Carris Metropolitana',
			number_value: '90 000',
			title: '2024 foi o ano de viajar no bolso dos passageiros!',
		},
		header: {
			number: '90K',
			title: 'Aplicação',
		},
	},

	{
		_group: 'digital',
		_id: 'website_daily',
		colors: {
			primary: '#F5A000',
			text: '#000000',
		},
		content: {
			description: 'Uma pessoa teria que verificar o telemóvel 137 vezes por dia durante um ano inteiro para atingir as 50 mil visitas que recebemos diariamente no site!',
			lottie_src: '/assets/review-2024/animations/municipios/municipio_lines.json',
			number_legend: 'visitantes diários ao nosso website',
			number_value: '50 000',
			title: 'Este ano estivemos sempre à distância de um clique!',
		},
		header: {
			number: '50K',
			title: 'Website',
		},
	},

];
