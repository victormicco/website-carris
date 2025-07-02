/* * */

import { z } from 'zod/v4';

/* * */

const schoolCycleTimeSchema = z
	.object({
		_is_enabled: z.boolean().default(false),
		afternoon_entry: z.iso.time().nullable(),
		afternoon_exit: z.iso.time().nullable(),
		morning_entry: z.iso.time().nullable(),
		morning_exit: z.iso.time().nullable(),
	})
	.refine(schema => !schema._is_enabled || schema.afternoon_entry, { error: 'Preenchimento em falta.', path: ['afternoon_entry'] })
	.refine(schema => !schema._is_enabled || schema.afternoon_exit, { error: 'Preenchimento em falta.', path: ['afternoon_exit'] })
	.refine(schema => !schema._is_enabled || schema.morning_entry, { error: 'Preenchimento em falta.', path: ['morning_entry'] })
	.refine(schema => !schema._is_enabled || schema.morning_exit, { error: 'Preenchimento em falta.', path: ['morning_exit'] });

const calendarBlockSchema = z.object({
	end_date: z.iso.date().nullable(),
	start_date: z.iso.date().nullable(),
});

/* * */

export const updateSchoolFormSchema = z.object({

	_password: z.string(),

	comments: z.string().optional(),

	comms_contact: z.object({
		email: z.email(),
		name: z.string().min(3),
		phone: z.string(),
	}),

	contacts: z.object({
		email: z.email().or(z.literal('')),
		phone: z.string(),
		responder_name: z.string().min(3),
		responder_position: z.string().min(3),
		website: z.string(),
	}),

	location: z.object({
		is_correct: z.enum(['yes', 'almost', 'no']),
		latitude: z.number().nullable(),
		longitude: z.number().nullable(),
		postal_code: z.string(),
	}),

	school_calendar: z
		.object({

			block_1: calendarBlockSchema,
			block_2: calendarBlockSchema,
			block_3: calendarBlockSchema,

			calendar_type: z.enum(['semester', 'trimester']),

			interruptions: z.array(
				z.object({
					_key: z.string().default(() => crypto.randomUUID()),
					end_date: z.iso.date(),
					start_date: z.iso.date(),
				}),
			).default([]),

		})
		// Block 1 and 2 are always required
		.refine(schema => !!schema.block_1.start_date, { error: 'Preenchimento em falta.', path: ['block_1.start_date'] })
		.refine(schema => !!schema.block_1.end_date, { error: 'Preenchimento em falta.', path: ['block_1.end_date'] })
		.refine(schema => !!schema.block_2.start_date, { error: 'Preenchimento em falta.', path: ['block_2.start_date'] })
		.refine(schema => !!schema.block_2.end_date, { error: 'Preenchimento em falta.', path: ['block_2.end_date'] })
		// Dates should not overlap nor be in the wrong order
		.refine(schema => schema.block_1.start_date < schema.block_1.end_date, { error: 'Datas devem ser sequenciais.', path: ['block_1.start_date'] })
		.refine(schema => schema.block_1.end_date < schema.block_2.start_date, { error: 'Datas devem ser sequenciais.', path: ['block_1.end_date'] })
		.refine(schema => schema.block_2.start_date < schema.block_2.end_date, { error: 'Datas devem ser sequenciais.', path: ['block_2.start_date'] })
		// Block 3 is required if calendar type is trimester
		.refine(schema => schema.calendar_type !== 'trimester' || !!schema.block_3.start_date, { error: 'Preenchimento em falta.', path: ['block_3.start_date'] })
		.refine(schema => schema.calendar_type !== 'trimester' || !!schema.block_3.end_date, { error: 'Preenchimento em falta.', path: ['block_3.end_date'] })
		// And they should not overlap with block 1 and 2
		.refine(schema => schema.calendar_type !== 'trimester' || schema.block_2.end_date < schema.block_3.start_date, { error: 'Datas devem ser sequenciais 1.', path: ['block_3.start_date'] })
		.refine(schema => schema.calendar_type !== 'trimester' || schema.block_3.start_date < schema.block_3.end_date, { error: 'Datas devem ser sequenciais 2.', path: ['block_3.end_date'] }),

	school_cycles: z.object({

		artistic: schoolCycleTimeSchema,

		basic_1: schoolCycleTimeSchema,

		basic_2: schoolCycleTimeSchema,

		basic_3: schoolCycleTimeSchema,

		other: schoolCycleTimeSchema,

		pre_school: schoolCycleTimeSchema,

		professional: schoolCycleTimeSchema,

		secondary: schoolCycleTimeSchema,

		special: schoolCycleTimeSchema,

		university: schoolCycleTimeSchema,

	}),

});

/* * */

export type UpdateSchoolFormType = z.infer<typeof updateSchoolFormSchema>;
