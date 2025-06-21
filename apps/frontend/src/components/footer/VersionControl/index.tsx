'use client';

/* * */

import { URLS } from '@/settings/urls.settings';
import Link from 'next/link';
import pjson from 'package.json';

/* * */

export function VersionControl({ className }) {
	console.log('version', pjson);
	return (
		<Link className={className} href={URLS.repos.website} target="_blank">
			{pjson.version}
		</Link>
	);
}
