import { LAST_DATE } from '@/constants'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: `/featured/${LAST_DATE}`,
        permanent: false,
      },
    ]
  },
}

export default nextConfig
