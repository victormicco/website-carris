export interface SchoolData {
	address: string
	cicles: string[]
	district_id: string
	district_name: string
	email: string
	grouping: string
	id: string
	lat: string
	locality: string
	lon: string
	municipality_id: string
	municipality_name: string
	name: string
	nature: string
	parish_id: string
	parish_name: string
	phone: string
	postal_code: string
	region_id: string
	region_name: string
	stops: string[]
	url: string
}

export const schoolCicles = ['pre_school', 'basic_1', 'basic_2', 'basic_3', 'high_school', 'professional', 'special', 'artistic', 'university', 'other'] as const;
export type SchoolCicle = typeof schoolCicles[number];
export type SchoolCicleObjects = Record<SchoolCicle, {
	afternoonEntry: string
	afternoonExit: string
	hasCicle: boolean
	morningEntry: string
	morningExit: string
}>;

type DatePair = [ Date | null, Date | null ];

export type FormType = SchoolCicleObjects & {
	calendar: {
		cycleFrequency: '' | 'semester' | 'trimester'
		dates: DatePair[]
		vacations: DatePair[]
	}
	comment: string
	correctLocation: '' | 'nao' | 'quase' | 'sim'
	email: string
	fillerIdentifier: string
	fillerIdentifierPosition: string
	id: string
	password: string
	phone: string
	postal_code: string
	submissionDate: string
	url: string
};
