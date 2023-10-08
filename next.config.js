const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  /** Sass */
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

module.exports = nextConfig;
