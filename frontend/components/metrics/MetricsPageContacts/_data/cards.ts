/* * */

export interface ContactMetrics2024CardSchema {
	_group: string
	_group_title?: string
	_id: string
	_type?: 'default' | 'lines' | 'terminals'
	colors: {
		border?: string
		primary: string
		text: string
	}
	content: {
		description?: string
		line_ids?: string[]
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

export const allCardsData: ContactMetrics2024CardSchema[] = [

	//
	// Group: "passageiros"

	{
		_group: 'passageiros',
		_id: 'pax_total',
		colors: {
			border: '#FFDD00',
			primary: '#FFDD00',
			text: '#000000B2',
		},
		content: {
			description: 'Em 2024, seriam precisos 34 milhões de carros de 5 lugares para transportar os nossos passageiros!',
			lottie_src: '/assets/review-2024/animations/passageiros/pax_total.json',
			number_legend: 'total de passageiros transportados em 2024',
			number_source: 'https://www.pordata.pt/pt/estatisticas/populacao',
			number_value: '174 015 385 (174 Milhões)',
			title: 'Este ano fomos gigantes!',
		},
		header: {
			number: '174M',
			title: 'Total de Participações na amL',
		},
	},

	{
		_group: 'passageiros',
		_id: 'pax_area_1',
		colors: {
			border: '#FFDD00',
			primary: '#FFFFFF',
			text: '#5A5A64',
		},
		content: {
			description: 'Em 2024, a Área 1 encheu mais de 1900 vezes o Estádio Nacional do Jamor!',
			lottie_src: '/assets/review-2024/animations/passageiros/pax_area_1.json',
			number_legend: 'total de passageiros transportados na Área 1 em 2024 (Amadora, Cascais, Lisboa, Oeiras e Sintra)',
			number_value: '59 098 165 (59 Milhões)',
			title: 'A Área 1 fez de 2024 um ano maior!',
		},
		header: {
			number: '59M',
			title: 'Total de Participações Área 1',
		},
	},

	{
		_group: 'passageiros',
		_id: 'pax_area_2',
		colors: {
			border: '#FFDD00',
			primary: '#FFFFFF',
			text: '#5A5A64',
		},
		content: {
			description: 'Em 2024, na Área 2 couberam todos os turistas que visitam Portugal por ano mais de duas vezes!',
			lottie_src: '/assets/review-2024/animations/passageiros/pax_area_2.json',
			number_legend: 'total de passageiros transportados na Área 2 em 2024 (Loures, Mafra,  Odivelas Vila Franca de Xira)',
			number_source: 'https://www.jornaldenegocios.pt/empresas/turismo---lazer/detalhe/portugal-recebeu-265-milhoes-de-turistas-em-2023-mais-19-face-a-2022',
			number_value: '58 292 739 (58.2 Milhões)',
			title: 'A Área 2 fez de 2024 um ano maior!',
		},
		header: {
			number: '58M',
			title: 'Total de Participações Área 2',
		},
	},

	{
		_group: 'passageiros',
		_id: 'pax_area_3',
		colors: {
			border: '#FFDD00',
			primary: '#FFFFFF',
			text: '#5A5A64',
		},
		content: {
			description: 'Em 2024, a Área 3 encheu mais de 850 vezes a ponte 25 de abril!',
			lottie_src: '/assets/review-2024/animations/passageiros/pax_area_3.json',
			number_legend: 'total de passageiros transportados na Área 3 em 2024 (Almada, Seixal e Sesimbra)',
			number_source: 'https://web.archive.org/web/20201203182555/http:/rpee.lnec.pt/Ficheiros/rpee_serieIII_n14/rpee_sIII_n14_pg05_18.pdf',
			number_value: '37 407 951 (37.4 Milhões)',
			title: 'A Área 3 fez de 2024 um ano maior!',
		},
		header: {
			number: '37M',
			title: 'Total de Participações Área 3',
		},
	},

	{
		_group: 'passageiros',
		_id: 'pax_area_4',
		colors: {
			border: '#FFDD00',
			primary: '#FFFFFF',
			text: '#5A5A64',
		},
		content: {
			description: 'Em 2024, na Área 4 transportámos toda a população estudantil portuguesa 11 vezes!',
			lottie_src: '/assets/review-2024/animations/passageiros/pax_area_4.json',
			number_legend: 'total de passageiros transportados na Área 4 em 2024 (Alcochete, Moita, Montijo, Palmela, Setúbal e Barreiro)',
			number_source: 'https://www.pordata.pt/pt/estatisticas/educacao/do-pre-escolar-ao-secundario/alunos-matriculados-do-pre-escolar-ao-secundario',
			number_value: '19 216 530 (19.2 Milhões)',
			title: 'A Área 4 fez de 2024 um ano maior!',
		},
		header: {
			number: '19M',
			title: 'Total de Participações Área 4',
		},
	},

];
