'use client';

/* * */

import { MupiStopsListToolbar } from '@/components/stops/MupiStopsListToolbar';
import { MupiStopsListViewAll } from '@/components/stops/MupiStopsListViewAll';
import { MupiStopsListViewMap } from '@/components/stops/MupiStopsListViewMap';
import { StopsListViewSkeleton } from '@/components/stops/StopsListViewSkeleton';
import { useStopsListContext } from '@/contexts/StopsList.context';

/* * */

export function MupiStopsList() {
	//

	//
	// A. Setup variables

	const stopsListContext = useStopsListContext();

	//
	// B. Render components

	return (
		<>
			<MupiStopsListToolbar />
			{stopsListContext.flags.is_loading && <StopsListViewSkeleton />}
			{(!stopsListContext.flags.is_loading && stopsListContext.filters.by_current_view === 'list') && <MupiStopsListViewAll />}
			{(!stopsListContext.flags.is_loading && stopsListContext.filters.by_current_view === 'map') && <MupiStopsListViewMap />}
		</>
	);

	//
}
