/* * */

import { Surface } from '@/components/layout/Surface';
import LineBadge from '@/components/lines/LineBadge';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function Pricing() {
	//

	//
	// A. Setup variables

	const t = useTranslations('tickets.Pricing');

	//
	// B. Render components

	return (
		<>

			<Surface variant="persistent">
				<div className={styles.container}>
					<div className={styles.info}>
						<LineBadge color="var(--color-lines-proxima)" />
						<h3 className={styles.title}>{t('proxima.title')}</h3>
						<p className={styles.description}>{t('proxima.description')}</p>
					</div>
					<div className={styles.pricing}>
						<div className={styles.pricingItem}>
							<h3 className={styles.priceValue}>1,25€</h3>
							<p className={styles.priceLabel}>{t('ticket_types.onboard')}</p>
						</div>
						<div className={styles.pricingItem}>
							<h3 className={styles.priceValue}>0,85€</h3>
							<p className={styles.priceLabel}>{t('ticket_types.prepaid')}</p>
						</div>
					</div>
				</div>
			</Surface>

			<Surface variant="persistent">
				<div className={styles.container}>
					<div className={styles.info}>
						<LineBadge color="var(--color-lines-longa)" />
						<h3 className={styles.title}>{t('longa.title')}</h3>
						<p className={styles.description}>{t('longa.description')}</p>
					</div>
					<div className={styles.pricing}>
						<div className={styles.pricingItem}>
							<h3 className={styles.priceValue}>2,60€</h3>
							<p className={styles.priceLabel}>{t('ticket_types.onboard')}</p>
						</div>
						<div className={styles.pricingItem}>
							<h3 className={styles.priceValue}>1,55€</h3>
							<p className={styles.priceLabel}>{t('ticket_types.prepaid')}</p>
						</div>
					</div>
				</div>
			</Surface>

			<Surface variant="persistent">
				<div className={styles.container}>
					<div className={styles.info}>
						<LineBadge color="var(--color-lines-rapida)" />
						<h3 className={styles.title}>{t('rapida.title')}</h3>
						<p className={styles.description}>{t('rapida.description')}</p>
					</div>
					<div className={styles.pricing}>
						<div className={styles.pricingItem}>
							<h3 className={styles.priceValue}>4,50€</h3>
							<p className={styles.priceLabel}>{t('ticket_types.onboard')}</p>
						</div>
						<div className={styles.pricingItem}>
							<h3 className={styles.priceValue}>3,10€</h3>
							<p className={styles.priceLabel}>{t('ticket_types.prepaid')}</p>
						</div>
					</div>
				</div>
			</Surface>

			<Surface variant="persistent">
				<div className={styles.container}>
					<div className={styles.info}>
						<LineBadge color="var(--color-lines-inter-regional)" />
						<h3 className={styles.title}>{t('inter-regional.title')}</h3>
						<p className={styles.description}>{t('inter-regional.description')}</p>
					</div>
					<div className={styles.pricing}>
						<div className={styles.pricingItem}>
							<h3 className={styles.priceValue}>3,10€</h3>
							<p className={styles.priceLabel}>{t('ticket_types.onboard')}</p>
							<p className={styles.priceLabel}>{t('ticket_types.onboard_start_by_29')}</p>
						</div>
						<div className={styles.pricingItem}>
							<h3 className={styles.priceValue}>3,60€</h3>
							<p className={styles.priceLabel}>{t('ticket_types.onboard')}</p>
							<p className={styles.priceLabel}>{t('ticket_types.onboard_start_by_49')}</p>
						</div>
						<div className={styles.pricingItem}>
							<h3 className={styles.priceValue}>1,55€</h3>
							<p className={styles.priceLabel}>{t('ticket_types.prepaid')}</p>
						</div>
					</div>
				</div>
			</Surface>

			<Surface variant="persistent">
				<div className={styles.container}>
					<div className={styles.info}>
						<LineBadge color="var(--color-lines-mar)" />
						<h3 className={styles.title}>{t('mar.title')}</h3>
						<p className={styles.description}>{t('mar.description')}</p>
					</div>
					<div className={styles.pricing}>
						<div className={styles.pricingItem}>
							<h3 className={styles.priceValue}>4,50€</h3>
							<p className={styles.priceLabel}>{t('ticket_types.onboard')}</p>
						</div>
						<div className={styles.pricingItem}>
							<h3 className={styles.priceValue}>3,10€</h3>
							<p className={styles.priceLabel}>{t('ticket_types.prepaid')}</p>
						</div>
					</div>
				</div>
			</Surface>

		</>
	);

	//
}
