'use client';

/* * */

import { FoundItemsCounter } from '@/components/common/FoundItemsCounter';
import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useVehiclesContext } from '@/contexts/Vehicles.context';
import { useVehiclesListContext } from '@/contexts/VehiclesList.context';
import { MultiSelect, Select, TextInput } from '@mantine/core';
import { IconArrowLoopRight, IconBike, IconGasStation, IconTriangle, IconUser, IconWheelchair } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('vehicles.VehiclesListToolbar');
	const vehiclesContext = useVehiclesContext();
	const vehiclesListContext = useVehiclesListContext();
	const typingTimeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null);
	const [textInput, setTextInput] = useState<null | string>(null);
	const [reducedMobility, setReducedMobility] = useState<string>('');
	const [bikesAllowed, setBikesAllowed] = useState<string>('');
	const [agencyId, setAgencyId] = useState<string[]>([]);
	const [make_model, setMakeModel] = useState<string[]>([]);
	const [propulsion, setPropulsion] = useState<string[]>([]);

	//
	// B. Transform data

	useEffect(() => {
		return () => {
			if (typingTimeoutRef.current) {
				clearTimeout(typingTimeoutRef.current);
			}
		};
	}, []);

	//

	// C. Handle Actions
	const handleTextInputChange = ({ currentTarget }) => {
		setTextInput(currentTarget.value);
		if (!vehiclesListContext.flags.is_loading && vehiclesListContext.data.raw) {
			if (typingTimeoutRef.current) {
				clearTimeout(typingTimeoutRef.current);
			}
			typingTimeoutRef.current = setTimeout(() => {
				vehiclesListContext.actions.updateFilterBySearch(currentTarget.value);
			}, 500);
		}
	};

	const handleBikesAllowedInputChange = (option: string) => {
		setBikesAllowed(option);
		vehiclesListContext.actions.updateFilterByIsBikeAllowed(option);
	};

	const handleReducedMobilityChange = (option: string) => {
		setReducedMobility(option);
		vehiclesListContext.actions.updateFilterByWheelchair(option);
	};

	const handleAgencyIdChange = (option: string[]) => {
		setAgencyId(option);
		vehiclesListContext.actions.updateFilterByAgency(option);
	};

	const handleMakeAndModelChange = (option: string[]) => {
		setMakeModel(option);
		vehiclesListContext.actions.updateFilterByMakeAndModel(option);
	};

	const handlePropulsionChange = (option: string[]) => {
		setPropulsion(option);
		vehiclesListContext.actions.updateFilterByPropulsion(option);
	};

	//
	// D. Render components

	return (
		<Surface>
			<Section heading={t('heading')} subheading={t('subheading')} withGap withPadding>
				<Grid columns="abc" withGap>
					<TextInput leftSection={<IconArrowLoopRight size={20} />} onChange={handleTextInputChange} placeholder={t('filter_by.search')} type="search" value={textInput || ''} />
					<Select
						leftSection={<IconBike size={20} />}
						onChange={handleBikesAllowedInputChange}
						placeholder="Bicicletas"
						radius="sm"
						value={bikesAllowed}
						data={[{ label: 'Não', value: 'false' },
							{ label: 'Sim', value: 'true' }]}
						clearable
						searchable
					/>
					<Select
						leftSection={<IconWheelchair size={20} />}
						onChange={handleReducedMobilityChange}
						placeholder="Mobilidade Reduzida"
						radius="sm"
						value={reducedMobility}
						data={[{ label: 'Não', value: 'false' },
							{ label: 'Sim', value: 'true' }]}
						clearable
						searchable
					/>
					<MultiSelect
						data={vehiclesListContext.data?.agencys?.map(a => ({ label: a.name, value: a.agency_id.toString() })) || []}
						leftSection={<IconUser size={20} />}
						onChange={handleAgencyIdChange}
						placeholder="Operador"
						radius="sm"
						value={agencyId}
						searchable
					/>
					<MultiSelect
						leftSection={<IconTriangle size={20} />}
						onChange={handleMakeAndModelChange}
						radius="sm"
						value={make_model || ''}
						data={
							vehiclesListContext.data?.makes_and_models?.map(make => ({
								group: make.name,
								items: make.models.map(model => ({
									label: model.name,
									value: ` ${make.name}-${model.name}`,
								})),
								label: make.name,
								value: make.name,
							})) || []
						}
						clearable
						searchable
					/>
					<MultiSelect
						data={vehiclesListContext.data?.propulsions?.map(p => ({ label: p.name, value: p.name })) || []}
						leftSection={<IconGasStation size={20} />}
						onChange={handlePropulsionChange}
						placeholder="Combustível"
						radius="sm"
						value={propulsion}
						clearable
						searchable
					/>
				</Grid>
				<FoundItemsCounter text={t('found_items_counter', { count: vehiclesContext.data.vehicles.length })} />
			</Section>
		</Surface>
	);

	//
}
