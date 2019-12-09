const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const { ErrorModel } = require('./model/ResModel')
const { serverFileInfo } = require('./model/ErrorInfo')

const index = require('./routes/api/v1')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// routes
app.use(index.routes(), index.allowedMethods())

// 全局错误处理
onerror(app, {
  json () {
    this.status = 500
    this.body = new ErrorModel(serverFileInfo)
  }
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
