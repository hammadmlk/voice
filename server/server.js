import express from 'express'
import socketio from './socketio'

const __PROD__ = process.env.NODE_ENV === 'production'
const __TEST__ = process.env.NODE_ENV === 'test'
const PORT = process.env.PORT || 3000

const app = express()

if (__PROD__ || __TEST__) {
  const config = require('../tools/webpack.client.prod.babel').default
  app.use(config.output.publicPath, express.static(config.output.path))
  app.get('*', (req, res) => res.sendFile(config.output.path + '/index.html'))
} else {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('../tools/webpack.client.dev.babel').default

  const compiler = webpack(config)

  // https://github.com/webpack/webpack-dev-middleware
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true,
  }))

  // https://github.com/glenjamin/webpack-hot-middleware
  app.use(webpackHotMiddleware(compiler, {
    log: console.warn,
    publicPath: config.output.publicPath,
    stats: {colors: true},
  }))

  app.get('*', (req, res) => res.sendFile(config.output.path + '/index.html'))
}

const server = app.listen(PORT, () => console.info('listening on port: ' + PORT))
socketio(server)
