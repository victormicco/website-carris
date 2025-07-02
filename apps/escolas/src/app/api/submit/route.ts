/* * */

import { google } from 'googleapis';

/* * */

export async function POST(request: Request, response: Response) {
	//

	//
	// Setup the Google Sheets API client

	if (!process.env.GOOGLE_SERVICE_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
		return new Response('Missing Google API service credentials.', { status: 500 });
	}

	const googleAuthClient = new google.auth.JWT({
		email: process.env.GOOGLE_SERVICE_EMAIL,
		key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
		scopes: ['https://www.googleapis.com/auth/spreadsheets'],
	});

	const googleSheetsService = google.sheets({ auth: googleAuthClient, version: 'v4' });

	//
	// Parse the incoming request body

	const requestBody = await request.json();

	if (!requestBody || !requestBody.data) {
		return new Response('Invalid request body.', { status: 400 });
	}

	//
	// Check if the secret password is correct

	if (!process.env.FORM_PASSWORD) {
		return new Response('Missing FORM_PASSWORD in environment variables.', { status: 500 });
	}

	if (requestBody.data && requestBody.data.password !== process.env.FORM_PASSWORD) {
		return { message: 'Codigo de acesso inválido.', success: false };
	}

	//
	// Process the data and submit it to Google Sheets

	const data = requestBody.data;
	if (!data.id || !data.email || !data.postal_code) {
		return new Response('Missing required fields in the data.', { status: 400 });
	}

	//
}
