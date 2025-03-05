import OrganizationOfUser from 'src/components/OrganizationOfUser/OrganizationOfUser'
export const QUERY = gql`
  query FindOrganizationOfAUserQuery($id: String!) {
    organizationOfAUser: organization(id: $id) {
      id
      name
      domain
      members {
        id
        user {
          id
          email
          name
        }
        userId
        role
      }

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

export const Success = ({
  organizationOfAUser,
  returnToWhere,
  currentUser,
}) => {
  return (
    <OrganizationOfUser
      user={currentUser}
      organization={organizationOfAUser}
      returnToWhere={returnToWhere}
    />
  )
}
