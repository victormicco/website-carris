'use client';

import BlackHeader from '@/components/BlackHeader/BlackHeader';
import { IconDownload } from '@tabler/icons-react';
import Link from 'next/link';

import styles from './DownloadPDF.module.css';

export default function DownloadPDF({ school_id }) {
	return (
		<div className={styles.container}>
			<BlackHeader text="Descarregue PDF" />
			<div className={styles.wrapper}>
				<div className={styles.text}>Descarregue um PDF com a lista de paragens e linhas</div>
				<Link className={styles.buttonReady} href={`https://storage.carrismetropolitana.pt/static/pdfs/schools/${school_id}.pdf`} target="_blank">
					<IconDownload size={20} />
					<p>Descarregar PDF</p>
				</Link>
			</div>
		</div>
	);
}
