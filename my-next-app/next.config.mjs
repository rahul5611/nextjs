/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/login',
                permanent: false, // Use `true` if this is a permanent redirect
            },
        ];
    },
};


export default nextConfig;
