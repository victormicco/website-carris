/* * */

import { withPayload } from '@payloadcms/next/withPayload';
import { type NextConfig } from 'next';

/* * */

const nextConfig: NextConfig = {
	basePath: '/admin',
	output: 'standalone',
	reactStrictMode: true,
};

/* * */

export default withPayload(nextConfig);
