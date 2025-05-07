/* * */

import { withPayload } from '@payloadcms/next/withPayload';
import { type NextConfig } from 'next';

/* * */

const nextConfig: NextConfig = {
	output: 'standalone',
	reactStrictMode: true,
};

/* * */

export default withPayload(nextConfig);
// export default withPayload(nextConfig, { devBundleServerPackages: false });
