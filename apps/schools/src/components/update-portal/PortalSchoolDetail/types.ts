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
