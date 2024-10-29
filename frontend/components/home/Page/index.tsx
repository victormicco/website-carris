/* * */

import { FeaturedSection } from '@/components/home/FeaturedSection';
import { MainCarousel } from '@/components/home/MainCarousel';
import { MetricsSection } from '@/components/home/MetricsSection';
import { NewsSection } from '@/components/home/NewsSection';
import { QuickSearch } from '@/components/home/QuickSearch';
import { SchedulesSection } from '@/components/home/SchedulesSection';
import { SupportSection } from '@/components/home/SupportSection';
import { TarifsSection } from '@/components/home/TarifsSection';
import { Grid } from '@/components/layout/Grid';
import { BreakpointDesktop } from '@/components/responsive/BreakpointSwitch';

import styles from './styles.module.css';

/* * */

export function HomePage() {
	return (
		<>
			<Grid columns="ab" withGap>
				<BreakpointDesktop>
					<QuickSearch />
				</BreakpointDesktop>
				<div className={styles.carouselWrapper}>
					<MainCarousel />
				</div>
			</Grid>
			<SchedulesSection />
			<NewsSection />
			<TarifsSection />
			<SupportSection />
			{/* <MetricsSection /> */}
			<FeaturedSection />
		</>
	);
}
