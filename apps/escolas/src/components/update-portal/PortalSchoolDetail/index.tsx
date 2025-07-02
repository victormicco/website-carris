'use client';

/* * */

import BackHome from '@/components/BackHome/BackHome';
import Titles from '@/components/Titles/Titles';
import { PortalSchoolDetailForm } from '@/components/update-portal/PortalSchoolDetailForm';
import { ValidateCodeSection } from '@/components/update-portal/ValidateCodeSection';
import { UpdateSchoolFormProvider, useUpdateSchoolForm } from '@/form/form';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { ModalSection } from '../ModalSection';

/* * */

interface Props {
	schoolId: string
}

/* * */

export function PortalSchoolDetail({ schoolId }: Props) {
	//

	//
	// A. Setup variables

	const [isPasswordValid, setIsPasswordValid] = useState(false);

	const form = useUpdateSchoolForm({
		mode: 'uncontrolled',
	});

	//
	// B. Setup variables

	const { data: schoolData, isLoading: schoolLoading } = useSWR(`https://api.carrismetropolitana.pt/datasets/facilities/schools/${schoolId}`);

	//
	// C. Handle actions

	useEffect(() => {
		if (!schoolData) return;
		form.initialize({
			_password: 'escolas-cm-2024',
			location: {
				is_correct: null,
				latitude: schoolData.latitude,
				longitude: schoolData.longitude,
				postal_code: schoolData.postal_code,
			},
			school_calendar: {
				calendar_type: 'semester',
				interruptions: [],
			},
			school_cycles: {

				artistic: {
					_is_enabled: false,
					afternoon_entry: null,
					afternoon_exit: null,
					morning_entry: null,
					morning_exit: null,
				},
				basic_1: {
					_is_enabled: false,
					afternoon_entry: null,
					afternoon_exit: null,
					morning_entry: null,
					morning_exit: null,
				},
				basic_2: {
					_is_enabled: false,
					afternoon_entry: null,
					afternoon_exit: null,
					morning_entry: null,
					morning_exit: null,
				},
				basic_3: {
					_is_enabled: false,
					afternoon_entry: null,
					afternoon_exit: null,
					morning_entry: null,
					morning_exit: null,
				},
				other: {
					_is_enabled: false,
					afternoon_entry: null,
					afternoon_exit: null,
					morning_entry: null,
					morning_exit: null,
				},
				pre_school: {
					_is_enabled: false,
					afternoon_entry: null,
					afternoon_exit: null,
					morning_entry: null,
					morning_exit: null,
				},
				professional: {
					_is_enabled: false,
					afternoon_entry: null,
					afternoon_exit: null,
					morning_entry: null,
					morning_exit: null,
				},
				secondary: {
					_is_enabled: false,
					afternoon_entry: null,
					afternoon_exit: null,
					morning_entry: null,
					morning_exit: null,
				},
				special: {
					_is_enabled: false,
					afternoon_entry: null,
					afternoon_exit: null,
					morning_entry: null,
					morning_exit: null,
				},
				university: {
					_is_enabled: false,
					afternoon_entry: null,
					afternoon_exit: null,
					morning_entry: null,
					morning_exit: null,
				},
			},
		});
	}, [schoolData]);

	//
	// C. Render components

	if (schoolLoading || !schoolData) {
		return <div>Loading...</div>;
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left' }}>

			<Titles municipality_name={schoolData.municipality_name} school_name={schoolData.name} />

			<UpdateSchoolFormProvider form={form}>
				<form onSubmit={form.onSubmit(() => undefined)}>
					{!isPasswordValid
						? <ValidateCodeSection onSubmit={setIsPasswordValid} />
						: <PortalSchoolDetailForm schoolId={schoolId} />}
				</form>
			</UpdateSchoolFormProvider>

			{/* <ModalSection setSuccessMessage={setSuccessMessage} successMessage={successMessage} /> */}

			<BackHome />

		</div>
	);

	//
}
