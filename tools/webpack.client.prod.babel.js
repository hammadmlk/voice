import webpack from 'webpack'
import AssetsPlugin from 'assets-webpack-plugin'
import CONFIG from './webpack.base.babel'

const { CLIENT_ENTRY, CLIENT_OUTPUT, PUBLIC_PATH, HTML_WEBPACK_PLUGIN } = CONFIG

export default {
  devtool: false,
  entry: {
    main: [CLIENT_ENTRY],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-redux',
    ],
  },
  output: {
    filename: '[name]_[chunkhash].js',
    chunkFilename: '[name]_[chunkhash].js',
    publicPath: PUBLIC_PATH,
    path: CLIENT_OUTPUT,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      '__DEV__': false,
    }),
    HTML_WEBPACK_PLUGIN,
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', 2),
    new AssetsPlugin({ filename: 'assets.json' }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
    }),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-react-inline-elements'],
        },
        exclude: /(node_modules)/,
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
