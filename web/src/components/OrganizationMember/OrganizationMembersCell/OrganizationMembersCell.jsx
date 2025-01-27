import { Link, routes } from '@redwoodjs/router'

import OrganizationMembers from 'src/components/OrganizationMember/OrganizationMembers'

export const QUERY = gql`
  query FindOrganizationMembers {
    organizationMembers {
      id
      userId
      organizationId
      role
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No organizationMembers yet. '}
      <Link to={routes.newOrganizationMember()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ organizationMembers }) => {
  return <OrganizationMembers organizationMembers={organizationMembers} />
}
