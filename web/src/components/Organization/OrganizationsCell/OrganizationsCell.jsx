import { Link, routes } from '@redwoodjs/router'

import Organizations from 'src/components/Organization/Organizations'

export const QUERY = gql`
  query FindOrganizations {
    organizations {
      id
      name
      domain
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No organizations yet. '}
      <Link to={routes.newOrganization()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ organizations }) => {
  return <Organizations organizations={organizations} />
}
