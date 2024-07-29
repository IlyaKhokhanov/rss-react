/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/page/1',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
