/* * */

import RegularListItem from '@/components/layout/RegularListItem';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import LineDisplay from '@/components/lines/LineDisplay';
import { useLinesListContext } from '@/contexts/LinesList.context';
import { RoutesSchedule } from '@/utils/routes';
import { ViewportList } from 'react-viewport-list';

/* * */

export function LinesListViewAll() {
	//

	//
	// A. Setup variables

	const linesListContext = useLinesListContext();

	//
	// B. Render components

	return (
		<Surface forceOverflow>
			<Section>
				<ViewportList itemMargin={0} items={linesListContext.data.filtered}>
					{item => (
						<RegularListItem key={item.id} href={`${RoutesSchedule.LINES.route}/${item.id}`}>
							<LineDisplay line={item} />
						</RegularListItem>
					)}
				</ViewportList>
			</Section>
		</Surface>
	);

	//
}
