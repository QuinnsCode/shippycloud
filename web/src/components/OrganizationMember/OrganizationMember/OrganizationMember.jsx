import { toast } from 'sonner'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

// import { toast } from '@redwoodjs/web/toast'
import { timeTag } from 'src/lib/formatters'

const DELETE_ORGANIZATION_MEMBER_MUTATION = gql`
  mutation DeleteOrganizationMemberMutation($id: String!) {
    deleteOrganizationMember(id: $id) {
      id
    }
  }
`

const OrganizationMember = ({ organizationMember }) => {
  const [deleteOrganizationMember] = useMutation(
    DELETE_ORGANIZATION_MEMBER_MUTATION,
    {
      onCompleted: () => {
        toast.success('OrganizationMember deleted')
        navigate(routes.organizationMembers())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onDeleteClick = (id) => {
    if (
      confirm('Are you sure you want to delete organizationMember ' + id + '?')
    ) {
      deleteOrganizationMember({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            OrganizationMember {organizationMember.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{organizationMember.id}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{organizationMember.userId}</td>
            </tr>
            <tr>
              <th>Organization id</th>
              <td>{organizationMember.organizationId}</td>
            </tr>
            <tr>
              <th>Role</th>
              <td>{organizationMember.role}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(organizationMember.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(organizationMember.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        {/* <Link
          to={routes.editOrganizationMember({ id: organizationMember.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link> */}
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(organizationMember.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default OrganizationMember
