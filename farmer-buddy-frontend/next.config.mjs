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
        pathname: '/gnltwz1z/image/upload/**'
        //pathname: '/deuhdw4fr/image/upload/**',
      },
    ],
  },
  
};

export default nextConfig;
