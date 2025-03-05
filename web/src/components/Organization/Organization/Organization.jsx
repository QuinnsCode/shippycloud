import { toast } from 'sonner'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
// import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_ORGANIZATION_MUTATION = gql`
  mutation DeleteOrganizationMutation($id: String!) {
    deleteOrganization(id: $id) {
      id
    }
  }
`

const Organization = ({ organization, returnToWhere }) => {
  const [deleteOrganization] = useMutation(DELETE_ORGANIZATION_MUTATION, {
    onCompleted: () => {
      toast.success('Organization deleted')
      navigate(routes.organizations())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete organization ' + id + '?')) {
      deleteOrganization({ variables: { id } }).then(() => {
        toast.success('Organization deleted')
        setTimeout(() => {
          navigate(routes.home())
        }, 1300)
      })
    }
  }

  const returnBack = (where) => {
    navigate(where)
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="">
            Detail for Organization :
            <br />
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{organization.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{organization.name}</td>
            </tr>
            <tr>
              <th>Domain</th>
              <td>{organization.domain}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(organization.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(organization.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        {/* <Link
          to={routes.editOrganization({ id: organization.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link> */}
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(organization.id)}
        >
          Delete
        </button>
        {returnToWhere ? (
          <Link to={returnToWhere} className="rw-button rw-button-blue">
            Return
          </Link>
        ) : (
          <></>
        )}
      </nav>
    </>
  )
}

export default Organization
