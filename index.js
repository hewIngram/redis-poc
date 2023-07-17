const Koa = require('koa');
const Router = require('@koa/router');
const { readValue, setValue } = require('./redis.js')

const app = new Koa();
const router = new Router();

const defaultValue = 'TEST VALUE'

router.get('/test', (ctx, next) => {
  ctx.body = 'Hello test'
})

router.get('/get-value/:key', async (ctx, next) => {
  const { key } = ctx.params
  const value = await readValue({
    key: key
  })
  console.log(value)
  if (value ===  null) {
    console.log('no value found for key, storing one')
    await setValue({
      key,
      value: 'TEST VALUE'
    })
  }
  ctx.body = `yo ${value || defaultValue}`
})

app.use(router.routes())
  .use(router.allowedMethods())

app.listen(1234)












// insertData({
//     key: 'test',
//     value: 'testvalue'
// })

// readValue({
//     key: 'test'
// }).then(value => {
//     console.log(value)
// })