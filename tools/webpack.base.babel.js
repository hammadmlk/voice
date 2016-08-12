import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
  CLIENT_ENTRY: path.join(process.cwd(), 'client'),
  CLIENT_OUTPUT: path.join(process.cwd(), 'public/generated-assets'),
  SERVER_ENTRY: path.join(process.cwd(), 'server/server.js'),
  SERVER_OUTPUT: path.join(process.cwd(), 'build'),
  PUBLIC_PATH: '/assets',
  HTML_WEBPACK_PLUGIN: new HtmlWebpackPlugin({
    template: path.join(process.cwd(), 'client', 'index.html'),
    filename: 'index.html',
    inject: 'body',
  }),
}
