import Image from 'next/image';

import styles from './NaveganteCard.module.css';

import BlackHeader from '../BlackHeader/BlackHeader';

export default function NaveganteCard() {
	return (
		<div className={styles.caixa}>
			<BlackHeader text="Sobre o navegante®" />
			<a href="https://www.carrismetropolitana.pt/cartoes/" rel="noopener noreferrer" target="_blank">
				<div className={styles.imageContainer}>
					<div className={styles.imageWrapper}>
						<Image alt="Passe navegante" height={602} priority src="/images/navegante.png" style={{ height: '100%', width: '100%' }} width={852} />
					</div>
				</div>
			</a>
		</div>
	);
}
