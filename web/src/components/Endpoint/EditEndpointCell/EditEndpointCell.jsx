import { format } from 'date-fns'
import { toast } from 'sonner'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
// import { toast } from '@redwoodjs/web/toast'

import EndpointForm from 'src/components/Endpoint/EndpointForm'

export const QUERY = gql`
  query EditEndpointById($id: String!) {
    endpoint: endpoint(id: $id) {
      id
      organizationId
      name
      slug
      endpointType
      createdByUserId
      createdAt
      updatedAt
    }
  }
`

const UPDATE_ENDPOINT_MUTATION = gql`
  mutation UpdateEndpointMutation($id: String!, $input: UpdateEndpointInput!) {
    updateEndpoint(id: $id, input: $input) {
      id
      organizationId
      name
      slug
      endpointType
      createdByUserId
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ endpoint }) => {
  const [updateEndpoint, { loading, error }] = useMutation(
    UPDATE_ENDPOINT_MUTATION,
    {
      onCompleted: () => {
        const now = new Date()
        const formattedDate = format(now, "EEEE, MMMM dd, yyyy 'at' hh:mm a")

        const descriptionStr = `Endpoint updated at: ${formattedDate} `
        toast.success('Endpoint updated', {
          description: descriptionStr,
          action: {
            // label: 'Undo',
            // onClick: () => console.log('Undo'),
          },
        })
        navigate(routes.endpoints())
      },
      onError: (error) => {
        const descriptionStr = `Error: ${error?.message} `
        toast.error('Endpoint updated', {
          description: descriptionStr,
          action: {
            // label: 'Undo',
            // onClick: () => console.log('Undo'),
          },
        })
      },
    }
  )

  const onSave = (input, id) => {
    updateEndpoint({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Endpoint {endpoint?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <EndpointForm
          endpoint={endpoint}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
