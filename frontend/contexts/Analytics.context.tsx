'use client';

/* * */

import { type Ampli, ampli } from '@/amplitude';
import pjson from '@/package.json';
import { DateTime } from 'luxon';
import { createContext, useContext, useEffect, useState } from 'react';

/* * */

const DECISION_EXPIRATION_IN_DAYS_YES = 365;
const DECISION_EXPIRATION_IN_DAYS_NO = 10;

const LOCAL_STORAGE_KEYS = {
	decision_date: 'analytics|decision_date',
	is_enabled: 'analytics|is_enabled',
};

/* * */

interface AnalyticsContextState {
	actions: {
		capture: (callback: (instance: Ampli) => void) => void
		disable: () => void
		enable: () => void
		reset: () => void
	}
	data: {
		is_enabled: 'no' | 'yes' | null
	}
	flags: {
		is_enabled: boolean
		should_ask: boolean
	}
}

/* * */

const AnalyticsContext = createContext<AnalyticsContextState | undefined>(undefined);

export function useAnalyticsContext() {
	const context = useContext(AnalyticsContext);
	if (!context) {
		throw new Error('useAnalyticsContext must be used within a AnalyticsContextProvider');
	}
	return context;
}

/* * */

export const AnalyticsContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const [dataIsEnabledState, setDataIsEnabledState] = useState<AnalyticsContextState['data']['is_enabled']>(null);

	const [flagIsEnabledState, setFlagIsEnabledState] = useState<AnalyticsContextState['flags']['is_enabled']>(false);
	const [flagShouldAskState, setFlagShouldAskState] = useState<AnalyticsContextState['flags']['should_ask']>(false);

	//
	// B. Fetch data

	useEffect(() => {
		// Get decision value from local storage
		if (typeof window === 'undefined') return;
		const isEnabledLocal = localStorage.getItem(LOCAL_STORAGE_KEYS.is_enabled);
		const decisionDateLocal = localStorage.getItem(LOCAL_STORAGE_KEYS.decision_date);
		// Check if the stored value is known
		if (isEnabledLocal !== 'yes' && isEnabledLocal !== 'no' && isEnabledLocal !== null) {
			reset();
			return;
		}
		// Check if stored date is in a valid format
		const decisionDateData = decisionDateLocal ? DateTime.fromFormat(decisionDateLocal, 'yyyyMMdd') : null;
		if (!decisionDateData?.isValid) {
			reset();
			return;
		};
		// Check if stored decision date has not expired
		const daysSinceLastDecision = DateTime.now().diff(decisionDateData, 'days');
		const yesDecisionIsExpired = dataIsEnabledState === 'yes' && daysSinceLastDecision.days > DECISION_EXPIRATION_IN_DAYS_YES;
		const noDecisionIsExpired = dataIsEnabledState === 'no' && daysSinceLastDecision.days > DECISION_EXPIRATION_IN_DAYS_NO;
		if (yesDecisionIsExpired || noDecisionIsExpired) {
			reset();
			return;
		}
		// Set local state
		setDataIsEnabledState(isEnabledLocal);
		setFlagShouldAskState(false);
	});

	//
	// C. Handle actions

	useEffect(() => {
		if (dataIsEnabledState === 'yes') {
			setFlagIsEnabledState(true);
		}
		else {
			setFlagIsEnabledState(false);
		}
	}, [dataIsEnabledState]);

	useEffect(() => {
		if (flagIsEnabledState) {
			ampli.load({ client: { configuration: { appVersion: pjson.version, autocapture: false } }, environment: 'default' });
			ampli.ping();
		}
	}, [flagIsEnabledState]);

	const enable = () => {
		// Set local state and save decision to local storage
		setDataIsEnabledState('yes');
		localStorage.setItem(LOCAL_STORAGE_KEYS.is_enabled, 'yes');
		localStorage.setItem(LOCAL_STORAGE_KEYS.decision_date, DateTime.now().toFormat('yyyyMMdd'));
	};

	const disable = () => {
		// Set local state and save decision to local storage
		setDataIsEnabledState('no');
		localStorage.setItem(LOCAL_STORAGE_KEYS.is_enabled, 'no');
		localStorage.setItem(LOCAL_STORAGE_KEYS.decision_date, DateTime.now().toFormat('yyyyMMdd'));
	};

	const reset = () => {
		// Set local state and save decision to local storage
		setDataIsEnabledState(null);
		localStorage.removeItem(LOCAL_STORAGE_KEYS.is_enabled);
		localStorage.removeItem(LOCAL_STORAGE_KEYS.decision_date);
		setFlagShouldAskState(true);
	};

	const capture = (callback: (instance: Ampli) => void) => {
		if (flagIsEnabledState && ampli) {
			callback(ampli);
		}
	};

	//
	// D. Define context value

	const contextValue: AnalyticsContextState = {
		actions: {
			capture,
			disable,
			enable,
			reset,
		},
		data: {
			is_enabled: dataIsEnabledState,
		},
		flags: {
			is_enabled: flagIsEnabledState,
			should_ask: flagShouldAskState,
		},
	};

	//
	// E. Render components

	return (
		<AnalyticsContext.Provider value={contextValue}>
			{children}
		</AnalyticsContext.Provider>
	);

	//
};
