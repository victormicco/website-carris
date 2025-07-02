'use client';

/* * */

import { CycleItem } from '@/components/update-portal/CycleItem';
import { Paper, Stack, Text, Title } from '@mantine/core';

/* * */

export function CyclesFormSection() {
	return (
		<Paper p={16} radius="md" shadow="sm">
			<Stack gap={10}>
				<div style={{ marginBottom: '10px', marginLeft: '4px' }}>
					<Title fw={700} order={3}>Modalidades de ensino</Title>
					<Text c="dimmed" size="sm">Indique os ciclos e outros tipos de ensino presentes na escola</Text>
				</div>
				<Stack gap="sm">
					<CycleItem fieldKey="pre_school" label="Pré-escolar" />
					<CycleItem fieldKey="basic_1" label="1º Ciclo" />
					<CycleItem fieldKey="basic_2" label="2º Ciclo" />
					<CycleItem fieldKey="basic_3" label="3º Ciclo" />
					<CycleItem fieldKey="secondary" label="Secundário" />
					<CycleItem fieldKey="professional" label="Profissional" />
					<CycleItem fieldKey="special" label="Especial" />
					<CycleItem fieldKey="artistic" label="Artístico" />
					<CycleItem fieldKey="university" label="Universitário" />
					<CycleItem fieldKey="other" label="Outro" />
				</Stack>
			</Stack>
		</Paper>
	);
}
