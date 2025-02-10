'use client';

/* * */

import { ExpandToggle } from '@/components/common/ExpandToggle';
import { FoundItemsCounter } from '@/components/common/FoundItemsCounter';
import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { useVehiclesListContext } from '@/contexts/VehiclesList.context';
import { MultiSelect, Select, TextInput } from '@mantine/core';
import { IconArrowLoopRight, IconBike, IconDisabled2, IconGasStation, IconTriangle, IconUser } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

/* * */

export function VehiclesListToolbar() {
	//

	//
	// A. Setup variables

	const t = useTranslations('vehicles.VehiclesListToolbar');
	const optionsLabels = useTranslations('options');

	const vehiclesListContext = useVehiclesListContext();

	//
	// B. Transform data

	const propulsionOptions = useMemo(() => {
		if (!vehiclesListContext.data.raw) return [];
		const allOptionsValues = new Set<string>(vehiclesListContext.data.raw.map(item => item.propulsion).filter(Boolean).map(String));
		return Array.from(allOptionsValues).map(value => ({ label: optionsLabels(`VehiclePropulsion.${value}`), value: value })) || [];
	}, [vehiclesListContext.data.raw]);

	const agencyOptions = useMemo(() => {
		if (!vehiclesListContext.data.raw) return [];
		const allOptionsValues = new Set<string>(vehiclesListContext.data.raw.map(item => item.agency_id).filter(Boolean));
		return Array.from(allOptionsValues).map(value => ({ label: optionsLabels(`Agency.${value}`), value: value })) || [];
	}, [vehiclesListContext.data.raw]);

	//
	// B. Handle Actions

	const handleTextInputChange = ({ currentTarget }) => {
		vehiclesListContext.actions.updateFilterBySearch(currentTarget.value);
	};

	const handleBikesAllowedInputChange = (option: string) => {
		vehiclesListContext.actions.updateFilterByIsBikeAllowed(option);
	};

	const handleReducedMobilityChange = (option: string) => {
		vehiclesListContext.actions.updateFilterByWheelchair(option);
	};

	const handleAgencyIdChange = (option: string[]) => {
		vehiclesListContext.actions.updateFilterByAgency(option);
	};

	const handleMakeAndModelChange = (option: string[]) => {
		vehiclesListContext.actions.updateFilterByMakeAndModel(option);
	};

	const handlePropulsionChange = (option: string[]) => {
		vehiclesListContext.actions.updateFilterByPropulsion(option);
	};

	//
	// C. Render components

	return (
		<Section withBottomDivider withGap withPadding>
			<Grid columns="a" withGap>
				<TextInput
					leftSection={<IconArrowLoopRight size={20} />}
					onChange={handleTextInputChange}
					placeholder={t('filters.by_search.placeholder')}
					type="search"
					value={vehiclesListContext.filters.by_search}
				/>
				<MultiSelect
					data={propulsionOptions}
					leftSection={<IconGasStation size={20} />}
					onChange={handlePropulsionChange}
					placeholder={t('filters.by_propulsion.placeholder')}
					radius="sm"
					value={vehiclesListContext.filters.by_propulsion?.split(' ') || []}
					clearable
					searchable
				/>
			</Grid>

			<ExpandToggle defaultState={!!vehiclesListContext.filters.by_agency || !!vehiclesListContext.filters.by_isBicicleAllowed || !!vehiclesListContext.filters.by_isWheelchairAcessible || !!vehiclesListContext.filters.by_makeAndModel}>
				<Grid columns="a" withGap>
					<Select
						leftSection={<IconDisabled2 size={20} />}
						onChange={handleReducedMobilityChange}
						placeholder={t('filters.by_wheelchair.placeholder')}
						radius="sm"
						value={vehiclesListContext.filters.by_isWheelchairAcessible}
						data={[
							{ label: t('filters.by_wheelchair.options.false'), value: 'false' },
							{ label: t('filters.by_wheelchair.options.true'), value: 'true' },
						]}
						clearable
						searchable
					/>
					<Select
						leftSection={<IconBike size={20} />}
						onChange={handleBikesAllowedInputChange}
						placeholder={t('filters.by_bicycle.placeholder')}
						radius="sm"
						value={vehiclesListContext.filters.by_isBicicleAllowed}
						data={[
							{ label: 'Não', value: 'false' },
							{ label: 'Sim', value: 'true' },
						]}
						clearable
						searchable
					/>
					<MultiSelect
						data={agencyOptions}
						leftSection={<IconUser size={20} />}
						onChange={handleAgencyIdChange}
						placeholder={t('filters.by_agency.placeholder')}
						radius="sm"
						value={vehiclesListContext.filters.by_agency?.split(' ') || []}
						clearable
						searchable
					/>
					<MultiSelect
						leftSection={<IconTriangle size={20} />}
						onChange={handleMakeAndModelChange}
						placeholder={t('filters.by_make_model.placeholder')}
						radius="sm"
						value={vehiclesListContext.filters.by_makeAndModel?.split(',') || []}
						data={
							vehiclesListContext.data?.makes_and_models?.map(make => ({
								group: make.name,
								items: make.models.map(model => ({
									label: model.name,
									value: `${make.name}-${model.name}`,
								})),
							})) || []
						}
						clearable
						searchable
					/>
				</Grid>
			</ExpandToggle>
			<FoundItemsCounter text={t('found_items_counter', { count: vehiclesListContext.data.filtered.length })} />
		</Section>
	);

	//
}
