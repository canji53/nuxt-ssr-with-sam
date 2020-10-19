'use strict'

const path = require('path')
const { loadNuxt } = require('nuxt')

const express = require('express')
const app = express()

const awsServerlessExpress = require('aws-serverless-express')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const srcDir = 'nuxt-app'

app.use(awsServerlessExpressMiddleware.eventContext())
app.use(
  '/_nuxt',
  express.static(path.join(__dirname, '.nuxt', 'dist', 'client'))
)
app.use('/static', express.static(path.join(__dirname, srcDir, 'static')))

async function start() {
  const nuxt = await loadNuxt('start')
  app.use(nuxt.render)
  return app
}

let server
exports.lambdaHandler = (event, context) => {
  start().then((app) => {
    if (server === undefined) {
      server = awsServerlessExpress.createServer(app)
    }
    awsServerlessExpress.proxy(server, event, context)
  })
}
