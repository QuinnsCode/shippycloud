import OrganizationMemberList from 'src/components/OrganizationMemberList/OrganizationMemberList'

export const QUERY = gql`
  query FindOrganizationMembersWidgetQuery($id: String!) {
    organization: organization(id: $id) {
      id
      members {
        id
        user {
          id
          email
          name
        }
        userId
        role
        createdAt
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ organization, appId, currentUser }) => {
  return (
    <div>
      <OrganizationMemberList members={organization.members} appId={appId} />
    </div>
  )
}
