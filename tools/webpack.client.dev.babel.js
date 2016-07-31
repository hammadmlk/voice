import webpack from 'webpack'
import AssetsPlugin from 'assets-webpack-plugin'

import CONFIG from './webpack.base.babel'
const { CLIENT_ENTRY, CLIENT_OUTPUT, PUBLIC_PATH, HTML_WEBPACK_PLUGIN } = CONFIG

export default {
  devtool: 'cheap-module-inline-source-map',
  entry: {
    main: [
      'webpack/hot/only-dev-server',
      'webpack-hot-middleware/client',
      CLIENT_ENTRY,
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-redux',
    ],
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: PUBLIC_PATH,
    path: CLIENT_OUTPUT,
  },
  plugins: [
    HTML_WEBPACK_PLUGIN,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', 2),
    new webpack.NoErrorsPlugin(),
    new AssetsPlugin({ filename: 'assets.json' }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      '__DEV__': true,
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel?' + JSON.stringify({cacheDirectory: true, presets: ['es2015', 'react', 'stage-0']})],
        exclude: /(node_modules|server)/,
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]', 'sass'],
      },
    ],
  },
  resolve: {
    root: CLIENT_ENTRY,
  },
}
