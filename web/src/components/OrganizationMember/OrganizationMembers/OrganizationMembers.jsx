import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/OrganizationMember/OrganizationMembersCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_ORGANIZATION_MEMBER_MUTATION = gql`
  mutation DeleteOrganizationMemberFromMembersMutation($id: String!) {
    deleteOrganizationMember(id: $id) {
      id
    }
  }
`

const OrganizationMembersList = ({ organizationMembers }) => {
  const [deleteOrganizationMember] = useMutation(
    DELETE_ORGANIZATION_MEMBER_MUTATION,
    {
      onCompleted: () => {
        toast.success('OrganizationMember deleted')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
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
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>User id</th>
            <th>Organization id</th>
            <th>Role</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {organizationMembers.map((organizationMember) => (
            <tr key={organizationMember.id}>
              <td>{truncate(organizationMember.id)}</td>
              <td>{truncate(organizationMember.userId)}</td>
              <td>{truncate(organizationMember.organizationId)}</td>
              <td>{truncate(organizationMember.role)}</td>
              <td>{timeTag(organizationMember.createdAt)}</td>
              <td>{timeTag(organizationMember.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.organizationMember({
                      id: organizationMember.id,
                    })}
                    title={
                      'Show organizationMember ' +
                      organizationMember.id +
                      ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  {/* <Link
                    to={routes.editOrganizationMember({
                      id: organizationMember.id,
                    })}
                    title={'Edit organizationMember ' + organizationMember.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link> */}
                  <button
                    type="button"
                    title={'Delete organizationMember ' + organizationMember.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(organizationMember.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrganizationMembersList
