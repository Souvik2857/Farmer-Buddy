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
        pathname: `/${process.env.CLOUDINARY_NAME}/image/upload/**`
        ,
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: 'https://farmer-buddy-vtfw.onrender.com/api/v1/:path*',
      },
    ];
  }, 
};

export default nextConfig;
