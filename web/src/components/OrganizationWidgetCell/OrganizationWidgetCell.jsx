import AddOrganizations from 'src/components/AddOrganizations/AddOrganizations'
import OrganizationList from 'src/components/OrganizationList/OrganizationList'
import ShippyCloudFailure from 'src/components/shippyUi/ShippyCloudFailure/ShippyCloudFailure'

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
  <ShippyCloudFailure errorMessage={error?.message} />
)

export const Success = ({ organizations, userId }) => {
  return (
    <div>
      <OrganizationList organizations={organizations} userId={userId} />
    </div>
  )
}
