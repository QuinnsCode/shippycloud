import OrganizationMember from 'src/components/OrganizationMember/OrganizationMember'

export const QUERY = gql`
  query FindOrganizationMemberById($id: Int!) {
    organizationMember: organizationMember(id: $id) {
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

export const Empty = () => <div>OrganizationMember not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ organizationMember }) => {
  return <OrganizationMember organizationMember={organizationMember} />
}
