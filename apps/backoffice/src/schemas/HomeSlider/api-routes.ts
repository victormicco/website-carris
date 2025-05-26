/* * */

import payloadConfig from '@/payload.config';
import { type HomeSliderSlide } from '@carrismetropolitana/website-shared-types';
import { Dates } from '@tmlmobilidade/utils';
import { getPayload } from 'payload';

/* * */

export const publicApiRoute = async () => {
	//

	//
	// Setup Payload and other necessary variables for handling requests.

	const currentDate = Dates.now();
	const payload = await getPayload({ config: payloadConfig });

	//
	// Retrieve all Home Slider slides from the database.

	const foundHomeSliderSlides = await payload.findGlobal({ slug: 'home-slider' });
	const allHomeSliderSlides = foundHomeSliderSlides?.slides.length ? foundHomeSliderSlides.slides : null;

	//
	// Filter slides that are not intended to be public,
	// and format the remaining slides to be returned in the response.

	const publicSlides: HomeSliderSlide[] = allHomeSliderSlides
		.filter((item) => {
			// The message should be enabled
			if (!item.is_enabled) return false;
			// If the message has a start date, it should be after the current date
			const startDate = item.start_date ? Dates.fromISO(item.start_date) : null;
			if (startDate && startDate.unix_timestamp > currentDate.unix_timestamp) return false;
			// If the message has an end date, it should be before the current date
			const endDate = item.end_date ? Dates.fromISO(item.end_date) : null;
			if (endDate && endDate.unix_timestamp < currentDate.unix_timestamp) return false;
			// The message should have at least one letter for the title
			if (!item.title?.length) return false;
			// If all validations passed return true
			return true;
		})
		.map((slide) => {
			const mediaFile = typeof slide.image !== 'string' ? slide.image : null;
			return {
				end_date: Dates.fromISO(slide.end_date).unix_timestamp,
				image_url: mediaFile.url,
				is_enabled: slide.is_enabled,
				more_info_url: slide.more_info_url,
				start_date: Dates.fromISO(slide.start_date).unix_timestamp,
				title: slide.title,
			};
		});

	//
	// Return the filtered and formatted slides as a JSON response.

	return Response.json(publicSlides, {
		headers: { 'Access-Control-Allow-Origin': '*' },
	});

	//
};
