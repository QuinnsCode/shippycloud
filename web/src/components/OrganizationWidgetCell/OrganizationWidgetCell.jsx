import AddOrganizations from 'src/components/AddOrganizations/AddOrganizations'
import OrganizationList from 'src/components/OrganizationList/OrganizationList'

export const QUERY = gql`
  query FindOrganizationWidgetQuery($userId: String!) {
    organizations: organizationsOfAUser(userId: $userId) {
      id
      name
      domain
      organizationSettings
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = ({ userId }) => (
  <div>
    <AddOrganizations userId={userId} />
  </div>
)

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ organizations, userId }) => {
  return (
    <div>
      <OrganizationList organizations={organizations} userId={userId} />
    </div>
  )
}
