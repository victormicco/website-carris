/* * */

import Carousel from '@/components/common/Carousel';
import { MupiAlertsCarouselSlide } from '@/components/common/MupiAlertsCarouselSlide';
import { type SimplifiedAlert } from '@/types/alerts.types';

/* * */

interface Props {
	alerts: SimplifiedAlert[]
	target?: '_blank' | '_self'
}

/* * */

export function MupiAlertsCarousel({ alerts, target = '_blank' }: Props) {
	//

	const carouselSlides = alerts?.map(slideItem => ({
		_id: slideItem.alert_id + slideItem.description,
		component: (
			<MupiAlertsCarouselSlide alert={slideItem} target={target} />
		),
	}));

	return (
		<Carousel slides={carouselSlides} />
	);

	//
}
