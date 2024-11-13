/* * */

import LiveIcon from '@/components/common/LiveIcon';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';
import { LineChart } from '@mantine/charts';
import { DateTime } from 'luxon';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

export function LinesDetailMetricsService() {
	//

	//
	// A. Define Variables

	const t = useTranslations('lines.LinesDetailMetrics');
	const linesDetailContext = useLinesDetailContext();

	//
	// B. Transform data

	const last15DaysService = useMemo(() => {
		if (!linesDetailContext.data.service_metrics) return [];
		linesDetailContext.data.service_metrics.sort((a, b) => Number(b.operational_day) - Number(a.operational_day));
		return linesDetailContext.data.service_metrics.slice(0, 15);
	}, [linesDetailContext.data.service_metrics]);

	const service15dayAverage = useMemo(() => {
		if (!last15DaysService) return 0;

		const { passTripCount, totalTripCount } = last15DaysService.reduce((acc, curr) => ({
			passTripCount: acc.passTripCount + Number(curr.pass_trip_count),
			totalTripCount: acc.totalTripCount + Number(curr.total_trip_count),
		}), { passTripCount: 0, totalTripCount: 0 });

		return (passTripCount / totalTripCount) * 100;
	}, [last15DaysService]);

	const service15DayDistribution = useMemo(() => {
		if (!last15DaysService) return [];

		return last15DaysService
			.map(service => ({
				operationalDay: service.operational_day,
				pass: service.pass_trip_count,
				percentage: service.pass_trip_percentage.toFixed(2),
				total: service.total_trip_count,
			}))
			.sort((a, b) => a.operationalDay.localeCompare(b.operationalDay))
			.map(item => ({ ...item, operationalDay: DateTime.fromFormat(item.operationalDay, 'yyyyMMdd').toFormat('dd LLL yyyy') }));
	}, [last15DaysService]);

	//
	// C. Render components

	if (!linesDetailContext.data.line) {
		return null;
	}

	return (
		<Surface>
			<Section withGap withPadding>

				<div className={styles.container}>
					<div className={styles.metricWrapper}>
						<div className={styles.bigNumberWrapper}>
							<h1 className={styles.bigNumber} style={{ color: linesDetailContext.data.line.color }}>{t('service.big_number', { value: service15dayAverage })}</h1>
							<LiveIcon className={styles.liveIcon} color={linesDetailContext.data.line.color} />
						</div>
						<h3 className={styles.subtitle}>{t('service.subtitle')}</h3>
						{/* <h3 className={styles.description}>{t('service.description')}</h3> */}
					</div>
					<div className={styles.metricWrapper} />
				</div>

				<LineChart
					color={linesDetailContext.data.line.color}
					curveType="natural"
					data={service15DayDistribution}
					dataKey="operationalDay"
					gridAxis="none"
					h={120}
					strokeWidth={5}
					styles={{ referenceLine: { strokeDasharray: '5 5' } }}
					withDots={false}
					withLegend={false}
					withTooltip={true}
					withXAxis={false}
					withYAxis={false}
					referenceLines={[
						{ color: 'var(--color-system-text-300)', label: '50%', labelPosition: 'insideBottomRight', y: 50 },
						{ color: 'var(--color-system-text-300)', label: '100%', labelPosition: 'insideBottomRight', y: 100 },
					]}
					series={[
						{
							color: linesDetailContext.data.line.color,
							label: t('service.label'),
							name: 'percentage',
						},
						{
							color: 'transparent',
							label: 'pass',
							name: 'pass',
							yAxisId: 'right',
						},
						{
							color: 'transparent',
							label: 'total',
							name: 'total',
							yAxisId: 'right',
						},
					]}
					withRightYAxis
				/>

			</Section>
		</Surface>
	);

	//
};
