'use client';

/* * */

import { DateTime } from 'luxon';
import { useQueryState } from 'nuqs';
import { createContext, useContext, useEffect, useState } from 'react';

import { useAnalyticsContext } from './Analytics.context';

/* * */

interface OperationalDateContextState {
	actions: {
		updateSelectedDay: (value: string) => void
		updateSelectedDayFromJsDate: (value: Date) => void
		updateSelectedDayToLessOneDay: () => void
		updateSelectedDayToPlusOneDay: () => void
		updateSelectedDayToToday: () => void
		updateSelectedDayToTomorrow: () => void
	}
	data: {
		selected_day: null | string
		selected_day_jsdate: Date | null
		today: null | string
		tomorrow: null | string
	}
	flags: {
		is_today_selected: boolean
		is_tomorrow_selected: boolean
	}
}

/* * */

const OperationalDateContext = createContext<OperationalDateContextState | undefined>(undefined);

export function useOperationalDateContext() {
	const context = useContext(OperationalDateContext);
	if (!context) {
		throw new Error('useOperationalDateContext must be used within a OperationalDateContextProvider');
	}
	return context;
}

/* * */

export const OperationalDateContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const [selectedDayQuery, setSelectedDayQuery] = useQueryState('day');
	const [selectedDay, setSelectedDay] = useState<null | string>(selectedDayQuery);
	const [selectedDayJsDate, setSelectedDayJsDate] = useState<Date | null>(null);

	const analyticsContext = useAnalyticsContext();

	//
	// B. Transform data

	const todayDateString = (() => {
		const now = DateTime.now();
		if (now.get('hour') < 4) {
			return now.minus({ days: 1 }).toFormat('yyyyMMdd');
		}
		return now.toFormat('yyyyMMdd');
	})();

	const tomorrowDateString = (() => {
		const now = DateTime.now();
		if (now.get('hour') < 4) {
			return now.toFormat('yyyyMMdd');
		}
		return now.plus({ days: 1 }).toFormat('yyyyMMdd');
	})();

	useEffect(() => {
		if (!selectedDay) {
			setSelectedDay(todayDateString);
		}

		setSelectedDayQuery(todayDateString === selectedDay ? null : selectedDay);
	}, [selectedDay]);

	useEffect(() => {
		if (!selectedDay) {
			setSelectedDayJsDate(null);
		}
		else {
			setSelectedDayJsDate(DateTime.fromFormat(selectedDay, 'yyyyMMdd').toJSDate());
		}
	}, [selectedDay]);

	//
	// C. Handle actions

	const updateSelectedDay = (value: string) => {
		setSelectedDay(value);
	};

	const updateSelectedDayFromJsDate = (value: Date) => {
		const valueAsString = DateTime.fromJSDate(value).toFormat('yyyyMMdd');
		setSelectedDay(valueAsString);

		if (valueAsString > todayDateString) {
			analyticsContext.actions.capture(ampli => ampli.datePeriodSelected({ date_value: 'Future' }));
		}
		else if (valueAsString < todayDateString) {
			analyticsContext.actions.capture(ampli => ampli.datePeriodSelected({ date_value: 'Past' }));
		}
	};

	const updateSelectedDayToToday = () => {
		setSelectedDay(todayDateString);
	};

	const updateSelectedDayToTomorrow = () => {
		setSelectedDay(tomorrowDateString);
	};

	const updateSelectedDayToPlusOneDay = () => {
		const selectedDayPlusOneDay = DateTime.fromFormat(selectedDay || todayDateString, 'yyyyMMdd').plus({ days: 1 }).toFormat('yyyyMMdd');
		setSelectedDay(selectedDayPlusOneDay);
	};

	const updateSelectedDayToLessOneDay = () => {
		const selectedDayPlusOneDay = DateTime.fromFormat(selectedDay || todayDateString, 'yyyyMMdd').minus({ days: 1 }).toFormat('yyyyMMdd');
		setSelectedDay(selectedDayPlusOneDay);
	};

	//
	// D. Define context value

	const contextValue: OperationalDateContextState = {
		actions: {
			updateSelectedDay,
			updateSelectedDayFromJsDate,
			updateSelectedDayToLessOneDay,
			updateSelectedDayToPlusOneDay,
			updateSelectedDayToToday,
			updateSelectedDayToTomorrow,
		},
		data: {
			selected_day: selectedDay,
			selected_day_jsdate: selectedDayJsDate,
			today: todayDateString,
			tomorrow: tomorrowDateString,
		},
		flags: {
			is_today_selected: selectedDay === todayDateString,
			is_tomorrow_selected: selectedDay === tomorrowDateString,
		},
	};

	//
	// E. Render components

	return (
		<OperationalDateContext.Provider value={contextValue}>
			{children}
		</OperationalDateContext.Provider>
	);

	//
};
