/** @type {import('next').NextConfig} */



const securityHeaders = [
    {
      key: 'X-Frame-Options',
      value: 'https://macautravelsurvey2024.com/'
    },
  ]

const nextConfig = {
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "https://macautravelsurvey2024.com/" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,POST" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            },
            {
                // Apply these headers to all routes in your application.
                source: '/(.*)',
                headers: securityHeaders,
            },
        ]
    }
}

module.exports = {
    nextConfig,
    poweredByHeader: false,
  }
// export default nextConfig;
