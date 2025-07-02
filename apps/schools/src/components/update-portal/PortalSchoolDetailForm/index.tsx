'use client';

/* * */

import { CommentsFormSection } from '@/components/update-portal/CommentsFormSection';
import { CommsResponsibleContactFormSection } from '@/components/update-portal/CommsResponsibleContactFormSection';
import { ContactsFormSection } from '@/components/update-portal/ContactsFormSection';
import { CyclesFormSection } from '@/components/update-portal/CyclesFormSection';
import { LocationFormSection } from '@/components/update-portal/LocationFormSection';
import { SchoolCalendarSection } from '@/components/update-portal/SchoolCalendarSection';
import { Button, Flex } from '@mantine/core';

/* * */

interface Props {
	schoolId: string
}

/* * */

export function PortalSchoolDetailForm({ schoolId }: Props) {
	return (
		<Flex direction="column" gap="md">

			<LocationFormSection schoolId={schoolId} />

			<ContactsFormSection />

			<CommsResponsibleContactFormSection />

			<SchoolCalendarSection />

			<CyclesFormSection />

			<CommentsFormSection />

			<Button
				size="xl"
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

		</Flex>
	);
}
