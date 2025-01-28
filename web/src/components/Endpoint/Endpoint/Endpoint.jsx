import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_ENDPOINT_MUTATION = gql`
  mutation DeleteEndpointMutation($id: String!) {
    deleteEndpoint(id: $id) {
      id
    }
  }
`

const Endpoint = ({ endpoint }) => {
  const [deleteEndpoint] = useMutation(DELETE_ENDPOINT_MUTATION, {
    onCompleted: () => {
      toast.success('Endpoint deleted')
      navigate(routes.endpoints())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete endpoint ' + id + '?')) {
      deleteEndpoint({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Endpoint {endpoint.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{endpoint.id}</td>
            </tr>
            <tr>
              <th>Organization id</th>
              <td>{endpoint.organizationId}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{endpoint.name}</td>
            </tr>
            <tr>
              <th>Slug</th>
              <td>{endpoint.slug}</td>
            </tr>
            <tr>
              <th>Endpoint type</th>
              <td>{endpoint.endpointType}</td>
            </tr>
            <tr>
              <th>Created by user id</th>
              <td>{endpoint.createdByUserId}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(endpoint.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(endpoint.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editEndpoint({ id: endpoint.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(endpoint.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Endpoint
