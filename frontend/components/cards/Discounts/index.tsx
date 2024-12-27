/* * */

import { Surface } from '@/components/layout/Surface';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface Discount {
	_id: string
	href?: string
	price_metropolitano: number
	price_municipal?: number
}

/* * */

export const availableDiscounts: Discount[] = [
	{ _id: 'normal', price_metropolitano: 40, price_municipal: 30 },
	{ _id: 'sub23', href: 'https://www.navegante.pt/viajar/descontos#:~:text=consumo%20de%20energia.-,Gratuitidade%20para%20jovens%20estudantes,-Os%20jovens%20estudantes', price_metropolitano: 0 },
	{ _id: 'circula-pt-a', href: 'https://www.navegante.pt/viajar/descontos#:~:text=navegante%C2%AE%20fam%C3%ADlia-,Circula%20PT%20(anterior%20Social%20%2B),-O%20Circula%20PT', price_metropolitano: 20, price_municipal: 15 },
	{ _id: 'circula-pt-b', href: 'https://www.navegante.pt/viajar/descontos#:~:text=navegante%C2%AE%20fam%C3%ADlia-,Circula%20PT%20(anterior%20Social%20%2B),-O%20Circula%20PT', price_metropolitano: 30, price_municipal: 22.5 },
	{ _id: 'plus-65', href: 'https://www.navegante.pt/viajar/descontos#:~:text=operadores%20de%20transporte.-,%2B65%20anos%20e%20RP,-Se%20tem%20mais', price_metropolitano: 20 },
	{ _id: 'circula-pt-plus-65-a', href: 'https://www.navegante.pt/viajar/descontos#:~:text=navegante%C2%AE%20fam%C3%ADlia-,Circula%20PT%20(anterior%20Social%20%2B),-O%20Circula%20PT', price_metropolitano: 10 },
	{ _id: 'circula-pt-plus-65-b', href: 'https://www.navegante.pt/viajar/descontos#:~:text=navegante%C2%AE%20fam%C3%ADlia-,Circula%20PT%20(anterior%20Social%20%2B),-O%20Circula%20PT', price_metropolitano: 15 },
	{ _id: 'combatente-plus-65', href: 'https://www.navegante.pt/viajar/descontos#:~:text=os%20documentos%20originais.-,navegante%20antigo%20combatente,-O%20navegante%C2%AE%20antigo', price_metropolitano: 0 },
	{ _id: 'combatente-minus-65', href: 'https://www.navegante.pt/viajar/descontos#:~:text=os%20documentos%20originais.-,navegante%20antigo%20combatente,-O%20navegante%C2%AE%20antigo', price_metropolitano: 10, price_municipal: 0 },
	{ _id: 'family', href: 'https://www.navegante.pt/viajar/descontos#:~:text=Oriente%20e%20Aeroporto-,navegante%C2%AE%20fam%C3%ADlia,-O%20passe%20navegante', price_metropolitano: 80, price_municipal: 60 },
];

/* * */

export function Discounts() {
	//

	//
	// A. Setup variables

	const t = useTranslations('cards.Discounts');

	//
	// B. Render components

	return (
		availableDiscounts.map(discount => (
			<Surface key={discount._id} variant="persistent">
				<div className={styles.container}>
					<div className={styles.info}>
						<h3 className={styles.title}>{t(`products.${discount._id}.title`)}</h3>
						<p className={styles.description}>{t(`products.${discount._id}.description`)}</p>
						{discount.href && <Link className={styles.href} href={discount.href} target="_blank">{t(`products.${discount._id}.href_label`)}</Link>}
					</div>
					<div className={styles.pricing}>
						<div className={styles.pricingItem}>
							{discount.price_metropolitano === 0 && <h3 className={styles.priceValue}>{t('price_labels.free')}</h3>}
							{discount.price_metropolitano > 0 && <h3 className={styles.priceValue}>{t('price_labels.price', { value: discount.price_metropolitano })}</h3>}
							<p className={styles.priceLabel}>{t('pass_types.metropolitano')}</p>
							{discount._id === 'family' && <p className={styles.priceLabel}>{t('pass_types.family')}</p>}
						</div>
						<div className={styles.pricingItem}>
							{discount.price_municipal === undefined && <h3 className={`${styles.priceValue} ${styles.none}`}>{t('price_labels.none')}</h3>}
							{discount.price_municipal !== undefined && discount.price_municipal === 0 && <h3 className={styles.priceValue}>{t('price_labels.free')}</h3>}
							{discount.price_municipal !== undefined && discount.price_municipal > 0 && <h3 className={styles.priceValue}>{t('price_labels.price', { value: discount.price_municipal })}</h3>}
							<p className={`${styles.priceLabel} ${discount.price_municipal === undefined && styles.none}`}>{t('pass_types.municipal')}</p>
							{discount._id === 'family' && <p className={styles.priceLabel}>{t('pass_types.family')}</p>}
						</div>
					</div>
				</div>
			</Surface>
		))
	);

	//
}
