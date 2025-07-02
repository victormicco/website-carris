'use client';

/* * */

import { UpdatePortalSetLocationMap } from '@/components/update-portal/UpdatePortalSetLocationMap';
import { useUpdateSchoolFormContext } from '@/form/form';
import { Paper, SegmentedControl, Text, TextInput, Title } from '@mantine/core';

/* * */

export function LocationFormSection({ schoolId }: { schoolId: string }) {
	//

	//
	// A. Setup variables

	const form = useUpdateSchoolFormContext();

	//
	// B. Render components

	return (
		<Paper p={16} radius="md" shadow="sm">

			<Title fw={700} order={3} style={{ marginLeft: '4px' }}>
				Localização
			</Title>

			<Text c="dimmed" size="sm" style={{ marginBottom: '10px', marginLeft: '4px' }}>
				A posição da escola no mapa corresponde com a posição da porta príncipal de entrada da escola?
			</Text>

			<SegmentedControl
				style={{ marginBottom: 10 }}
				data={[
					{ label: 'Sim', value: 'yes' },
					{ label: 'Quase', value: 'almost' },
					{ label: 'Não', value: 'no' },
				]}
				{...form.getInputProps('location.is_correct')}
			/>

			{form.errors['location.is_correct'] && (
				<Text c="red" size="md" style={{ marginBottom: 10 }}>
					Por favor, indique se a localização está correta ou não.
				</Text>
			)}

			<UpdatePortalSetLocationMap schoolId={schoolId} />

			<TextInput
				{...form.getInputProps('location.postal_code')}
				label="Código Postal"
				placeholder="1234-567"
				style={{ marginTop: 10 }}
			/>

		</Paper>
	);

	//
}
