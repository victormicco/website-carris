'use client';

import { Paper, Stack, Text, Title } from '@mantine/core';

import SchoolCycleItem from '../SchoolCycleItem';

export function SchoolModalities({ form }) {
	return (
		<Paper p={16} radius="md" shadow="sm">
			<Stack gap={10}>
				<div style={{ marginBottom: '10px', marginLeft: '4px' }}>
					<Title fw={700} order={3}>Modalidades de ensino</Title>
					<Text c="dimmed" size="sm">Indique os ciclos e outros tipos de ensino presentes na escola</Text>
				</div>
				<Stack gap="sm">
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
	);
}
