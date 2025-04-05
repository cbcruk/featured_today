import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/*': ['./db/kr.db'],
  },
}

export default nextConfig
