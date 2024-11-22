/* * */

import createNextIntlPlugin from 'next-intl/plugin'

/* * */

const withNextIntl = createNextIntlPlugin()

/* * */

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'cmet.pt',
        port: '',
        protocol: 'https',
      },
    ],
  },
  output: 'standalone',
  reactStrictMode: true,
  async redirects() {
    return [
      //
      { destination: '/lines', permanent: true, source: '/linhas' },
      { destination: '/lines', permanent: true, source: '/horarios' },
      //
      { destination: '/stops', permanent: true, source: '/paragens' },
      //
      { destination: '/vehicles', permanent: true, source: '/veiculos' },
      //
      { destination: '/stores', permanent: true, source: '/encm' },
      { destination: '/stores', permanent: true, source: '/lojas' },
      { destination: '/stores', permanent: true, source: '/espacos-navegante' },
      //
      { destination: '/tickets', permanent: true, source: '/tarifarios' },
      //
      { destination: 'https://backoffice.carrismetropolitana.pt/viagemvirtual', permanent: false, source: '/viagemvirtual' },
      { destination: 'https://backoffice.carrismetropolitana.pt/participe', permanent: false, source: '/participe' },
      //
      { destination: 'https://backoffice.carrismetropolitana.pt/motoristas', permanent: false, source: '/drivers' },
      { destination: 'https://backoffice.carrismetropolitana.pt/motoristas', permanent: false, source: '/motoristas' },
      //
      { destination: 'https://backoffice.carrismetropolitana.pt/novobanco', permanent: false, source: '/novobanco' },
      //
    ]
  },
}

/* * */

export default withNextIntl(nextConfig)
