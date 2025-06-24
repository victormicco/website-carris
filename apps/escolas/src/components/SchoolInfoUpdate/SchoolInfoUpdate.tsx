'use client';
import BackHome from '@/components/BackHome/BackHome';
import Titles from '@/components/Titles/Titles';

import SchoolInfoUpdateMap from '../SchoolInfoUpdateMap/SchoolInfoUpdateMap';
// import { submit } from './SubmitAction';
import { Button, Loader, Modal, Paper, PasswordInput, SegmentedControl, Stack, Text, Textarea, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormValidateInput } from '@mantine/form/lib/types';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import styles from './SchoolInfoUpdate.module.css';

import { SchoolInfoUpdateCalendar } from '../SchoolInfoUpdateCalendar/SchoolInfoUpdateCalendar';
import SchoolCycleItem from './SchoolCycleItem';
import { isPasswordCorrect, submit } from './SubmitAction';
import { FormType, SchoolCicle, SchoolCicleObjects, schoolCicles, SchoolData } from './types';

export default function SchoolInfoUpdate({ school_id, schoolData }: { school_id: string, schoolData: SchoolData }) {
	//

	//
	// A. Setup variables
	const [submitState, setSubmitState] = useState<'done' | 'error' | 'no' | 'processing'>('no');
	const [formOpen, setFormOpen] = useState(false);
	const [successMessage, setSuccessMessage] = useState<null | string>(null);
	const router = useRouter();

	//
	// B. Fetch data

	//
	// C. Transform data
	const defaultCicle = {} as SchoolCicleObjects;
	schoolCicles.forEach((cicle) => {
		defaultCicle[cicle] = { afternoonEntry: '', afternoonExit: '', hasCicle: schoolData.cicles.includes(cicle), morningEntry: '', morningExit: '' };
	});

	// C.1) Form validation for school cicles
	const verifiers = {} as Record<SchoolCicle, {
		afternoonEntry: (_value: string, _values: FormType) => null | string
		afternoonExit: (_value: string, _values: FormType) => null | string
		morningEntry: (_value: string, _values: FormType) => null | string
		morningExit: (_value: string, _values: FormType) => null | string
		// hasCicle:(value:boolean,values:FormType)=>null|string,
		type: (_value: string, _values: FormType) => null | string
	}>;
	schoolCicles.forEach((cicle) => {
		verifiers[cicle] = {
			// "hasCicle":(value,values) => (values[cicle]["type"] !=null || !value ? null : 'Indique se o ensino é semestral ou trimestral'),
			afternoonEntry: (value, values) => values[cicle].hasCicle === false || value !== '' ? null : 'Indique a hora de entrada',
			afternoonExit: (value, values) => values[cicle].hasCicle === false || value !== '' ? null : 'Indique a hora de saída',
			morningEntry: (value, values) => values[cicle].hasCicle === false || value !== '' ? null : 'Indique a hora de entrada',
			morningExit: (value, values) => values[cicle].hasCicle === false || value !== '' ? null : 'Indique a hora de saída',
			type: (value, values) => values[cicle].hasCicle === false || value !== null ? null : 'Indique se o ensino é semestral ou trimestral',
		};
	});

	// C.2) Rest of form validation
	const validate: FormValidateInput<FormType> = {
		calendar: {
			cycleFrequency: value => value === 'semester' || value === 'trimester' ? null : 'Indique se o ensino é semestral ou trimestral',
			dates(value, values) {
				if (values.calendar.cycleFrequency === 'semester') {
					return value.length === 2 && value.every(d => d.every(d => d !== null)) ? null : 'Indique os intervalos de datas dos semestres';
				}
				if (values.calendar.cycleFrequency === 'trimester') {
					return value.length === 3 && value.every(d => d.every(d => d !== null)) ? null : 'Indique os intervalos de datas dos trimestres';
				}
				return null;
			},
			vacations(value, values) {
				// Make sure they are contained within the picked "dates" intervals
				const schoolIntervals = values.calendar.dates;
				const isCorrect = value.every(vacationInterval => schoolIntervals.some((schoolInterval) => {
					if (vacationInterval[0] === null || vacationInterval[1] === null) {
						return true;
					}
					if (vacationInterval[0] >= schoolInterval[0] && vacationInterval[1] <= schoolInterval[1]) {
						return true;
					}
					return false;
				}));
				return isCorrect ? null : `
					Os intervalos têm de estar contidos nos ${values.calendar.cycleFrequency === 'semester' ? 'semestres' : 'trimestres'}.
					Não indique férias entre ${values.calendar.cycleFrequency === 'semester' ? 'semestres' : 'trimestres'}.`;
			},
		},
		correctLocation: value => value !== '' ? null : 'Indique se a localização está correta',
		email: value => /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value) ? null : 'Email inválido',
		fillerIdentifier(value, _values, _path) {
			if (value === '') {
				return 'Indique o seu nome';
			}
			return null;
		},
		fillerIdentifierPosition(value, _values, _path) {
			if (value === '') {
				return 'Indique o seu cargo';
			}
			return null;
		},
		url: value => value === '' || /^\S+\.\S+$/.test(value) ? null : 'Website inválido, tem de conter um ponto',
		...verifiers,
	};

	const form = useForm<FormType>({
		initialValues: {
			calendar: {
				cycleFrequency: '',
				dates: [],
				vacations: [[null, null]],
			},
			comment: '',
			correctLocation: '',
			email: schoolData.email || '',
			fillerIdentifier: '',
			fillerIdentifierPosition: '',
			id: school_id,
			password: '',
			phone: schoolData.phone || '',
			postal_code: schoolData.postal_code || '',
			submissionDate: '', // gets populated server side
			url: schoolData.url || '',
			...defaultCicle,
		},
		validate: validate,
	});

	const onSubmit = async (values: FormType) => {
		if (submitState === 'processing') {
			return;
		}
		setSubmitState('processing');
		const res = await submit(values);
		const title = res.success ? 'Submissão efetuada' : 'Erro';
		const body = res.message;
		if (res.success) {
			setSuccessMessage(body);
		}
		else {
			notifications.show({ color: 'red', message: body, title: title });
		}
		if (res.success) {
			setSubmitState('done');
		}
		else {
			setSubmitState('error');
		}
	};

	const checkPassword = async (password: string) => {
		const isCorrect = await isPasswordCorrect(form.getValues().password);

		if (!isCorrect) {
			notifications.show({ color: 'red', message: '', title: 'Código de acesso inválido' });
		}
		else {
			notifications.show({ color: 'blue', message: '', title: 'Código de acesso aceite' });
		}
		setFormOpen(isCorrect);
	};

	//
	// D. Render components

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left' }}>
			<div>
				<Titles municipality_name={schoolData.municipality_name} school_name={schoolData.name} />
			</div>

			<Paper p={16} radius="md" shadow="sm">
				<Title fw={700} order={3}>Código de acesso</Title>
				{form.getInputProps('password').error && <Text c="red" size="xs">{form.getInputProps('password').error}</Text>}
				<PasswordInput
  placeholder="********"
  {...form.getInputProps('password')}
  onKeyDown={(e) => {
						if (e.key === 'Enter') {
							checkPassword(form.getValues().password);
						}
					}}
				/>
				<Button
					mt={20} onClick={async () => {
						checkPassword(form.getValues().password);
					}} size="md"
				>
					Verificar
				</Button>
			</Paper>
			{formOpen
			  && (
			  	<>
			  		<form
  onSubmit={form.onSubmit(onSubmit, (errors) => {
			  				const firstErrorPath = Object.keys(errors)[0];
			  				form.getInputNode(firstErrorPath)?.focus();
			  			})}
			  			style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left' }}
			  		>
			  			<Paper radius="md" shadow="sm">
			  				<SchoolInfoUpdateMap schoolData={schoolData} />
			  			</Paper>

			  			<Paper p={16} radius="md" shadow="sm">
			  				<Title fw={700} order={3}>Localização</Title>
			  				<Text c="dimmed" size="xs">A posição da escola no mapa corresponde com a posição da porta príncipal de entrada da escola?</Text>
			  				{form.getInputProps('correctLocation').error && <Text c="red" size="xs">{form.getInputProps('correctLocation').error}</Text>}
			  				<SegmentedControl
			  					style={{ flexShrink: 0 }}
			  					size="xs"
			  					data={[
			  						{ label: 'Sim', value: 'sim' },
			  						{ label: 'Quase', value: 'quase' },
			  						{ label: 'Não', value: 'nao' },
			  					]}

			  					{...form.getInputProps('correctLocation', { type: 'input' })}

			  				/>
			  				<TextInput
			  					label="Código Postal"
			  					placeholder="1234-567"
			  					{...form.getInputProps('postal_code')}
			  				/>
			  			</Paper>
			  			<Paper p={16} radius="md" shadow="sm">
			  				<Title fw={700} order={3}>Dados de contacto</Title>
			  				<Stack gap={6}>
			  					<TextInput
			  						label="Email"
			  						description="Email(s) separados por vírgulas"
			  						placeholder="email@exemplo.pt"
			  						{...form.getInputProps('email')}
			  					/>
			  					<TextInput
			  						label="Website"
			  						placeholder="www.escola.pt"
			  						{...form.getInputProps('url')}
			  					/>
			  					<TextInput
			  						label="Telefone"
			  						placeholder="910001337"
			  						{...form.getInputProps('phone')}
			  					/>
			  					<TextInput
			  						label="Nome do responsável pela submissão do formulário"
			  						placeholder="João Silva"
			  						{...form.getInputProps('fillerIdentifier')}
			  					/>
			  					<TextInput
			  						label="Cargo do responsável pela submissão do formulário"
			  						placeholder="Diretor da Escola"
			  						{...form.getInputProps('fillerIdentifierPosition')}
			  					/>
			  				</Stack>
			  			</Paper>
			  			{SchoolInfoUpdateCalendar({ form })}
			  			<Paper p={16} radius="md" shadow="sm">
			  				<Stack gap={6}>
			  					<Title fw={700} order={3}>Modalidades de ensino</Title>
			  					<Text c="dimmed" size="xs">Indique os ciclos e outros tipos de ensino presentes na escola</Text>
			  					<Stack gap="xs">
			  						<SchoolCycleItem form={form} k="pre_school" label="Pré-escolar" />
			  						<SchoolCycleItem form={form} k="basic_1" label="1º Ciclo" />
			  						<SchoolCycleItem form={form} k="basic_2" label="2º Ciclo" />
			  						<SchoolCycleItem form={form} k="basic_3" label="3º Ciclo" />
			  						<SchoolCycleItem form={form} k="high_school" label="Secundário" />
			  						<SchoolCycleItem form={form} k="professional" label="Profissional" />
			  						<SchoolCycleItem form={form} k="special" label="Especial" />
			  						<SchoolCycleItem form={form} k="artistic" label="Artístico" />
			  						<SchoolCycleItem form={form} k="university" label="Universitário" />
			  						<SchoolCycleItem form={form} k="other" label="Outro" />
			  					</Stack>
			  				</Stack>
			  			</Paper>
			  			<Paper p={16} radius="md" shadow="sm">
			  				<Title fw={700} order={3}>Informação adicional</Title>
			  				<Textarea
			  					label="Comentário"
			  					description="Informação extra que queira transmitir sobre a escola"
			  					placeholder="A Escola tem horário noturno desde as 18:35 até às 22:40/Há muitos estudantes que vêm de sitio X/Não há aulas sextas-feiras/etc"
			  					{...form.getInputProps('comment')}
			  				/>
			  			</Paper>
			  			<Button
  leftSection={
			  					(
			  						<div>
			  							{submitState === 'processing' && <Loader color="white" size={16} />}
			  							{submitState === 'done' && '✓'}
			  							{submitState === 'error' && <IconX size={20} />}
			  						</div>
			  					)
			  				}
			  				type="submit" size="md"
			  			>
				Enviar
			  			</Button>

			  		</form>
			  	</>
			  )}
			<Modal
				opened={successMessage != null} onClose={() => {
					setSuccessMessage(null);
				}} centered withCloseButton={false}
			>
				<div className={styles.modal}>
					<h1>Obrigado pela sua submissão.</h1>
					<p>{successMessage}</p>
					<Button onClick={() => {
						router.push('/portal-escolas');
					}}
					>
						Fechar
					</Button>
					<Button
						variant="subtle" onClick={() => {
							setSuccessMessage(null);
						}}
					>
						Voltar ao formulário
					</Button>
				</div>
			</Modal>
			<BackHome />
		</div>
	);

	//
}
