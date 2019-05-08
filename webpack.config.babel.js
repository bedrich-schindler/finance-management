const Path = require('path');
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
    ],
  },
  output: {
    filename: '[name].js',
    path: Path.join(__dirname, 'public/generated'),
    publicPath: '/generated/',
  },
  plugins: [
    new StyleLintPlugin({
      configFile: 'stylelint.config.js',
      syntax: 'scss',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: ['src', 'node_modules'],
  },
}];
