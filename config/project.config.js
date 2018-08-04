/* eslint key-spacing:0 spaced-comment:0 */
const path = require('path')
const debug = require('debug')('app:config:project')

debug('Creating default configuration.')
// ========================================================
// Default Configuration
// ========================================================
const NODE_ENV = process.env.NODE_ENV || 'development'

const __DEV__ = NODE_ENV === 'development'
const __TEST__ = NODE_ENV === 'test'
const __PROD__ = NODE_ENV === 'production'

const config = {
  env: NODE_ENV,
  __DEBUG__: (__DEV__ || __TEST__),
  devtool: __PROD__ ? null : 'source-map',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: path.resolve(__dirname, '..'),
  dir_client: 'src',
  dir_dist: 'dist',
  dir_public: 'public',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  rest_context_path: '/content',
  node_context_path: '/api',
  pay_pal_environment: ((__PROD__) ? 'production' : 'sandbox'),
  pay_pal_environment: ((__PROD__) ? 'production' : 'sandbox'),
}

// ------------------------------------
// Utilities
// ------------------------------------
function base(...paths) {
  return path.join(config.path_base, ...paths)
}

config.paths = {
  base: base,
  client: base.bind(null, config.dir_client),
  public: base.bind(null, config.dir_public),
  dist: base.bind(null, config.dir_dist),
}

module.exports = config
