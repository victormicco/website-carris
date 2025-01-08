/* * */

export interface QuizSchema {
	_id: string
	_order: number
	colors: {
		border?: string
		primary: string
		text: string
	}
	content: {
		description?: string
		lottie_src?: string
		title: string
	}
	questions: { _id: string, is_correct: boolean, label: string }[]
}

/* * */

export const allCardsData: QuizSchema[] = [

	{
		_id: 'test-02',
		_order: 2,
		colors: {
			primary: '#FBBA1A',
			text: '#000000',
		},
		content: {
			lottie_src: '',
			title: 'Quantos passageiros transportámos em 2024?',
		},
		questions: [
			{ _id: 'a', is_correct: false, label: '17,4 Milhões' },
			{ _id: 'b', is_correct: false, label: '174 Milhões' },
		],
	},

];
