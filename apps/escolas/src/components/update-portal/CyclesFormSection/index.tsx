'use client';

/* * */

import { CycleItemSection } from '@/components/update-portal/CycleItemSection';
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
					<CycleItemSection fieldKey="pre_school" label="Pré-escolar" />
					<CycleItemSection fieldKey="basic_1" label="1º Ciclo" />
					<CycleItemSection fieldKey="basic_2" label="2º Ciclo" />
					<CycleItemSection fieldKey="basic_3" label="3º Ciclo" />
					<CycleItemSection fieldKey="high_school" label="Secundário" />
					<CycleItemSection fieldKey="professional" label="Profissional" />
					<CycleItemSection fieldKey="special" label="Especial" />
					<CycleItemSection fieldKey="artistic" label="Artístico" />
					<CycleItemSection fieldKey="university" label="Universitário" />
					<CycleItemSection fieldKey="other" label="Outro" />
				</Stack>
			</Stack>
		</Paper>
	);
}
