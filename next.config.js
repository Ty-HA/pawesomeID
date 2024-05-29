/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // Note: we provide webpack as an argument to the function
      // to avoid needing to import webpack yourself.
      // Perform customizations to the configuration
      // Important: return the modified config
      return config;
    },
  };
  
  module.exports = nextConfig;