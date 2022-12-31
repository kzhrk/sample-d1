import { Hono } from 'hono'
import { jsx } from 'hono/jsx'
import { Top, Work } from './Top'
import { validator } from 'hono/validator'

interface Env {
  DB: D1Database
}

const app = new Hono<{ Bindings: Env }>()

app.get('/', async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT id,title,body FROM works;`
  ).all<Work>()
  const works = results
  return c.html(<Top works={works} />)
})

app.post(
  '/post',
  validator(
    (v) => ({
      title: v.body('title').isRequired(),
      body: v.body('body').isRequired(),
    }),
    {
      done: (res, c) => {
        if (res.hasError) {
          return c.redirect('/')
        }
      },
    }
  ),
  async (c) => {
    const { title, body } = c.req.valid()
    await c.env.DB.prepare(`INSERT INTO works(title, body) VALUES(?, ?);`)
      .bind(title, body)
      .run()
    return c.redirect('/')
  }
)

app.post(
  '/post/:id',
  validator(
    (v) => ({
      method: v.body('_method'),
    }),
    {
      done: (res, c) => {
        if (res.hasError) {
          return c.redirect('/')
        }
      },
    }
  ),
  async (c) => {
    const { method } = c.req.valid();

    if (method.toLowerCase() === 'delete') {
      const id = c.req.param('id');
      await c.env.DB.prepare(`DELETE FROM works WHERE id = '${id}'`)
        .run()
    }
    return c.redirect('/')
  }
)

export default app
