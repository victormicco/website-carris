/* * */

import type { StartupMessage } from '@/types/app.types';

/* * */

const appStartupMessages: StartupMessage[] = [
	{
		build_max: 2, // 1730303328,
		build_min: 1,
		message_id: 'IOS-0001',
		message_url: 'https://cmet.pt/app-ios/startup/message-1',
		presentation_type: 'breaking',
	},
];

/* * */

export async function GET() {
	return Response.json(appStartupMessages);
}
