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

	{
		_group: 'a',
		_id: 'test-01',
		colors: {
			primary: '#C61D23',
			text: '#FFFFFF',
		},
		content: {
			description: 'Este ano, seriam precisos 34 milhões de carros de 5 lugares para transportar os nossos passageiros.',
			lottie_src: '/images/review-2024/animations/test-01.json',
			number_legend: 'totals de passageiros transportados em 2024',
			number_source: 'https://www.cmet.pt',
			number_value: '172 549 659',
			title: 'Este ano fomos gigantes!',
		},
		header: {
			number: '170M',
			title: 'Passageiros',
		},
	},

	{
		_group: 'a',
		_id: 'test-02',
		colors: {
			primary: '#FBBA1A',
			text: '#000000',
		},
		content: {
			description: 'Se os passageiros destas linhas (4 383 681) dessem as mãos, conseguiam ir de Lisboa a Sintra mais de 200 vezes.',
			lottie_src: '',
			number_legend: 'Viagens',
			number_source: 'https://www.cmet.pt',
			number_value: '8 000 000',
			title: 'Teste Card 1',
		},
		header: {
			number: '8M',
			title: 'Viagens',
		},
	},

	{
		_group: 'a',
		_id: 'test-03',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			description: 'Se os passageiros destas linhas (4 383 681) dessem as mãos, conseguiam ir de Lisboa a Sintra mais de 200 vezes.',
			lottie_src: '',
			number_legend: 'Passageiros',
			number_source: 'https://www.cmet.pt',
			number_value: '4 383 681',
			title: 'Teste Card 1',
		},
		header: {
			number: '4x',
			title: 'Recordes',
		},
	},

];
