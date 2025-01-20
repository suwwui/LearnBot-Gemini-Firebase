const path = require('path');

module.exports = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.js$/,
      include: [
        path.resolve(__dirname, 'node_modules/undici')
      ],
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'],
          plugins: ['@babel/plugin-proposal-private-methods']
        }
      }
    });

    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  }
};