// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import SignUpLogIn from 'src/components/AuthButtons/SignUpLogIn/SignUpLogIn'
import WebhookEventsOfAnOrgCell from 'src/components/WebhookEventsOfAnOrgCell/WebhookEventsOfAnOrgCell'
import WhOrgEventStreamer from 'src/components/WHOrgEventStreamer/WHOrgEventStreamer'

const EventsPage = ({ appId, userId }) => {
  const { isAuthenticated } = useAuth()
  return (
    <>
      <Metadata title="Events" description="Events page" />

      <div className="">
        {/* <WebhookEventsOfAnOrgCell organizationId={appId} /> */}
        {isAuthenticated ? (
          <>
            <div>Events</div>
            <WhOrgEventStreamer organizationId={appId} />
          </>
        ) : (
          <>
            <SignUpLogIn />
          </>
        )}
      </div>
    </>
  )
}

export default EventsPage
