import { Hono } from 'hono'
import { jsx } from 'hono/jsx'
import { Top } from './Top'

const app = new Hono()

app.get('/', (c) => {
  return c.html(<Top />)
})

export default app