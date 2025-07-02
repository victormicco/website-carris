/* * */

export async function POST(request: Request) {
	//

	if (!process.env.FORM_PASSWORD) {
		const responseData = JSON.stringify({ message: 'Missing FORM_PASSWORD in environment variables.', success: false });
		return new Response(responseData, { headers: { 'Content-Type': 'application/json' }, status: 500 });
	}

	//
	// Parse the incoming request body

	const requestBody = await request.json();

	if (!requestBody) {
		const responseData = JSON.stringify({ message: 'Invalid request body.', success: false });
		return new Response(responseData, { headers: { 'Content-Type': 'application/json' }, status: 400 });
	}

	//
	// Check if the secret password is correct

	if (requestBody._password === process.env.FORM_PASSWORD) {
		const responseData = JSON.stringify({ success: true });
		return new Response(responseData, { headers: { 'Content-Type': 'application/json' } });
	}

	const responseData = JSON.stringify({ message: 'Codigo de acesso inválido.', success: false });
	return new Response(responseData, { headers: { 'Content-Type': 'application/json' }, status: 401 });

	//
}
