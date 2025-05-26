/* * */

import payloadConfig from '@/payload.config';
import { type GeneralStatusMessage } from '@carrismetropolitana/website-shared-types';
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
	// Retrieve all General Status messages from the database.

	const foundGeneralStatusMessages = await payload.findGlobal({ slug: 'general-status' });
	const allGeneralStatusMessages = foundGeneralStatusMessages?.messages.length ? foundGeneralStatusMessages.messages : null;

	//
	// Filter messages that are not intended to be public,
	// and format the remaining messages to be returned in the response.

	const publicMessages: GeneralStatusMessage[] = allGeneralStatusMessages
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
		.map((message) => {
			return {
				end_date: Dates.fromISO(message.end_date).unix_timestamp,
				is_enabled: message.is_enabled,
				more_info_url: message.more_info_url,
				severity: message.severity,
				start_date: Dates.fromISO(message.start_date).unix_timestamp,
				title: message.title,
			};
		});

	//
	// Return the filtered and formatted messages as a JSON response.

	return Response.json(publicMessages, {
		headers: { 'Access-Control-Allow-Origin': '*' },
	});

	//
};
