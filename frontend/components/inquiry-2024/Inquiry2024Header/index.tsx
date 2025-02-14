/* * */

import Button from '@/components/common/Button';
import { Link } from '@/components/common/Link';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */
export function Inquiry2024Header() {
	//

	//
	// A. Setup variables

	const t = useTranslations('survey-2024.Survey2024Header');

	//

	// B. Render components

	return (
		<Surface>
			<Section withGap withPadding>

				<p className={styles.inquiryTitle}>{t('title')}</p>
				<div>
					<Link href="#aboutInquiry"><Button label={t('AnchorAboutInquiry')} /></Link>
					<Link href="#passangerChacterization"><Button label={t('AnchorPassengerCaracter')} /></Link>
					<Link href="#results"><Button label={t('AnchorResults')} /></Link>
					<Link href="#recomendationIndex"><Button label={t('AnchorIndex')} /></Link>
				</div>
				<div id="aboutInquiry">
					<p>olá ancora</p>
				</div>
				<div id="passengerChacterization">
					<p>olá ancora</p>
				</div>
				<div id="results">
					<p>olá ancora</p>
				</div>
				<div id="recomendationIndex">
					<p>olá ancora</p>
				</div>
			</Section>
		</Surface>
	);
	//
}
