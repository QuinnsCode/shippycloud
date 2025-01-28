import { Link, routes } from '@redwoodjs/router'

import Endpoints from 'src/components/Endpoint/Endpoints'

export const QUERY = gql`
  query FindEndpoints {
    endpoints {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No endpoints yet. '}
      <Link to={routes.newEndpoint()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ endpoints }) => {
  return <Endpoints endpoints={endpoints} />
}
