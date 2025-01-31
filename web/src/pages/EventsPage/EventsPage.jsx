// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const EventsPage = () => {
  return (
    <>
      <Metadata title="Events" description="Events page" />

      <h1>EventsPage</h1>
      <p>
        Find me in <code>./web/src/pages/EventsPage/EventsPage.jsx</code>
      </p>
      {/*
           My default route is named `events`, link to me with:
           `<Link to={routes.events()}>Events</Link>`
        */}
    </>
  )
}

export default EventsPage
