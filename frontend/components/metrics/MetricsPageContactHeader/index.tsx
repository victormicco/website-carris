/* * */

import { Text } from '@mantine/core';
import { IconTriangle } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

/* * */

interface Complaints {
	_id: number
	complaints: number
	email: number
	filter_value: string
	info_request: number
	other: number
	phone: number
	total: number
	type: string
}

interface Props {
	data: Complaints[]
}

export function MetricsPageContactsHeader({ data }: Props) {
	//

	//
	// A. Setup variables
	// const t = useTranslations('metrics.MetricsPageContactsSelector');
	const [phoneComplaints, setPhoneComplaints] = useState<number>(0);
	const [emailComplaints, setEmailComplains] = useState<number>(0);
	const [totalComplaints, setTotalComplains] = useState<number>(0);

	//
	// B. Fetch Data

	useEffect(() => {
		if (!data) return;

		const phoneComplaints = data.reduce((sum, item) => sum + item.phone, 0);
		const emailComplaints = data.reduce((sum, item) => sum + item.email, 0);
		const totalComplaints = data.reduce((sum, item) => sum + item.total, 0);

		setPhoneComplaints(phoneComplaints);
		setEmailComplains(emailComplaints);
		setTotalComplains(totalComplaints);
	}, [data]);

	//
	// C. Render Components

	return (

		<div className={styles.headerInfoContainer}>
			<Text className={styles.complaintsTotal}>{totalComplaints}</Text>
			<IconTriangle className={styles.headerIcon} size={50} />
			<div className={styles.headerComplementaryInfo}>
				<Text>{phoneComplaints}</Text>
				<Text>{emailComplaints}</Text>
			</div>
		</div>

	);

	//
}
