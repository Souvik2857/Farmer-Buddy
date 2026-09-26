/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
   images: {
    remotePatterns: [
      {
        protocol: 'https' || 'http',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/deuhdw4fr/image/upload/**',
      },
    ],
  },
  
};

export default nextConfig;
