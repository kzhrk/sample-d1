import { jsx } from 'hono/jsx'
import { Layout } from './Layout'

export type Work = {
  id: string;
  title: string;
  body: string;
}

type Props = {
  works: Work[]
}

export const Top = (props: Props) => {
  return (
    <Layout>
      <h1>
        <a href='/'>Hello D1!</a>
      </h1>
      <form action="/post" method="POST">
        <label>
          <p>title</p>
          <input name='title' />
        </label>
        <label>
          <p>body</p>
          <input name='body' />
        </label>
        <input type='submit' />
      </form>
      {props.works.map((work) => {
        return (
          <article>
            <h2>{work.title}</h2>
            <p>{work.body}</p>
            <form action={`/post/${work.id}`} method="POST">
              <input type="hidden" name="_method" value="DELETE" /> 
              <input type="submit" value="delete" />
            </form>
          </article>
        )
      })}
    </Layout>
  )
}