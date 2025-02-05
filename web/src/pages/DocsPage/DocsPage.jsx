// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const DocsPage = () => {
  return (
    <>
      <Metadata title="Docs" description="Docs page" />

      <h1>DocsPage</h1>
      <p>
        Find me in <code>./web/src/pages/DocsPage/DocsPage.jsx</code>
      </p>
      {/*
           My default route is named `docs`, link to me with:
           `<Link to={routes.docs()}>Docs</Link>`
        */}
    </>
  )
}

export default DocsPage
