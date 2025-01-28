import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import LogIn from 'src/components/AuthButtons/LogIn/LogIn'
import Endpoints from 'src/components/Endpoint/Endpoints'

export const QUERY = gql`
  query FindEndpointOfAnOrganization2($organizationId: String!) {
    endpointsOfAnOrganization(organizationId: $organizationId) {
      id
      organizationId
      name
      slug
      endpointType
      createdByUserId
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = ({ organizationId }) => {
  const { currentUser } = useAuth()
  return (
    <div className="rw-text-center">
      {'No endpoints yet. '}
      {currentUser ? (
        <Link
          to={routes.newEndpointUserOrg({
            userId: currentUser?.id,
            organizationId: organizationId,
          })}
          className="rw-link"
        >
          {'Create a test one?'}
        </Link>
      ) : (
        <LogIn />
      )}
    </div>
  )
}

export const Failure = ({ error }) => {
  return <div className="rw-cell-error">{error?.message}</div>
}

export const Success = ({ endpointsOfAnOrganization }) => {
  return <Endpoints endpoints={endpointsOfAnOrganization} />
  // return JSON.stringify(endpointsOfAnOrganization)
}
