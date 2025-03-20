'use client';

/* * */

// import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { getUserLocale, setUserLocale } from '@/i18n/locale';
import { createContext, startTransition, useContext, useEffect, useMemo, useState } from 'react';

/* * */

interface LocaleContextState {
	actions: {
		setLocale: (value: string) => void
	}
	data: {
		current_locale: string | undefined
	}
}

/* * */

const LocaleContext = createContext<LocaleContextState | undefined>(undefined);

export function useLocaleContext() {
	const context = useContext(LocaleContext);
	if (!context) {
		throw new Error('useLocaleContext must be used within a LocaleContextProvider');
	}
	return context;
}

/* * */

export const LocaleContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	// const analyticsContext = useAnalyticsContext();

	const [dataCurrentLocaleState, setDataCurrentLocaleState] = useState<LocaleContextState['data']['current_locale']>();

	//
	// B. Handle actions

	const fetchLocaleCookie = async () => {
		console.log('fetchLocaleCookie ran now');
		// Get the user locale using server algorithm
		const locale = await getUserLocale();
		// Ensure the locale is saved in a cookie
		await setUserLocale(locale);
		// Update the context state
		setDataCurrentLocaleState(locale);
	};

	const setLocale = (value: string) => {
		startTransition(async () => {
			try {
				await setUserLocale(value);
				await fetchLocaleCookie();
				// analyticsContext.actions.capture(ampli => ampli.changeLocale(value));
			}
			catch (error) {
				console.error(error);
			}
		});
	};

	useEffect(() => {
		fetchLocaleCookie();
	}, []);

	//
	// C. Define context value

	const contextValue: LocaleContextState = useMemo(() => ({
		actions: {
			setLocale,
		},
		data: {
			current_locale: dataCurrentLocaleState,
		},
	}), [dataCurrentLocaleState]);

	//
	// D. Render components

	return (
		<LocaleContext.Provider value={contextValue}>
			{children}
		</LocaleContext.Provider>
	);

	//
};
