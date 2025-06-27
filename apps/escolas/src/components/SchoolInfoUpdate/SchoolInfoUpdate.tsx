'use client';
import BackHome from '@/components/BackHome/BackHome';
import Titles from '@/components/Titles/Titles';

import InfoUpdateMap from '../SchoolInfoUpdateMap/SchoolInfoUpdateMap';
// import { submit } from './SubmitAction';
import { Button, Loader, Paper } from '@mantine/core';
import { FormValidateInput, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { useState } from 'react';

import { AdditionalInformation } from '../update-form/AdditionalInformationSection';
import { ContactData } from '../update-form/ContactDataSection';
import { Location } from '../update-form/LocationSection';
import { Modalities } from '../update-form/ModalitiesSection';
import { ModalSection } from '../update-form/ModalSection';
import { ResponsibleContact } from '../update-form/ResponsibleContactSection';
import { InfoUpdateCalendar } from '../update-form/SchoolCalendarSection';
import { SubmitCodeSection } from '../update-form/SubmitCodeSection';
import { submit } from './SubmitAction';
import { FormType, SchoolCicle, SchoolCicleObjects, schoolCicles, SchoolData } from './types';

export default function SchoolInfoUpdate({ school_id, schoolData }: { school_id: string, schoolData: SchoolData }) {
	//

	//
	// A. Setup variables
	const [submitState, setSubmitState] = useState<'done' | 'error' | 'no' | 'processing'>('no');
	const [formOpen, setFormOpen] = useState(false); // Don't forget to turn this to false so the submit code work properly
	const [successMessage, setSuccessMessage] = useState<null | string>(null);

	//
	// B. Transform data
	const defaultCicle = {} as SchoolCicleObjects;
	schoolCicles.forEach((cicle) => {
		defaultCicle[cicle] = { afternoonEntry: '', afternoonExit: '', hasCicle: schoolData.cicles.includes(cicle), morningEntry: '', morningExit: '' };
	});

	// Form validation for school cicles
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

	// Rest of form validation
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
		fillerIdentifier(value) {
			if (value === '') {
				return 'Indique o seu nome';
			}
			return null;
		},
		fillerIdentifierPosition(value) {
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

	//
	// C. Handle Actions
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
			setSubmitState('done');
		}
		else {
			notifications.show({ color: 'red', message: body, title: title });
			setSubmitState('error');
		}
	};

	//
	// D. Render components

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left' }}>
			<div>
				<Titles municipality_name={schoolData.municipality_name} school_name={schoolData.name} />
			</div>

			{!formOpen && <SubmitCodeSection form={form} setFormOpen={setFormOpen} />}

			{formOpen && (
				<>
					<form
						style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left' }}
						onSubmit={form.onSubmit(onSubmit, (errors) => {
							const firstErrorPath = Object.keys(errors)[0];
							form.getInputNode(firstErrorPath)?.focus();
						})}
					>
						<Paper radius="md" shadow="sm">
							<InfoUpdateMap schoolData={schoolData} />
						</Paper>
						<Location form={form} />
						<ContactData form={form} />
						<ResponsibleContact form={form} />
						<InfoUpdateCalendar form={form} />
						<Modalities form={form} />
						<AdditionalInformation form={form} />
						<Button
							size="md"
							type="submit"
							leftSection={
								(
									<div>
										{submitState === 'processing' && <Loader color="white" size={16} />}
										{submitState === 'done' && '✓'}
										{submitState === 'error' && <IconX size={20} />}
									</div>
								)
							}
						>
							Enviar
						</Button>

					</form>
				</>
			)}
			<ModalSection setSuccessMessage={setSuccessMessage} successMessage={successMessage} />
			<BackHome />
		</div>
	);

	//
}
