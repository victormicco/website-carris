'use server';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import { env } from 'process';

import { body } from './template';
import { FormType, schoolCicles } from './types';

const client = new google.auth.JWT({
	email: env.GOOGLE_SERVICE_EMAIL,
	key: env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
	scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
const sheets = google.sheets({ auth: client, version: 'v4' });

const port = parseInt(env.EMAIL_SERVER_PORT);
const transporter = nodemailer.createTransport({
	auth: {
		pass: env.EMAIL_SERVER_PASSWORD,
		user: env.EMAIL_SERVER_USER,
	},
	host: env.EMAIL_SERVER_HOST,
	port: port,
	secure: port === 465,
});

export async function submit(data: FormType): Promise<{ message: string, success: boolean }> {
	'use server';

	if (data.password !== env.FORM_PASSWORD) {
		return { message: 'Codigo de acesso inválido', success: false };
	}

	data.submissionDate = (new Date()).toISOString();

	const emails = data.email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@;,| \t\r\n]+/);
	if (emails === null || emails.length === 0) {
		return { message: 'Email inválido', success: false };
	}

	const fmtDate = (d: Date) => `${d.getDate}/${(d.getMonth), +1}/${d.getFullYear}`;
	const extractedCycles = schoolCicles.map(cicle => [cicle, data[cicle].hasCicle ? JSON.stringify({ ...data[cicle], hasCicle: undefined }) : false]);
	const newCalendar = { ...data.calendar, vacations: data.calendar.vacations.filter((d: unknown) => d !== null && d[0] != null && d[1] != null) };
	// make sure we don't pass null items, if some smartypants makes requests manually
	try {
		const toSubmit = [
			data.id,
			data.correctLocation,
			data.submissionDate,
			data.postal_code,
			data.email,
			data.phone,
			data.url,
			data.fillerIdentifier,
			data.fillerIdentifierPosition,
			data.comment,
			data.calendar.cycleFrequency,
			data.calendar.dates[0] ? fmtDate(data.calendar.dates[0][0]) : '',
			data.calendar.dates[0] ? fmtDate(data.calendar.dates[0][1]) : '',
			data.calendar.dates[1] ? fmtDate(data.calendar.dates[1][0]) : '',
			data.calendar.dates[1] ? fmtDate(data.calendar.dates[1][1]) : '',
			data.calendar.dates[2] ? fmtDate(data.calendar.dates[2][0]) : '',
			data.calendar.dates[2] ? fmtDate(data.calendar.dates[2][1]) : '',
			JSON.stringify(newCalendar.vacations),
			...extractedCycles.map(c => c[1]),
		].map(v => v == null ? '' : v);

		const response = await sheets.spreadsheets.values.get({
			range: 'Sheet1!A1:AB',
			spreadsheetId: env.GOOGLE_SHEET_ID,
		});
		const get_Values = response.data.values;
		const row = (get_Values?.length ?? 0) + 1;
		const range = `Sheet1!A${row}:Z${row}`;
		await sheets.spreadsheets.values.append({
			range: range,
			requestBody: {
				values: [toSubmit],
			},
			spreadsheetId: env.GOOGLE_SHEET_ID,
			valueInputOption: 'RAW',
		});
	}
	catch (e) {
		console.error(e);
		return { message: e.toString(), success: false };
	}

	const schoolCyclesHeader = ['Pré-escolar', '1º Ciclo', '2º Ciclo', '3º Ciclo', 'Secundário', 'Ensino Profissional', 'Ensino Especial', 'Ensino Artístico', 'Ensino Superior', 'Outro'];
	const to = emails[0];
	try {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const mail = await transporter.sendMail({
			from: env.EMAIL_FROM,
			html: body({
				body: `
			<p>Agradecemos a sua colaboração!</p>
			<p>O resumo da informação submetida no formulário encontra-se abaixo.</p>
			<p>Iremos analisar as informações enviadas para garantir que o regresso às aulas corre sobre rodas.</p>
			<p>A CMetropolitana continuará a trabalhar em conjunto com o Departamento da Mobilidade do município em prol de uma rede eficiente, próxima das escolas e dos passageiros.</p>
			<br><br>
			<b>Localização:</b>
			<div style="padding-left:10px;padding-bottom:5px">
				Localização correta: ${data.correctLocation}<br>
				Código postal: ${data.postal_code}<br>
			</div>
			<b>Dados de contacto:</b>
			<div style="padding-left:10px;padding-bottom:5px">
				E-mail: ${data.email}<br>
				Telefone: ${data.phone}<br>
				Website: ${data.url}<br>
			</div>
			<b>Calendário escolar:</b>
			<div style="padding-left:10px;padding-bottom:5px">
				Tipo de calendário: ${data.calendar.cycleFrequency === 'semester' ? 'Semestre' : 'Trimestre'}<br>
				${data.calendar.dates.map((d, i) => `${data.calendar.cycleFrequency === 'semester' ? 'Semestre' : 'Trimestre'} ${i + 1}: ${fmtDate(d[0])} a ${fmtDate(d[1])}`).join('<br>')}<br>
				Férias: ${newCalendar.vacations.length > 0 ? newCalendar.vacations.map(d => `${fmtDate(d[0])} a ${fmtDate(d[1])}`).join('<br>') : 'Nenhuma preenchida'}<br>
			</div>
			<b>Modalidades de ensino:</b>
			<div style="padding-left:10px;padding-bottom:5px">
			${schoolCicles.map((c, i) => data[c].hasCicle ? `${schoolCyclesHeader[i]}:
				<div style="padding-left:10px">Manhã: ${data[c].morningEntry} até ${data[c].morningExit}</div>
				<div style="padding-left:10px">Tarde: ${data[c].afternoonEntry} até ${data[c].afternoonExit}</div>` : null).filter(v => v !== null).join('<br>')}<br>
			</div>
			<b>Comentário:</b>
			<div style="padding-left:10px;padding-bottom:5px">
				${data.comment}
			</div>
		`,
			}),
			subject: 'Confirmação de submissão de calendário escolar',
			to: to,
		});
	}
	catch (e: unknown) {
		if (typeof e == 'object') {
			if ('rejectedErrors' in e && Array.isArray(e.rejectedErrors)) {
				const fiveohone = e.rejectedErrors.find(e => typeof e == 'object' && e.responseCode == 501);
				if (fiveohone) {
					return { message: `O endereço ${fiveohone.recipient} é inválido, por favor verifique se o email está correto.`, success: false };
				}
				if ('code' in e && e.code === 'EENVELOPE' && 'command' in e && e.command == 'API') {
					return { message: 'O email inserido é inválido, por favor verifique se o email está correto.', success: false };
				}
			}
		}

		return { message: e.toString(), success: false };
	}
	console.log('Sent confirmation email to', to);
	return { message: `E-mail de confirmação enviado para ${to}`, success: true };
}

export async function isPasswordCorrect(password: string): Promise<boolean> {
	return password === process.env.FORM_PASSWORD;
}
