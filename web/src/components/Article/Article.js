import { format } from 'date-fns'

import { Link, routes } from '@redwoodjs/router'

const Article = ({ article }) => {
  const formatDistanceToNow = (date) => {
    const readableDate = format(date, 'MMMM do, yyyy') // Adjust this format string for additional readability
    return readableDate
  }
  return (
    <article>
      <header>
        <h2 className="text-xl text-blue-700 font-semibold px-2">
          <Link to={routes.article({ id: article.id })}>{article.title}</Link>
        </h2>
      </header>
      <hr />
      <div className="mt-2 text-gray-900 font-light px-3">{article.body}</div>
      <footer className="mt-4 text-gray-500">
        <div className="flex w-full  items-center space-x-2">
          <span className="text-sm text-right w-full px-4">
            {formatDistanceToNow(new Date(article.createdAt), {
              addSuffix: true,
            })}
          </span>
          {/* <span className="text-sm">by {article.author.name}</span> */}
        </div>
      </footer>
    </article>
  )
}

export default Article
