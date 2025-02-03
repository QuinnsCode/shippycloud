// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import SignUpLogIn from 'src/components/SignUpLogIn/SignUpLogIn'
import WebhookEventsOfAnOrgCell from 'src/components/WebhookEventsOfAnOrgCell/WebhookEventsOfAnOrgCell'
import WhOrgEventStreamer from 'src/components/WHOrgEventStreamer/WHOrgEventStreamer'

const EventsPage = ({ appId, userId }) => {
  const { isAuthenticated } = useAuth()
  return (
    <>
      <Metadata title="Events" description="Events page" />

      <div>Events</div>
      <div className="">
        {/* <WebhookEventsOfAnOrgCell organizationId={appId} /> */}
        {isAuthenticated ? (
          <WhOrgEventStreamer organizationId={appId} />
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
