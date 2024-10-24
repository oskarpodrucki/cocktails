/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**", // Akceptowanie wszystkich domen HTTPS
				pathname: "**", // Akceptowanie wszystkich ścieżek
			},
			{
				protocol: "http",
				hostname: "**", // Akceptowanie wszystkich domen HTTP
				pathname: "**", // Akceptowanie wszystkich ścieżek
			},
		],
	},
};

export default nextConfig;