const path = require('path');
const webpack = require('webpack');

require('dotenv').config({ path: './.env' });

module.exports = {
  entry: `./src/main.ts`,
  cache: false,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      zlib: false,
      https: false,
      http: false,
      stream: false,
      crypto: false,
      os: false,
      'magic-sdk': false,
      '@web3auth/web3auth': false,
      '@walletconnect/ethereum-provider': require.resolve('@walletconnect/ethereum-provider'),
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/builds'),
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        WALLET_CONNECT_PROJECT_ID: process.env.WALLET_CONNECT_PROJECT_ID,
      }),
    }),
  ],
};
