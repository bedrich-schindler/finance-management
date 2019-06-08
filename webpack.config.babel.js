const Path = require('path');
const OfflinePlugin = require('offline-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = [{
  devServer: {
    contentBase: './public',
    disableHostCheck: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    inline: true,
  },
  entry: {
    bundle: ['@babel/polyfill', Path.join(__dirname, 'src/main.jsx')],
  },
  module: {
    rules: [
      {
        include: Path.join(__dirname, 'src'),
        test: /\.(js|jsx)$/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            query: {
              importLoaders: 2,
              localIdentName: '[local]__[hash:base64:5]',
              modules: true,
            },
          },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true
            }
          }
        ]
      }
    ],
  },
  output: {
    filename: '[name].js',
    path: Path.join(__dirname, 'public'),
    publicPath: '/',
  },
  plugins: [
    new StyleLintPlugin({
      configFile: 'stylelint.config.js',
      syntax: 'scss',
    }),
    new OfflinePlugin({
      appShell: '/',
      externals: [
        '/',
        '/manifest.json',
        '/images/android-icon-36x36.png',
        '/images/android-icon-48x48.png',
        '/images/android-icon-72x72.png',
        '/images/android-icon-96x96.png',
        '/images/android-icon-144x144.png',
        '/images/android-icon-192x192.png',
        '/images/android-icon-192x192.png',
        '/images/apple-icon.png',
        '/images/apple-icon-57x57.png',
        '/images/apple-icon-72x72.png',
        '/images/apple-icon-76x76.png',
        '/images/apple-icon-114x114.png',
        '/images/apple-icon-120x120.png',
        '/images/apple-icon-144x144.png',
        '/images/apple-icon-152x152.png',
        '/images/apple-icon-180x180.png',
        '/images/apple-icon-precomposed.png',
        '/images/favicon.ico',
        '/images/favicon-16x16.png',
        '/images/favicon-32x32.png',
        '/images/favicon-32x32.png',
        '/images/favicon-96x96.png',
      ],
      caches: {
        main: [
          'index.html',
          'bundle.js'
        ],
        additional: [
          ':externals:'
        ],
      },
      publicPath: '/',
      safeToUseOptionalCaches: true,
      AppCache: {
        events: true
      },
      ServiceWorker: {
        events: true
      },
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: ['src', 'node_modules'],
  },
}];
