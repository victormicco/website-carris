/* * */

export interface Review2024QuizAnswerSchema {
	_id: string
	is_correct: boolean
	label: string
}

export interface Review2024QuizSchema {
	_id: string
	_points?: number
	answers: Review2024QuizAnswerSchema[]
	colors: {
		border?: string
		primary: string
		text: string
	}
	question: {
		description?: string
		lottie_src?: string
		title: string
	}
}

/* * */

export const allQuizData: Review2024QuizSchema[] = [

	{
		_id: '01',
		_points: 10,
		answers: [
			{ _id: 'a', is_correct: true, label: '172,5 milhões' },
			{ _id: 'b', is_correct: false, label: '17,5 milhões' },
		],
		colors: {
			primary: '#C61D23',
			text: '#FFFFFF',
		},
		question: {
			description: 'teste',
			lottie_src: '/assets/review-2024/animations/passageiros/kms_total.json',
			title: 'Quantos passageiros transportámos em 2024?',
		},
	},

	{
		_id: '02',
		_points: 10,
		answers: [
			{ _id: 'a', is_correct: false, label: '500 000' },
			{ _id: 'b', is_correct: true, label: '300 000' },
		],
		colors: {
			primary: '#0C807E',
			text: '#FFFFFF',
		},
		question: {
			description: 'teste',
			lottie_src: 'kms_total',
			title: 'Quantos quilómetros percorremos em 2024?',
		},
	},

	{
		_id: '03',
		_points: 10,
		answers: [
			{ _id: 'a', is_correct: false, label: '80 000' },
			{ _id: 'b', is_correct: true, label: '90 000' },
		],
		colors: {
			primary: '#C61D23',
			text: '#FFFFFF',
		},
		question: {
			description: 'teste',
			lottie_src: 'App_total',
			title: 'Quantos passageiros já utilizam a nossa app?',
		},
	},

	{
		_id: '04',
		_points: 10,
		answers: [
			{ _id: 'a', is_correct: true, label: '34 milhões' },
			{ _id: 'b', is_correct: false, label: '34 mil' },
		],
		colors: {
			primary: '#C61D23',
			text: '#FFFFFF',
		},
		question: {
			description: 'teste',
			lottie_src: 'pax_total',
			title: 'Quantos carros de 5 lugares seriam precisos para transportar todos os nossos passageiros este ano?',
		},
	},

	{
		_id: '05',
		_points: 10,
		answers: [
			{ _id: 'a', is_correct: true, label: 'Área1' },
			{ _id: 'b', is_correct: false, label: 'Área2' },
		],
		colors: {
			primary: '#C61D23',
			text: '#FFFFFF',
		},
		question: {
			description: 'teste',
			lottie_src: 'pax_total_area1',
			title: 'Em que área transportámos mais passageiros em 2024 (58,7 milhões)?',
		},
	},

	{
		_id: '06',
		_points: 10,
		answers: [
			{ _id: 'a', is_correct: true, label: 'Sim!' },
			{ _id: 'b', is_correct: false, label: 'Impossível' },
		],
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		question: {
			description: 'teste',
			lottie_src: 'records_day_busi',
			title: 'Houve algum dia em que ultrapassámos os 680 mil passageiros em 24h?',
		},
	},

	{
		_id: '07',
		_points: 10,
		answers: [
			{ _id: 'a', is_correct: false, label: 'Vila Franca de Xira' },
			{ _id: 'b', is_correct: true, label: 'Cascais' },
		],
		colors: {
			primary: '#000000',
			text: '#FFFFFF',
		},
		question: {
			description: 'teste',
			lottie_src: 'Pax_growth_mun',
			title: 'Qual foi o município da amL em que mais aumentou o número de passageiros em 2024?',
		},
	},

	{
		_id: '08',
		_points: 10,
		answers: [
			{ _id: 'a', is_correct: false, label: '25 000' },
			{ _id: 'b', is_correct: true, label: '50 000' },
		],
		colors: {
			primary: '#F5A000',
			text: '#000000',
		},
		question: {
			description: 'teste',
			lottie_src: 'website_daily',
			title: 'Quantos visitantes diários temos no nosso website?',
		},
	},

	{
		_id: '09',
		_points: 10,
		answers: [
			{ _id: 'a', is_correct: true, label: 'Claro!' },
			{ _id: 'b', is_correct: false, label: 'Não acredito' },
		],
		colors: {
			primary: '#FFDD00',
			text: '#000000',
		},
		question: {
			description: 'teste',
			lottie_src: 'Pax_total_mun',
			title: 'Este ano, todas as 4 áreas tiveram terminais a crescer, pelo menos, 21%?',
		},
	},

	{
		_id: '10',
		_points: 10,
		answers: [
			{ _id: 'a', is_correct: false, label: '10 milhões' },
			{ _id: 'b', is_correct: true, label: '17 milhões' },
		],
		colors: {
			primary: '#C61D23',
			text: '#FFFFFF',
		},
		question: {
			description: 'teste',
			lottie_src: 'records_month',
			title: 'Qual foi o número máximo de passageiros que transportámos num mês?',
		},
	},

];
