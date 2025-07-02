/* eslint-disable perfectionist/sort-objects */

/* * */

import { type UpdateSchoolFormType } from '@/form/schema';
import { Dates } from '@tmlmobilidade/utils';

/* * */

function parseDateRange(start, end) {
	if (!start || !end) return '-';
	return `De ${start} a ${end}`;
}

function parseTimeRange(start: string, end: string) {
	if (!start || !end) return '-';
	return `Das ${start.substring(0, 5)} às ${end.substring(0, 5)}`;
}

/* * */

export function transformDataForGoogleSheets(schoolId: string, data: UpdateSchoolFormType) {
	//

	const parsedData = {

		//
		// METADATA

		timestamp: Dates.now('Europe/Lisbon').iso,
		schoolId: schoolId,

		//
		// LOCATION

		correct_location: data.location.is_correct ? 'Sim' : 'Não',
		latitude: data.location.latitude ?? '-',
		longitude: data.location.longitude ?? '-',
		postal_code: data.location.postal_code,

		//
		// GENERAL CONTACTS

		responsible_name: data.contacts.responder_name,
		responsible_position: data.contacts.responder_position,
		phone: data.contacts.phone ?? '-',
		email: data.contacts.email ?? '-',
		website: data.contacts.website ?? '-',

		//
		// COMMUNICATION DEPT CONTACTS

		comms_contact_name: data.comms_contact.name,
		comms_contact_email: data.comms_contact.email ?? '-',
		comms_contact_phone: data.comms_contact.phone ?? '-',

		//
		// COMMENTS

		comments: data.comments ?? '-',

		//
		// SCHOOL CALENDAR

		calendar_type: data.school_calendar.calendar_type === 'semester' ? 'Semestral' : 'Trimestral',
		block_1: parseDateRange(data.school_calendar.block_1.start_date, data.school_calendar.block_1.end_date),
		block_2: parseDateRange(data.school_calendar.block_2.start_date, data.school_calendar.block_2.end_date),
		block_3: parseDateRange(data.school_calendar.block_3.start_date, data.school_calendar.block_3.end_date),
		interruptions: data.school_calendar.interruptions.length ? data.school_calendar.interruptions.map(interruption => (parseDateRange(interruption.start_date, interruption.end_date))).join('\n') : '-',

		//
		// SCHOOL CYCLE TIMES

		pre_school_morning: parseTimeRange(data.school_cycles.pre_school.morning_entry, data.school_cycles.pre_school.morning_exit),
		pre_school_afternoon: parseTimeRange(data.school_cycles.pre_school.afternoon_entry, data.school_cycles.pre_school.afternoon_exit),

		basic_1_morning: parseTimeRange(data.school_cycles.basic_1.morning_entry, data.school_cycles.basic_1.morning_exit),
		basic_1_afternoon: parseTimeRange(data.school_cycles.basic_1.afternoon_entry, data.school_cycles.basic_1.afternoon_exit),

		basic_2_morning: parseTimeRange(data.school_cycles.basic_2.morning_entry, data.school_cycles.basic_2.morning_exit),
		basic_2_afternoon: parseTimeRange(data.school_cycles.basic_2.afternoon_entry, data.school_cycles.basic_2.afternoon_exit),

		basic_3_morning: parseTimeRange(data.school_cycles.basic_3.morning_entry, data.school_cycles.basic_3.morning_exit),
		basic_3_afternoon: parseTimeRange(data.school_cycles.basic_3.afternoon_entry, data.school_cycles.basic_3.afternoon_exit),

		secondary_morning: parseTimeRange(data.school_cycles.secondary.morning_entry, data.school_cycles.secondary.morning_exit),
		secondary_afternoon: parseTimeRange(data.school_cycles.secondary.afternoon_entry, data.school_cycles.secondary.afternoon_exit),

		professional_morning: parseTimeRange(data.school_cycles.professional.morning_entry, data.school_cycles.professional.morning_exit),
		professional_afternoon: parseTimeRange(data.school_cycles.professional.afternoon_entry, data.school_cycles.professional.afternoon_exit),

		special_morning: parseTimeRange(data.school_cycles.special.morning_entry, data.school_cycles.special.morning_exit),
		special_afternoon: parseTimeRange(data.school_cycles.special.afternoon_entry, data.school_cycles.special.afternoon_exit),

		artistic_morning: parseTimeRange(data.school_cycles.artistic.morning_entry, data.school_cycles.artistic.morning_exit),
		artistic_afternoon: parseTimeRange(data.school_cycles.artistic.afternoon_entry, data.school_cycles.artistic.afternoon_exit),

		university_morning: parseTimeRange(data.school_cycles.university.morning_entry, data.school_cycles.university.morning_exit),
		university_afternoon: parseTimeRange(data.school_cycles.university.afternoon_entry, data.school_cycles.university.afternoon_exit),

		other_morning: parseTimeRange(data.school_cycles.other.morning_entry, data.school_cycles.other.morning_exit),
		other_afternoon: parseTimeRange(data.school_cycles.other.afternoon_entry, data.school_cycles.other.afternoon_exit),

	};

	return Object.values(parsedData);

	//
}
