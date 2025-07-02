'use client';

/* * */

import '@mantine/core/styles.layer.css';
import '@mantine/dates/styles.layer.css';
import '@mantine/notifications/styles.layer.css';
import 'maplibre-gl/dist/maplibre-gl.css';

/* * */

import '@/theme/styles/reset.css';
import '@/theme/styles/variables.css';

/* * */

import { Accordion, Button, createTheme, type MantineThemeOverride, MultiSelect, SegmentedControl, Select, Skeleton, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconCaretLeftFilled } from '@tabler/icons-react';

/* * */

// import AccordionOverride from '@/theme/overrides/Accordion.module.css';
// import ButtonOverride from '@/theme/overrides/Button.module.css';
// import DatePickerInputOverride from '@/theme/overrides/DatePickerInput.module.css';
// import MultiSelectOverride from '@/theme/overrides/MultiSelect.module.css';
// import SegmentedControlOverride from '@/theme/overrides/SegmentedControl.module.css';
// import SelectOverride from '@/theme/overrides/Select.module.css';
// import SkeletonOverride from '@/theme/overrides/Skeleton.module.css';
// import TextInputOverride from '@/theme/overrides/TextInput.module.css';

/* * */

export const themeData: MantineThemeOverride = createTheme({
	//

	components: {

		// Accordion: Accordion.extend({
		// 	classNames: () => {
		// 		const defaultClasses = {
		// 			chevron: AccordionOverride.chevron,
		// 			content: AccordionOverride.content,
		// 			control: AccordionOverride.control,
		// 			icon: AccordionOverride.icon,
		// 			item: AccordionOverride.item,
		// 			label: AccordionOverride.label,
		// 			root: AccordionOverride.root,
		// 		};
		// 		return defaultClasses;
		// 	},
		// 	defaultProps: {
		// 		chevron: <IconCaretLeftFilled />,
		// 	},
		// }),

		// Button: Button.extend({
		// 	classNames: () => {
		// 		const defaultClasses = {
		// 			inner: ButtonOverride.inner,
		// 			label: ButtonOverride.label,
		// 			root: ButtonOverride.root,
		// 			section: ButtonOverride.section,
		// 		};
		// 		return defaultClasses;
		// 	},
		// }),

		// DatePickerInput: DatePickerInput.extend({
		// 	classNames: () => {
		// 		const defaultClasses = {
		// 			input: DatePickerInputOverride.input,
		// 			section: DatePickerInputOverride.section,
		// 			wrapper: DatePickerInputOverride.wrapper,
		// 		};
		// 		return defaultClasses;
		// 	},
		// }),

		// MultiSelect: MultiSelect.extend({
		// 	classNames: () => {
		// 		const defaultClasses = {
		// 			dropdown: MultiSelectOverride.dropdown,
		// 			input: MultiSelectOverride.input,
		// 			inputField: MultiSelectOverride.inputField,
		// 			option: MultiSelectOverride.option,
		// 			section: MultiSelectOverride.section,
		// 			wrapper: MultiSelectOverride.wrapper,
		// 		};
		// 		return defaultClasses;
		// 	}
		// }),

		// SegmentedControl: SegmentedControl.extend({
		// 	classNames: () => {
		// 		const defaultClasses = {
		// 			control: SegmentedControlOverride.control,
		// 			indicator: SegmentedControlOverride.indicator,
		// 			innerLabel: SegmentedControlOverride.innerLabel,
		// 			label: SegmentedControlOverride.label,
		// 			root: SegmentedControlOverride.root,
		// 		};
		// 		return defaultClasses;
		// 	},
		// }),

		// Select: Select.extend({
		// 	classNames: () => {
		// 		const defaultClasses = {
		// 			dropdown: SelectOverride.dropdown,
		// 			input: SelectOverride.input,
		// 			option: SelectOverride.option,
		// 			section: SelectOverride.section,
		// 			wrapper: SelectOverride.wrapper,
		// 		};
		// 		return defaultClasses;
		// 	},
		// }),

		// Skeleton: Skeleton.extend({
		// 	classNames: () => {
		// 		const defaultClasses = {
		// 			root: SkeletonOverride.root,

		// 		};
		// 		return defaultClasses;
		// 	},
		// }),

		// TextInput: TextInput.extend({
		// 	classNames: () => {
		// 		const defaultClasses = {
		// 			input: TextInputOverride.input,
		// 			section: TextInputOverride.section,
		// 			wrapper: TextInputOverride.wrapper,
		// 		};
		// 		return defaultClasses;
		// 	},
		// }),

	},

	fontFamily: 'var(--font-inter)',

	//
});
