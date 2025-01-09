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
		_group: 'passageiros',
		_id: 'pax_total',
		colors: {
			primary: '#C61D23',
			text: '#FFFFFF',
		},
		content: {
			description: 'Em 2024, seriam precisos 34 milhões de carros de 5 lugares para transportar os nossos passageiros!',
			lottie_src: '/assets/review-2024/animations/passageiros/pax_total.json',
			number_legend: 'total de passageiros transportados em 2024',
			number_source: 'https://www.pordata.pt/pt/estatisticas/populacao',
			number_value: '174 015 385',
			title: 'Este ano fomos gigantes!',
		},
		header: {
			number: '174M',
			title: 'Passageiros',
		},
	},

	{
		_group: 'passageiros',
		_id: 'pax_area_1',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			description: 'Em 2024, a área 1 encheu mais de 1900 vezes o Estádio Nacional do Jamor!',
			lottie_src: '/assets/review-2024/animations/passageiros/pax_area_1.json',
			number_legend: 'total de passageiros transportados na área 1 em 2024 (Amadora, Cascais, Lisboa, Oeiras e Sintra)',
			number_value: '59 098 165',
			title: 'A área 1 fez de 2024 um ano maior!',
		},
		header: {
			number: '58M',
			title: 'Passageiros Área 1',
		},
	},

	{
		_group: 'passageiros',
		_id: 'pax_area_2',
		colors: {
			primary: '#FBBA1A',
			text: '#000000',
		},
		content: {
			description: 'Em 2024, na área 2 couberam todos os turistas que visitam Portugal por ano mais de duas vezes!',
			lottie_src: '/assets/review-2024/animations/passageiros/pax_area_2.json',
			number_legend: 'total de passageiros transportados na área 2 em 2024 (Loures, Mafra,  Odivelas Vila Franca de Xira)',
			number_source: 'https://www.jornaldenegocios.pt/empresas/turismo---lazer/detalhe/portugal-recebeu-265-milhoes-de-turistas-em-2023-mais-19-face-a-2022',
			number_value: '58 292 739',
			title: 'A área 2 fez de 2024 um ano maior!',
		},
		header: {
			number: '57M',
			title: 'Passageiros Área 2',
		},
	},

	{
		_group: 'passageiros',
		_id: 'pax_area_3',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			description: 'Em 2024, a área 3 encheu mais de 850 vezes a ponte 25 de abril!',
			lottie_src: '/assets/review-2024/animations/passageiros/pax_area_3.json',
			number_legend: 'total de passageiros transportados na área 3 em 2024 (Almada, Seixal e Sesimbra)',
			number_source: 'https://web.archive.org/web/20201203182555/http:/rpee.lnec.pt/Ficheiros/rpee_serieIII_n14/rpee_sIII_n14_pg05_18.pdf',
			number_value: '37 407 951',
			title: 'A área 3 fez de 2024 um ano maior!',
		},
		header: {
			number: '37M',
			title: 'Passageiros Área 3',
		},
	},

	{
		_group: 'passageiros',
		_id: 'pax_area_4',
		colors: {
			primary: '#FBBA1A',
			text: '#000000',
		},
		content: {
			description: 'Em 2024, na área 4 transportámos toda a população estudantil portuguesa 11 vezes!',
			lottie_src: '/assets/review-2024/animations/passageiros/pax_area_4.json',
			number_legend: 'total de passageiros transportados na área 4 em 2024 (Alcochete, Moita, Montijo, Palmela, Setúbal e Barreiro)',
			number_source: 'https://www.pordata.pt/pt/estatisticas/educacao/do-pre-escolar-ao-secundario/alunos-matriculados-do-pre-escolar-ao-secundario',
			number_value: '19 216 530',
			title: 'A área 4 fez de 2024 um ano maior!',
		},
		header: {
			number: '19M',
			title: 'Passageiros Área 4',
		},
	},

	{
		_group: 'passageiros',
		_id: 'pax_bridges',
		colors: {
			primary: '#3D85C6',
			text: '#FFFFFF',
		},
		content: {
			description: 'Este ano, eram precisas 36 pontes vasco da gama e 186 para caberem todos estes passageiros ao mesmo tempo!',
			lottie_src: '/assets/review-2024/animations/passageiros/pax_bridges.json',
			number_legend: 'total de passageiros transportados sobre o tejo em 2024 (Ponte 25 de abril e Ponte Vasco da Gama)',
			number_source: 'https://web.archive.org/web/20170112103807/http:/www.lusoponte.pt/pvg_projecto_estatisticas.htm',
			number_value: '8 000 000',
			title: 'Em 2024, fizémos pontes entre todos / entre a amL.',
		},
		header: {
			number: '8M',
			title: 'Pontes',
		},
	},

	{
		_group: 'passageiros',
		_id: 'pips_total',
		colors: {
			primary: '#BB3E96',
			text: '#FFFFFF',
		},
		content: {
			description: 'Este ano, 27% das nossas paragens já tinham PIPs!',
			lottie_src: '/assets/review-2024/animations/passageiros/pips_total.json',
			number_legend: 'total de passageiros transportados sobre o tejo em 2024 (Ponte 25 de abril e Ponte Vasco da Gama)',
			number_value: '470',
			title: 'total de painéis de informação ao público (PIPs) disponíveis em 2024 (Interiores e Exteriores)',
		},
		header: {
			number: '470',
			title: 'PIPs',
		},
	},

	{
		_group: 'passageiros',
		_id: 'kms_total',
		colors: {
			primary: '#0C807E',
			text: '#FFFFFF',
		},
		content: {
			description: 'Em 2024 fizemos Portugal de Norte a Sul 400 vezes por dia!',
			lottie_src: '/assets/review-2024/animations/passageiros/kms_total.json',
			number_legend: 'total de quilómetros percorridos em 2024',
			number_value: '300 000',
			title: 'Em 2024, fomos muito longe.',
		},
		header: {
			number: '300K',
			title: 'Passageiros',
		},
	},

	{
		_group: 'tops',
		_id: 'tops_lines_area_1',
		colors: {
			primary: '#C61D23',
			text: '#FFFFFF',
		},
		content: {
			description: 'Se os passageiros destas linhas (5 519 192) dessem as mãos, conseguiam ir de Lisboa a Sintra mais de 250 vezes.',
			lottie_src: '/assets/review-2024/animations/passageiros/kms_total.json',
			number_legend: 'linhas com mais passageiros transportados na área 1 (Amadora, Cascais, Lisboa, Oeiras, Sintra)',
			number_value: '1715|1709|1703',
			title: 'Todas as nossas linhas importam, mas 3 destacaram-se!',
		},
		header: {
			number: '1715',
			title: 'Top Linhas área 1',
		},
	},

	{
		_group: 'tops',
		_id: 'tops_lines_area_2',
		colors: {
			primary: '#C61D23',
			text: '#FFFFFF',
		},
		content: {
			description: 'Os passageiros destas linhas (6 258 565) caberiam de mãos dadas na largura da foz do Tejo em Lisboa mais de 700 vezes.',
			lottie_src: '/assets/review-2024/animations/passageiros/kms_total.json',
			number_legend: 'linhas com mais passageiros transportados na área 1 (Loures, Mafra, Odivelas, Vila Franca de Xira)',
			number_value: '2769|2711|2730',
			title: 'Todas as nossas linhas importam, mas 3 destacaram-se!',
		},
		header: {
			number: '2769',
			title: 'Top Linhas área 2',
		},
	},

	{
		_group: 'tops',
		_id: 'tops_lines_area_3',
		colors: {
			primary: '#C61D23',
			text: '#FFFFFF',
		},
		content: {
			description: 'Os passageiros destas linhas (4 590 671) conseguiriam dar as mãos pela largura das praias da Costa da Caparica mais de 250 vezes.',
			lottie_src: '/assets/review-2024/animations/passageiros/kms_total.json',
			number_legend: 'linhas com mais passageiros transportados na área 3 (Almada, Seixal e Sesimbra)',
			number_value: '3508|3022|3013',
			title: 'Todas as nossas linhas importam, mas 3 destacaram-se!',
		},
		header: {
			number: '3508',
			title: 'Top Linhas área 3',
		},
	},

	{
		_group: 'tops',
		_id: 'tops_lines_area_4',
		colors: {
			primary: '#C61D23',
			text: '#FFFFFF',
		},
		content: {
			description: 'Os passageiros destas linhas (4 597 469), conseguiriam dar as mãos pelo comprimento do rio Sado mais de 360 vezes.',
			lottie_src: '/assets/review-2024/animations/passageiros/kms_total.json',
			number_legend: 'linhas com mais passageiros transportados na área 4 (Alcochete, Barreiro, Moita, Montijo, Palmela, Setúbal)',
			number_value: '4600|4701|4512',
			title: 'Todas as nossas linhas importam, mas 3 destacaram-se!',
		},
		header: {
			number: '4600',
			title: 'Top Linhas área 4',
		},
	},

	{
		_group: 'tops',
		_id: 'lines_growth',
		colors: {
			primary: '#F0F0F0',
			text: '#FFFFFF',
		},
		content: {
			description: 'Os passageiros destas linhas (4 597 469), conseguiriam dar as mãos pelo comprimento do rio Sado mais de 360 vezes.',
			lottie_src: '/assets/review-2024/animations/passageiros/kms_total.json',
			number_legend: 'linhas com maior taxa de crescimento entre janeiro e dezembro de 2024',
			number_value: '"2711|4600|4701',
			title: 'Crescem depressa!',
		},
		header: {
			number: '2711',
			title: 'Crescimento Linhas',
		},
	},

];
