'use client';

/* * */

import { Surface } from '@/components/layout/Surface';
import Lottie from 'lottie-react';
import { useTranslations } from 'next-intl';

import interRegionalAnimation from './inter-regional.json';
import longaAnimation from './longa.json';
import marAnimation from './mar.json';
import proximaAnimation from './proxima.json';
import rapidaAnimation from './rapida.json';
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
						<Lottie animationData={proximaAnimation} style={{ maxWidth: 65 }} />
						<h3 className={styles.title}>{t('proxima.title')}</h3>
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
						<Lottie animationData={longaAnimation} style={{ maxWidth: 65 }} />
						<h3 className={styles.title}>{t('longa.title')}</h3>
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
						<Lottie animationData={rapidaAnimation} style={{ maxWidth: 65 }} />
						<h3 className={styles.title}>{t('rapida.title')}</h3>
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
						<Lottie animationData={interRegionalAnimation} style={{ maxWidth: 65 }} />
						<h3 className={styles.title}>{t('inter-regional.title')}</h3>
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
						<Lottie animationData={marAnimation} style={{ maxWidth: 65 }} />
						<h3 className={styles.title}>{t('mar.title')}</h3>
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
