/* * */

interface CarouselSlide {
	id: string
	src: string
	target?: string
	url: string
}

/* * */

export const CAROUSEL_SLIDES: CarouselSlide[] = [

	{
		id: '0001',
		src: '/assets/featured/survey-2025.png',
		url: '/news/31017',
	},

	{
		id: '0002',
		src: '/assets/featured/mascote.png',
		url: '/news/30135',
	},

	{
		id: '0003',
		src: '/assets/featured/night-lines.png',
		url: '/news/29458',
	},

	{
		id: '0004',
		src: '/assets/featured/survey-2024.png',
		url: '/inquerito',
	},

	{
		id: '0005',
		src: '/assets/featured/review-2024.png',
		url: '/viagem-2024',
	},

	{
		id: '0006',
		src: '/assets/featured/join-whatsapp.png',
		url: '/news/7243',
	},

];
