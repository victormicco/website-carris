'use server';

/* * */

import { availableFormats, DEFAULT_LOCALE_CODE } from '@/i18n/config';
import { getRequestConfig } from 'next-intl/server';

/* * */

export default getRequestConfig(async () => {
	//

	//
	// Get messages for the default locale

	const translationMessages = (await import(`@/i18n/translations/${DEFAULT_LOCALE_CODE}.json`)).default;

	//
	// Return the request configuration

	return {
		formats: availableFormats,
		locale: DEFAULT_LOCALE_CODE,
		messages: translationMessages,
		timeZone: 'Europe/Lisbon',
	};

	//
});
