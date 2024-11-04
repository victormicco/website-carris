/* * */

import type { StartupMessage } from '@/types/app.types';

/* * */

const appStartupMessages: StartupMessage[] = [
	{
		build_max: 2,
		build_min: 1,
		message_id: 'ANDROID-0001',
		message_url: 'https://cmet.pt/app-android/startup/message-1',
		presentation_type: 'breaking',
	},
];

/* * */

export async function GET() {
	return Response.json(appStartupMessages);
}
