'use client';

/* * */

import { Surface } from '@/components/layout/Surface';
import { PeriodsWidgetItem } from '@/components/periods/PeriodsWidgetItem';
import { DateTime } from 'luxon';
import { Fragment, useEffect, useState } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

interface PeriodsDataFormatted {
	id: string
	isActive: boolean
	name: string
	validPairs: {
		from: Date
		until: Date
	}[]
}

/* * */

export function PeriodsWidget() {
	//

	//
	// A. Setup variables

	const [periodsDataFormatted, setPeriodsDataFormatted] = useState<PeriodsDataFormatted[]>();

	//
	// B. Fetch data

	const { data: periodsData } = useSWR('https://api.carrismetropolitana.pt/periods'); // TODO: Replace with the correct API endpoint

	console.log(periodsData);

	//
	// C. Transform data

	useEffect(() => {
		const formatPeriodsData = () => {
			// Return early if no data is available
			if (!periodsData) return;
			// Setup the operational date time variable
			let operationDateTime = DateTime.now();
			// Get the current hour
			const currentHourString = operationDateTime.toFormat('H');
			// If the current hour is between 00:00 and 03:59 then set the current date to yesterday
			if (Number(currentHourString) >= 0 && Number(currentHourString) < 4) {
				operationDateTime = operationDateTime.minus({ days: 1 });
			}
			// Setup variable for the current date date in YYYYMMDD format using luxon
			const currentDayString = operationDateTime.toFormat('yyyyMMdd');
			// For each period, check if it contains the date for today
			const result = periodsData.map((period) => {
				// Filter valid pairs with 'until' dates before the current date
				const validPairsFiltered = period.valid.filter((validPair) => {
					return Number(validPair.until) >= Number(currentDayString);
				});
				// Format the valid pairs into the display format
				const validPairsFormatted = validPairsFiltered.map((validPair) => {
					const fromDateFormatted = DateTime.fromFormat(validPair.from, 'yyyyMMdd').toJSDate();
					const untilDateFormatted = DateTime.fromFormat(validPair.until, 'yyyyMMdd').toJSDate();
					return { from: fromDateFormatted, until: untilDateFormatted };
				});
				// Return the formatted period data
				return {
					id: period.id,
					isActive: period.dates.includes(currentDayString) ? true : false,
					name: period.name,
					validPairs: validPairsFormatted,
				};
			});
			// Set the formatted data
			setPeriodsDataFormatted(result);
			//
		};
		//
		formatPeriodsData();
		const interval = setInterval(() => formatPeriodsData(), 300000 /* 5 minutes */);
		return () => clearInterval(interval);
		//
	}, [periodsData]);

	//
	// D. Render components

	if (!periodsDataFormatted || periodsDataFormatted.length === 0) {
		return null;
	}

	return (
		<Surface variant="persistent">
			<div className={styles.container}>
				{periodsDataFormatted.map((item, index) => (
					<Fragment key={item.id}>
						{index > 0 && <div className={styles.divider} />}
						<PeriodsWidgetItem periodData={item} />
					</Fragment>
				))}
			</div>
		</Surface>
	);

	//
}
