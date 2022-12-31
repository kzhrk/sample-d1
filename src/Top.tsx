import { jsx } from 'hono/jsx'
import { Layout } from './Layout'

export const Top = () => {
  return (
    <Layout>
      <h1>
        <a href='/'>Hello D1!</a>
      </h1>
      <p>TOP Page</p>
    </Layout>
  )
}