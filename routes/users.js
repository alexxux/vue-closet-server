const router = require('koa-router')()
const db = require('../lib/dbquery.js')
const getuserid = require('../utils/userid.js')

router.prefix('/api')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.post('/register', async function (ctx, next) {
  const sss = getuserid()
  console.log(sss)
  const {username, pass, email, phone, sex} = await ctx.request.body
  if (!username || !pass || !email) {
    ctx.body = {
      code: -1,
      msg: '注册信息有误'
    }
  } else {
    const beforereg = 'SELECT username FROM users where username = (?)'
    const bfr = db.query(beforereg, username)
    await bfr.then((res) => {
      if (res.length) {
        ctx.body = {
          code: -1,
          msg:'用户名已存在'
        }
      } else {
        ctx.body = {
          msg: sss
        }
      }
    })
  }
})

router.get('/login', async (ctx, next) => {
  const sql = 'select * from users where username = (?) and password = (?)'
  const values = ['abcde', 123456]
  const d = db.query(sql, values)
  d.then((ctx) => {
    console.log(ctx)
  })
  const req = ctx.request.body
  ctx.body = await d
})

router.get('/getcolorlist', async (ctx, next) => {
  ctx.body = {
    code: 0,
    data:{
      colorlist: {
        '黑色': ['黑色','淡黑色',],
        '白色': ['纯白色','乳白色','米白色']
      }
    }
  }
})

module.exports = router
