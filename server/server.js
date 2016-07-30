import express from 'express'

const __PROD__ = process.env.NODE_ENV === 'production'
const __TEST__ = process.env.NODE_ENV === 'test'
const PORT = process.env.PORT || 3000

const server = express()
const router = express.Router()

if (__PROD__ || __TEST__) {
  const config = require('../tools/webpack.client.prod.babel').default
  server.use(config.output.publicPath, express.static(config.output.path))
} else {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('../tools/webpack.client.dev.babel').default

  const compiler = webpack(config)
  const webpackMiddleware = webpackDevMiddleware(compiler, { quiet: true })
  server.use(webpackMiddleware)
  server.use(webpackHotMiddleware(compiler, {
    log: console.warn,
    publicPath: config.output.publicPath,
    stats: {colors: true},
  }))
}

server.use(router)
server.use(express.static('public'))

server.listen(PORT, () => console.log('listening on port: ' + PORT))
