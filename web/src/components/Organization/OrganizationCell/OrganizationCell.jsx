import Organization from 'src/components/Organization/Organization'

export const QUERY = gql`
  query FindOrganizationById($id: String!) {
    organization: organization(id: $id) {
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

export const Empty = ({ returnToWhere }) => <div>Organization not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ organization, returnToWhere }) => {
  return (
    <Organization organization={organization} returnToWhere={returnToWhere} />
  )
}
