'use client';

/* * */

import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { type OperationalDate } from '@tmlmobilidade/types';
import { Dates } from '@tmlmobilidade/utils';
import { useQueryState } from 'nuqs';
import { createContext, useContext, useEffect, useState } from 'react';

/* * */

interface OperationalDateContextState {
	actions: {
		updateSelectedDay: (value: OperationalDate) => void
		updateSelectedDayFromJsDate: (value: Date) => void
		updateSelectedDayToLessOneDay: () => void
		updateSelectedDayToPlusOneDay: () => void
		updateSelectedDayToToday: () => void
		updateSelectedDayToTomorrow: () => void
	}
	data: {
		selected_date: Dates | null
		today: Dates
		tomorrow: Dates
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

	const analyticsContext = useAnalyticsContext();

	const [selectedDayQuery, setSelectedDayQuery] = useQueryState('date');
	const [selectedDate, setSelectedDate] = useState<Dates | null>(null);

	//
	// B. Transform data

	const todayDate = Dates
		.now()
		.setZone('Europe/Lisbon');

	const tomorrowDate = Dates
		.now()
		.setZone('Europe/Lisbon')
		.plus({ days: 1 });

	useEffect(() => {
		if (!selectedDate && selectedDayQuery) {
			const selectedDayValue = Dates
				.fromFormat(selectedDayQuery, 'yyyyMMdd')
				.set({ hour: 15 });
			setSelectedDate(selectedDayValue);
			return;
		}
		setSelectedDayQuery(todayDate.operational_date);
	}, [todayDate, selectedDayQuery, selectedDate]);

	//
	// C. Handle actions

	const updateSelectedDay = (value: string) => {
		const dateValue = Dates
			.fromFormat(value, 'yyyyMMdd')
			.set({ hour: 15 });
		setSelectedDate(dateValue);
	};

	const updateSelectedDayFromJsDate = (value: Date) => {
		const dateValue = Dates
			.fromJSDate(value)
			.set({ hour: 15 });
		setSelectedDate(dateValue);

		if (dateValue.operational_date > todayDate.operational_date) {
			analyticsContext.actions.capture(ampli => ampli.datePeriodSelected({ date_value: 'Future' }));
		}
		else if (dateValue.operational_date < todayDate.operational_date) {
			analyticsContext.actions.capture(ampli => ampli.datePeriodSelected({ date_value: 'Past' }));
		}
	};

	const updateSelectedDayToToday = () => {
		setSelectedDate(todayDate);
	};

	const updateSelectedDayToTomorrow = () => {
		setSelectedDate(tomorrowDate);
	};

	const updateSelectedDayToPlusOneDay = () => {
		if (!selectedDate) return;
		const dateValue = selectedDate?.plus({ days: 1 });
		setSelectedDate(dateValue);
	};

	const updateSelectedDayToLessOneDay = () => {
		if (!selectedDate) return;
		const dateValue = selectedDate?.minus({ days: 1 });
		setSelectedDate(dateValue);
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
			selected_date: selectedDate,
			today: todayDate,
			tomorrow: tomorrowDate,
		},
		flags: {
			is_today_selected: selectedDate?.operational_date === todayDate.operational_date,
			is_tomorrow_selected: selectedDate?.operational_date === tomorrowDate.operational_date,
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
