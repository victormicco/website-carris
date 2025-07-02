'use client';

/* * */

import { CommentsFormSection } from '@/components/update-portal/CommentsFormSection';
import { CommsResponsibleContactFormSection } from '@/components/update-portal/CommsResponsibleContactFormSection';
import { ContactsFormSection } from '@/components/update-portal/ContactsFormSection';
import { CyclesFormSection } from '@/components/update-portal/CyclesFormSection';
import { LocationFormSection } from '@/components/update-portal/LocationFormSection';
import { SchoolCalendarSection } from '@/components/update-portal/SchoolCalendarSection';
import { UpdatePortalSetLocationMap } from '@/components/update-portal/UpdatePortalSetLocationMap';
import { Button, Paper } from '@mantine/core';
import useSWR from 'swr';

/* * */

interface Props {
	schoolId: string
}

/* * */

export function PortalSchoolDetailForm({ schoolId }: Props) {
	//

	//
	// A. Fetch data

	const { data: schoolData } = useSWR(`https://api.carrismetropolitana.pt/datasets/facilities/schools/${schoolId}`);

	//
	// B. Render components

	return (
		<>

			<Paper radius="md" shadow="sm">
				<UpdatePortalSetLocationMap schoolData={schoolData} />
			</Paper>

			<LocationFormSection />

			<ContactsFormSection />

			<CommsResponsibleContactFormSection />

			<SchoolCalendarSection />

			<CyclesFormSection />

			<CommentsFormSection />

			<Button
				size="md"
				type="submit"
				// leftSection={
				// 	(
				// 		<div>
				// 			{submitState === 'processing' && <Loader color="white" size={16} />}
				// 			{submitState === 'done' && '✓'}
				// 			{submitState === 'error' && <IconX size={20} />}
				// 		</div>
				// 	)
				// }
			>
				Enviar
			</Button>

		</>
	);

	//
}
