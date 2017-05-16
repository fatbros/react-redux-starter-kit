const fs = require('fs-extra')
const webpack = require('webpack')
const path = require('path')
const logger = require('../lib/logger')
const webpackConfig = require('../webpack.config')
const project = require('../../project.config')

// Wrapper around webpack to promisify its compiler and supply friendly logging
const webpackCompiler = (webpackConfig) =>
  new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        logger.error('Webpack compiler encountered a fatal error.', err)
        return reject(err)
      }

      const jsonStats = stats.toJson()
      logger.info('Webpack compiler finished.')
      logger.log(stats.toString({
        colors: true,
        chunks: false,
      }))

      if (jsonStats.errors.length > 0) {
        logger.error('Webpack compiler encountered errors.')
        logger.log(jsonStats.errors.join('\n'))
        return reject(new Error('Webpack compiler encountered errors'))
      } else if (jsonStats.warnings.length > 0) {
        logger.warn('Webpack compiler encountered warnings.')
        logger.log(jsonStats.warnings.join('\n'))
      }
      resolve(jsonStats)
    })
  })

const compile = () => Promise.resolve()
  .then(() => logger.info('Starting compiler...'))
  .then(() => webpackCompiler(webpackConfig))
  .then(() => {
    logger.info('Copying static public assets to output directory.')
    fs.copySync(
      path.resolve(project.basePath, 'public'),
      path.resolve(project.basePath, project.outDir)
    )
  })
  .then(() => logger.success('Compilation succeeded.'))
  .catch((err) => logger.error('Compilation failed.', err))

compile()
