/* * */

import { z } from 'zod/v4';

/* * */

export const updateSchoolFormSchema = z.object({

	_password: z.string(),

	comments: z.string().optional(),

	comms_contact: z.object({
		email: z.email(),
		name: z.string(),
		phone: z.string(),
	}),

	contacts: z.object({
		email: z.email(),
		phone: z.string(),
		responder_name: z.string(),
		responder_position: z.string(),
		website: z.url().optional(),
	}),

	location: z.object({
		is_correct: z.enum(['yes', 'almost', 'no']),
		latitude: z.number().optional(),
		longitude: z.number().optional(),
		postal_code: z.string(),
	}),

	school_calendar: z.object({

		calendar_type: z.enum(['semester', 'trimester']),

		interruptions: z.array(
			z.object({
				_key: z.string().default(() => crypto.randomUUID()),
				end_date: z.iso.date(),
				start_date: z.iso.date(),
			}),
		).default([]),

		semester_calendar: z.object({
			semester_1: z.object({
				end_date: z.iso.date(),
				start_date: z.iso.date(),
			}),
			semester_2: z.object({
				end_date: z.iso.date(),
				start_date: z.iso.date(),
			}),
		}).nullable(),

		trimester_calendar: z.object({
			trimester_1: z.object({
				end_date: z.iso.date(),
				start_date: z.iso.date(),
			}),
			trimester_2: z.object({
				end_date: z.iso.date(),
				start_date: z.iso.date(),
			}),
			trimester_3: z.object({
				end_date: z.iso.date(),
				start_date: z.iso.date(),
			}),
		}).nullable(),

	}),

	school_cycles: z.object({

		artistic: z.object({
			_is_enabled: z.boolean().default(false),
			afternoon_entry: z.iso.time(),
			afternoon_exit: z.iso.time(),
			morning_entry: z.iso.time(),
			morning_exit: z.iso.time(),
		}),

		basic_1: z.object({
			_is_enabled: z.boolean().default(false),
			afternoon_entry: z.iso.time(),
			afternoon_exit: z.iso.time(),
			morning_entry: z.iso.time(),
			morning_exit: z.iso.time(),
		}),

		basic_2: z.object({
			_is_enabled: z.boolean().default(false),
			afternoon_entry: z.iso.time(),
			afternoon_exit: z.iso.time(),
			morning_entry: z.iso.time(),
			morning_exit: z.iso.time(),
		}),

		basic_3: z.object({
			_is_enabled: z.boolean().default(false),
			afternoon_entry: z.iso.time(),
			afternoon_exit: z.iso.time(),
			morning_entry: z.iso.time(),
			morning_exit: z.iso.time(),
		}),

		other: z.object({
			_is_enabled: z.boolean().default(false),
			afternoon_entry: z.iso.time(),
			afternoon_exit: z.iso.time(),
			morning_entry: z.iso.time(),
			morning_exit: z.iso.time(),
		}),

		pre_school: z.object({
			_is_enabled: z.boolean().default(false),
			afternoon_entry: z.iso.time(),
			afternoon_exit: z.iso.time(),
			morning_entry: z.iso.time(),
			morning_exit: z.iso.time(),
		}),

		professional: z.object({
			_is_enabled: z.boolean().default(false),
			afternoon_entry: z.iso.time(),
			afternoon_exit: z.iso.time(),
			morning_entry: z.iso.time(),
			morning_exit: z.iso.time(),
		}),

		secondary: z.object({
			_is_enabled: z.boolean().default(false),
			afternoon_entry: z.iso.time(),
			afternoon_exit: z.iso.time(),
			morning_entry: z.iso.time(),
			morning_exit: z.iso.time(),
		}),

		special: z.object({
			_is_enabled: z.boolean().default(false),
			afternoon_entry: z.iso.time(),
			afternoon_exit: z.iso.time(),
			morning_entry: z.iso.time(),
			morning_exit: z.iso.time(),
		}),

		university: z.object({
			_is_enabled: z.boolean().default(false),
			afternoon_entry: z.iso.time(),
			afternoon_exit: z.iso.time(),
			morning_entry: z.iso.time(),
			morning_exit: z.iso.time(),
		}),

	}),

});

/* * */

export type UpdateSchoolFormType = z.infer<typeof updateSchoolFormSchema>;
