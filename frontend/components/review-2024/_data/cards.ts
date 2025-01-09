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
	// Group: "passageiros"

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
			title: 'Quilómetros',
		},
	},

	//
	// Group: "tops"

	{
		_group: 'tops',
		_id: 'tops_lines_area_1',
		colors: {
			primary: '#C61D23',
			text: '#FFFFFF',
		},
		content: {
			description: 'Se os passageiros destas linhas (5 519 192) dessem as mãos, conseguiam ir de Lisboa a Sintra mais de 250 vezes.',
			lottie_src: '/assets/review-2024/animations/tops/tops_lines_area_1.json',
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
			lottie_src: '/assets/review-2024/animations/tops/tops_lines_area_2.json',
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
			lottie_src: '/assets/review-2024/animations/tops/tops_lines_area_3.json',
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
			lottie_src: '/assets/review-2024/animations/tops/tops_lines_area_4.json',
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
			text: '#5A5A64',
		},
		content: {
			description: 'Os passageiros destas linhas (4 597 469), conseguiriam dar as mãos pelo comprimento do rio Sado mais de 360 vezes.',
			lottie_src: '/assets/review-2024/animations/tops/lines_growth.json',
			number_legend: 'linhas com maior taxa de crescimento entre janeiro e dezembro de 2024',
			number_value: '2711|4600|4701',
			title: 'Crescem depressa!',
		},
		header: {
			number: '2711',
			title: 'Crescimento Linhas',
		},
	},

	//
	// Group: "recordes"

	{
		_group: 'recordes',
		_id: 'recordes_month',
		colors: {
			primary: '#C61D23',
			text: '#FFFFFF',
		},
		content: {
			description: 'Em outubro, foi como se toda a população de Portugal entrasse num autocarro mais de 1,5 vezes no mesmo mês!',
			lottie_src: '/assets/review-2024/animations/recordes/recordes_month.json',
			number_legend: 'total de passageiros transportados num mês (outubro de 2024)',
			number_value: '17 060 039',
			title: 'Um mês que valeu por mil!',
		},
		header: {
			number: '17M',
			title: 'Mês',
		},
	},

	{
		_group: 'recordes',
		_id: 'recordes_day_du',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			description: 'Num dia de 2024, conseguíamos encher o Estádio da Luz mais de 10 vezes!',
			lottie_src: '/assets/review-2024/animations/recordes/recordes_day_du.json',
			number_legend: 'total de passageiros transportados num dia útil (10 de outubro de 2024)',
			number_value: '688 019',
			title: 'O melhor dia de todos!',
		},
		header: {
			number: '688K',
			title: 'Dia Útil',
		},
	},

	{
		_group: 'recordes',
		_id: 'recordes_day_sab',
		colors: {
			primary: '#FBBA1A',
			text: '#000000',
		},
		content: {
			description: 'Se 305 mil pessoas dessem as mãos, conseguiriam chegar de Mafra a Setúbal e voltar.',
			lottie_src: '/assets/review-2024/animations/recordes/recordes_day_sab.json',
			number_legend: 'total de passageiros transportados num sábado (14 de setembro de 2024)',
			number_value: '305 063',
			title: 'Aos fins de semana também conta!',
		},
		header: {
			number: '305K',
			title: 'Sábado',
		},
	},

	{
		_group: 'recordes',
		_id: 'recordes_day_dom',
		colors: {
			primary: '#3D85C6',
			text: '#FFFFFF',
		},
		content: {
			description: 'Num domingo, transportámos mais de  quatro plateias do passeio marítimo de Algés!',
			lottie_src: '/assets/review-2024/animations/recordes/recordes_day_dom.json',
			number_legend: 'total de passageiros transportados num domingo (15 de agosto de 2024)',
			number_value: '274 416',
			title: 'A Cmetropolitana não tira férias!',
		},
		header: {
			number: '274K',
			title: 'Domingo/Feriado',
		},
	},

	//
	// Group: "municipio_growth_area_1"

	{
		_group: 'municipio_growth_area_1',
		_id: 'municipio_growth_a1_01',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_growth.json',
			number_legend: 'Aumento de procura face a janeiro de 2024',
			number_value: 'YY%',
			title: 'Em Amadora não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Amadora',
		},
	},

	{
		_group: 'municipio_growth_area_1',
		_id: 'municipio_growth_a1_02',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_growth.json',
			number_legend: 'Aumento de procura face a janeiro de 2024',
			number_value: 'YY%',
			title: 'Em Cascais não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Cascais',
		},
	},

	{
		_group: 'municipio_growth_area_1',
		_id: 'municipio_growth_a1_03',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_growth.json',
			number_legend: 'Aumento de procura face a janeiro de 2024',
			number_value: 'YY%',
			title: 'Em Lisboa não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Lisboa',
		},
	},

	{
		_group: 'municipio_growth_area_1',
		_id: 'municipio_growth_a1_04',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_growth.json',
			number_legend: 'Aumento de procura face a janeiro de 2024',
			number_value: 'YY%',
			title: 'Em Oeiras não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Oeiras',
		},
	},

	{
		_group: 'municipio_growth_area_1',
		_id: 'municipio_growth_a1_05',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_growth.json',
			number_legend: 'Aumento de procura face a janeiro de 2024',
			number_value: 'YY%',
			title: 'Em Sintra não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Sintra',
		},
	},

	//
	// Group: "municipio_growth_area_2"

	{
		_group: 'municipio_growth_area_2',
		_id: 'municipio_growth_a2_01',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_growth.json',
			number_legend: 'Aumento de procura face a janeiro de 2024',
			number_value: 'YY%',
			title: 'Em Loures não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Loures',
		},
	},

	{
		_group: 'municipio_growth_area_2',
		_id: 'municipio_growth_a2_02',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_growth.json',
			number_legend: 'Aumento de procura face a janeiro de 2024',
			number_value: 'YY%',
			title: 'Em Mafra não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Mafra',
		},
	},

	{
		_group: 'municipio_growth_area_2',
		_id: 'municipio_growth_a2_03',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_growth.json',
			number_legend: 'Aumento de procura face a janeiro de 2024',
			number_value: 'YY%',
			title: 'Em Odivelas não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Odivelas',
		},
	},

	{
		_group: 'municipio_growth_area_2',
		_id: 'municipio_growth_a2_04',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_growth.json',
			number_legend: 'Aumento de procura face a janeiro de 2024',
			number_value: 'YY%',
			title: 'Em Vila Franca de Xira não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Vila Franca de Xira',
		},
	},

	//
	// Group: "municipio_growth_area_3"

	{
		_group: 'municipio_growth_area_3',
		_id: 'municipio_growth_a3_01',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_growth.json',
			number_legend: 'Aumento de procura face a janeiro de 2024',
			number_value: 'YY%',
			title: 'Em Almada não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Almada',
		},
	},

	{
		_group: 'municipio_growth_area_3',
		_id: 'municipio_growth_a3_02',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_growth.json',
			number_legend: 'Aumento de procura face a janeiro de 2024',
			number_value: 'YY%',
			title: 'Em Seixal não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Seixal',
		},
	},

	{
		_group: 'municipio_growth_area_3',
		_id: 'municipio_growth_a3_03',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_growth.json',
			number_legend: 'Aumento de procura face a janeiro de 2024',
			number_value: 'YY%',
			title: 'Em Sesimbra não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Sesimbra',
		},
	},

	//
	// Group: "municipio_growth_area_4"

	{
		_group: 'municipio_growth_area_4',
		_id: 'municipio_growth_a4_01',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_growth.json',
			number_legend: 'Aumento de procura face a janeiro de 2024',
			number_value: 'YY%',
			title: 'Em Alcochete não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Alcochete',
		},
	},

	{
		_group: 'municipio_growth_area_4',
		_id: 'municipio_growth_a4_02',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_growth.json',
			number_legend: 'Aumento de procura face a janeiro de 2024',
			number_value: 'YY%',
			title: 'Em Barreiro não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Barreiro',
		},
	},

	{
		_group: 'municipio_growth_area_4',
		_id: 'municipio_growth_a4_03',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_growth.json',
			number_legend: 'Aumento de procura face a janeiro de 2024',
			number_value: 'YY%',
			title: 'Em Moita não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Moita',
		},
	},

	{
		_group: 'municipio_growth_area_4',
		_id: 'municipio_growth_a4_04',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_growth.json',
			number_legend: 'Aumento de procura face a janeiro de 2024',
			number_value: 'YY%',
			title: 'Em Montijo não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Montijo',
		},
	},

	{
		_group: 'municipio_growth_area_4',
		_id: 'municipio_growth_a4_05',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_growth.json',
			number_legend: 'Aumento de procura face a janeiro de 2024',
			number_value: 'YY%',
			title: 'Em Palmela não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Palmela',
		},
	},

	{
		_group: 'municipio_growth_area_4',
		_id: 'municipio_growth_a4_06',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_growth.json',
			number_legend: 'Aumento de procura face a janeiro de 2024',
			number_value: 'YY%',
			title: 'Em Setúbal não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Setúbal',
		},
	},

	//
	// Group: "municipio_pax_area_1"

	{
		_group: 'municipio_pax_area_1',
		_id: 'municipio_pax_a1_01',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_pax.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em Amadora não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Amadora',
		},
	},

	{
		_group: 'municipio_pax_area_1',
		_id: 'municipio_pax_a1_02',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_pax.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em Cascais não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Cascais',
		},
	},

	{
		_group: 'municipio_pax_area_1',
		_id: 'municipio_pax_a1_03',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_pax.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em Lisboa não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Lisboa',
		},
	},

	{
		_group: 'municipio_pax_area_1',
		_id: 'municipio_pax_a1_04',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_pax.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em Oeiras não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Oeiras',
		},
	},

	{
		_group: 'municipio_pax_area_1',
		_id: 'municipio_pax_a1_05',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_pax.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em Sintra não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Sintra',
		},
	},

	//
	// Group: "municipio_pax_area_2"

	{
		_group: 'municipio_pax_area_2',
		_id: 'municipio_pax_a2_01',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_pax.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em Loures não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Loures',
		},
	},

	{
		_group: 'municipio_pax_area_2',
		_id: 'municipio_pax_a2_02',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_pax.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em Mafra não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Mafra',
		},
	},

	{
		_group: 'municipio_pax_area_2',
		_id: 'municipio_pax_a2_03',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_pax.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em Odivelas não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Odivelas',
		},
	},

	{
		_group: 'municipio_pax_area_2',
		_id: 'municipio_pax_a2_04',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_pax.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em Vila Franca de Xira não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Vila Franca de Xira',
		},
	},

	//
	// Group: "municipio_pax_area_3"

	{
		_group: 'municipio_pax_area_3',
		_id: 'municipio_pax_a3_01',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_pax.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em Almada não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Almada',
		},
	},

	{
		_group: 'municipio_pax_area_3',
		_id: 'municipio_pax_a3_02',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_pax.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em Seixal não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Seixal',
		},
	},

	{
		_group: 'municipio_pax_area_3',
		_id: 'municipio_pax_a3_03',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_pax.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em Sesimbra não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Sesimbra',
		},
	},

	//
	// Group: "municipio_pax_area_4"

	{
		_group: 'municipio_pax_area_4',
		_id: 'municipio_pax_a4_01',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_pax.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em Alcochete não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Alcochete',
		},
	},

	{
		_group: 'municipio_pax_area_4',
		_id: 'municipio_pax_a4_02',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_pax.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em Barreiro não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Barreiro',
		},
	},

	{
		_group: 'municipio_pax_area_4',
		_id: 'municipio_pax_a4_03',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_pax.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em Moita não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Moita',
		},
	},

	{
		_group: 'municipio_pax_area_4',
		_id: 'municipio_pax_a4_04',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_pax.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em Montijo não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Montijo',
		},
	},

	{
		_group: 'municipio_pax_area_4',
		_id: 'municipio_pax_a4_05',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_pax.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em Palmela não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Palmela',
		},
	},

	{
		_group: 'municipio_pax_area_4',
		_id: 'municipio_pax_a4_06',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_pax.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em Setúbal não parámos de crescer!',
		},
		header: {
			number: 'YY%',
			title: 'Setúbal',
		},
	},

	//
	// Group: "municipio_terminals_area_1"

	{
		_group: 'municipio_terminals_area_1',
		_id: 'municipio_terminals_a1_01',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_terminals.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em 2024, tivemos alguns pontos de encontro favoritos!',
		},
		header: {
			number: 'YY%',
			title: 'Amadora',
		},
	},

	{
		_group: 'municipio_terminals_area_1',
		_id: 'municipio_terminals_a1_02',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_terminals.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em 2024, tivemos alguns pontos de encontro favoritos!',
		},
		header: {
			number: 'YY%',
			title: 'Cascais',
		},
	},

	{
		_group: 'municipio_terminals_area_1',
		_id: 'municipio_terminals_a1_03',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_terminals.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em 2024, tivemos alguns pontos de encontro favoritos!',
		},
		header: {
			number: 'YY%',
			title: 'Lisboa',
		},
	},

	{
		_group: 'municipio_terminals_area_1',
		_id: 'municipio_terminals_a1_04',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_terminals.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em 2024, tivemos alguns pontos de encontro favoritos!',
		},
		header: {
			number: 'YY%',
			title: 'Oeiras',
		},
	},

	{
		_group: 'municipio_terminals_area_1',
		_id: 'municipio_terminals_a1_05',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_terminals.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em 2024, tivemos alguns pontos de encontro favoritos!',
		},
		header: {
			number: 'YY%',
			title: 'Sintra',
		},
	},

	//
	// Group: "municipio_terminals_area_2"

	{
		_group: 'municipio_terminals_area_2',
		_id: 'municipio_terminals_a2_01',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_terminals.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em 2024, tivemos alguns pontos de encontro favoritos!',
		},
		header: {
			number: 'YY%',
			title: 'Loures',
		},
	},

	{
		_group: 'municipio_terminals_area_2',
		_id: 'municipio_terminals_a2_02',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_terminals.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em 2024, tivemos alguns pontos de encontro favoritos!',
		},
		header: {
			number: 'YY%',
			title: 'Mafra',
		},
	},

	{
		_group: 'municipio_terminals_area_2',
		_id: 'municipio_terminals_a2_03',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_terminals.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em 2024, tivemos alguns pontos de encontro favoritos!',
		},
		header: {
			number: 'YY%',
			title: 'Odivelas',
		},
	},

	{
		_group: 'municipio_terminals_area_2',
		_id: 'municipio_terminals_a2_04',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_terminals.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em 2024, tivemos alguns pontos de encontro favoritos!',
		},
		header: {
			number: 'YY%',
			title: 'Vila Franca de Xira',
		},
	},

	//
	// Group: "municipio_terminals_area_3"

	{
		_group: 'municipio_terminals_area_3',
		_id: 'municipio_terminals_a3_01',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_terminals.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em 2024, tivemos alguns pontos de encontro favoritos!',
		},
		header: {
			number: 'YY%',
			title: 'Almada',
		},
	},

	{
		_group: 'municipio_terminals_area_3',
		_id: 'municipio_terminals_a3_02',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_terminals.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em 2024, tivemos alguns pontos de encontro favoritos!',
		},
		header: {
			number: 'YY%',
			title: 'Seixal',
		},
	},

	{
		_group: 'municipio_terminals_area_3',
		_id: 'municipio_terminals_a3_03',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_terminals.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em 2024, tivemos alguns pontos de encontro favoritos!',
		},
		header: {
			number: 'YY%',
			title: 'Sesimbra',
		},
	},

	//
	// Group: "municipio_terminals_area_4"

	{
		_group: 'municipio_terminals_area_4',
		_id: 'municipio_terminals_a4_01',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_terminals.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em 2024, tivemos alguns pontos de encontro favoritos!',
		},
		header: {
			number: 'YY%',
			title: 'Alcochete',
		},
	},

	{
		_group: 'municipio_terminals_area_4',
		_id: 'municipio_terminals_a4_02',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_terminals.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em 2024, tivemos alguns pontos de encontro favoritos!',
		},
		header: {
			number: 'YY%',
			title: 'Barreiro',
		},
	},

	{
		_group: 'municipio_terminals_area_4',
		_id: 'municipio_terminals_a4_03',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_terminals.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em 2024, tivemos alguns pontos de encontro favoritos!',
		},
		header: {
			number: 'YY%',
			title: 'Moita',
		},
	},

	{
		_group: 'municipio_terminals_area_4',
		_id: 'municipio_terminals_a4_04',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_terminals.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em 2024, tivemos alguns pontos de encontro favoritos!',
		},
		header: {
			number: 'YY%',
			title: 'Montijo',
		},
	},

	{
		_group: 'municipio_terminals_area_4',
		_id: 'municipio_terminals_a4_05',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_terminals.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em 2024, tivemos alguns pontos de encontro favoritos!',
		},
		header: {
			number: 'YY%',
			title: 'Palmela',
		},
	},

	{
		_group: 'municipio_terminals_area_4',
		_id: 'municipio_terminals_a4_06',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			lottie_src: '/assets/review-2024/animations/municipios/municipio_terminals.json',
			number_legend: 'total de passageiros transportados em Alcochete em 2024',
			number_value: 'YY%',
			title: 'Em 2024, tivemos alguns pontos de encontro favoritos!',
		},
		header: {
			number: 'YY%',
			title: 'Setúbal',
		},
	},

	//
	// Group: "municipio_lines_area_1"

	{
		_group: 'municipio_lines_area_1',
		_id: 'municipio_lines_a1_01',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			description: 'Só nesta linha levámos X pessoas a ver as vistas de Alcochete.',
			lottie_src: '/assets/review-2024/animations/municipios/municipio_lines.json',
			number_legend: 'linha municipal com mais passageiros transportados em Alcochete',
			number_value: 'YY%',
			title: 'Em 2024, passeámos  juntos por Alcochete!',
		},
		header: {
			number: 'YY%',
			title: 'Amadora',
		},
	},

	{
		_group: 'municipio_lines_area_1',
		_id: 'municipio_lines_a1_04',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			description: 'Só nesta linha levámos X pessoas a ver as vistas de Alcochete.',
			lottie_src: '/assets/review-2024/animations/municipios/municipio_lines.json',
			number_legend: 'linha municipal com mais passageiros transportados em Alcochete',
			number_value: 'YY%',
			title: 'Em 2024, passeámos  juntos por Alcochete!',
		},
		header: {
			number: 'YY%',
			title: 'Oeiras',
		},
	},

	{
		_group: 'municipio_lines_area_1',
		_id: 'municipio_lines_a1_05',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			description: 'Só nesta linha levámos X pessoas a ver as vistas de Alcochete.',
			lottie_src: '/assets/review-2024/animations/municipios/municipio_lines.json',
			number_legend: 'linha municipal com mais passageiros transportados em Alcochete',
			number_value: 'YY%',
			title: 'Em 2024, passeámos  juntos por Alcochete!',
		},
		header: {
			number: 'YY%',
			title: 'Sintra',
		},
	},

	//
	// Group: "municipio_lines_area_2"

	{
		_group: 'municipio_lines_area_2',
		_id: 'municipio_lines_a2_01',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			description: 'Só nesta linha levámos X pessoas a ver as vistas de Alcochete.',
			lottie_src: '/assets/review-2024/animations/municipios/municipio_lines.json',
			number_legend: 'linha municipal com mais passageiros transportados em Alcochete',
			number_value: 'YY%',
			title: 'Em 2024, passeámos  juntos por Alcochete!',
		},
		header: {
			number: 'YY%',
			title: 'Loures',
		},
	},

	{
		_group: 'municipio_lines_area_2',
		_id: 'municipio_lines_a2_02',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			description: 'Só nesta linha levámos X pessoas a ver as vistas de Alcochete.',
			lottie_src: '/assets/review-2024/animations/municipios/municipio_lines.json',
			number_legend: 'linha municipal com mais passageiros transportados em Alcochete',
			number_value: 'YY%',
			title: 'Em 2024, passeámos  juntos por Alcochete!',
		},
		header: {
			number: 'YY%',
			title: 'Mafra',
		},
	},

	{
		_group: 'municipio_lines_area_2',
		_id: 'municipio_lines_a2_03',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			description: 'Só nesta linha levámos X pessoas a ver as vistas de Alcochete.',
			lottie_src: '/assets/review-2024/animations/municipios/municipio_lines.json',
			number_legend: 'linha municipal com mais passageiros transportados em Alcochete',
			number_value: 'YY%',
			title: 'Em 2024, passeámos  juntos por Alcochete!',
		},
		header: {
			number: 'YY%',
			title: 'Odivelas',
		},
	},

	{
		_group: 'municipio_lines_area_2',
		_id: 'municipio_lines_a2_04',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			description: 'Só nesta linha levámos X pessoas a ver as vistas de Alcochete.',
			lottie_src: '/assets/review-2024/animations/municipios/municipio_lines.json',
			number_legend: 'linha municipal com mais passageiros transportados em Alcochete',
			number_value: 'YY%',
			title: 'Em 2024, passeámos  juntos por Alcochete!',
		},
		header: {
			number: 'YY%',
			title: 'Vila Franca de Xira',
		},
	},

	//
	// Group: "municipio_lines_area_3"

	{
		_group: 'municipio_lines_area_3',
		_id: 'municipio_lines_a3_01',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			description: 'Só nesta linha levámos X pessoas a ver as vistas de Alcochete.',
			lottie_src: '/assets/review-2024/animations/municipios/municipio_lines.json',
			number_legend: 'linha municipal com mais passageiros transportados em Alcochete',
			number_value: 'YY%',
			title: 'Em 2024, passeámos  juntos por Alcochete!',
		},
		header: {
			number: 'YY%',
			title: 'Almada',
		},
	},

	{
		_group: 'municipio_lines_area_3',
		_id: 'municipio_lines_a3_02',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			description: 'Só nesta linha levámos X pessoas a ver as vistas de Alcochete.',
			lottie_src: '/assets/review-2024/animations/municipios/municipio_lines.json',
			number_legend: 'linha municipal com mais passageiros transportados em Alcochete',
			number_value: 'YY%',
			title: 'Em 2024, passeámos  juntos por Alcochete!',
		},
		header: {
			number: 'YY%',
			title: 'Seixal',
		},
	},

	{
		_group: 'municipio_lines_area_3',
		_id: 'municipio_lines_a3_03',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			description: 'Só nesta linha levámos X pessoas a ver as vistas de Alcochete.',
			lottie_src: '/assets/review-2024/animations/municipios/municipio_lines.json',
			number_legend: 'linha municipal com mais passageiros transportados em Alcochete',
			number_value: 'YY%',
			title: 'Em 2024, passeámos  juntos por Alcochete!',
		},
		header: {
			number: 'YY%',
			title: 'Sesimbra',
		},
	},

	//
	// Group: "municipio_lines_area_4"

	{
		_group: 'municipio_lines_area_4',
		_id: 'municipio_lines_a4_01',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			description: 'Só nesta linha levámos X pessoas a ver as vistas de Alcochete.',
			lottie_src: '/assets/review-2024/animations/municipios/municipio_lines.json',
			number_legend: 'linha municipal com mais passageiros transportados em Alcochete',
			number_value: 'YY%',
			title: 'Em 2024, passeámos  juntos por Alcochete!',
		},
		header: {
			number: 'YY%',
			title: 'Alcochete',
		},
	},

	{
		_group: 'municipio_lines_area_4',
		_id: 'municipio_lines_a4_03',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			description: 'Só nesta linha levámos X pessoas a ver as vistas de Alcochete.',
			lottie_src: '/assets/review-2024/animations/municipios/municipio_lines.json',
			number_legend: 'linha municipal com mais passageiros transportados em Alcochete',
			number_value: 'YY%',
			title: 'Em 2024, passeámos  juntos por Alcochete!',
		},
		header: {
			number: 'YY%',
			title: 'Moita',
		},
	},

	{
		_group: 'municipio_lines_area_4',
		_id: 'municipio_lines_a4_04',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			description: 'Só nesta linha levámos X pessoas a ver as vistas de Alcochete.',
			lottie_src: '/assets/review-2024/animations/municipios/municipio_lines.json',
			number_legend: 'linha municipal com mais passageiros transportados em Alcochete',
			number_value: 'YY%',
			title: 'Em 2024, passeámos  juntos por Alcochete!',
		},
		header: {
			number: 'YY%',
			title: 'Montijo',
		},
	},

	{
		_group: 'municipio_lines_area_4',
		_id: 'municipio_lines_a4_05',
		colors: {
			primary: '#F0F0F0',
			text: '#000000',
		},
		content: {
			description: 'Só nesta linha levámos X pessoas a ver as vistas de Alcochete.',
			lottie_src: '/assets/review-2024/animations/municipios/municipio_lines.json',
			number_legend: 'linha municipal com mais passageiros transportados em Alcochete',
			number_value: 'YY%',
			title: 'Em 2024, passeámos  juntos por Alcochete!',
		},
		header: {
			number: 'YY%',
			title: 'Palmela',
		},
	},

	{
		_group: 'municipio_lines_area_4',
		_id: 'municipio_lines_a4_06',
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		content: {
			description: 'Só nesta linha levámos X pessoas a ver as vistas de Alcochete.',
			lottie_src: '/assets/review-2024/animations/municipios/municipio_lines.json',
			number_legend: 'linha municipal com mais passageiros transportados em Alcochete',
			number_value: 'YY%',
			title: 'Em 2024, passeámos  juntos por Alcochete!',
		},
		header: {
			number: 'YY%',
			title: 'Setúbal',
		},
	},

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
