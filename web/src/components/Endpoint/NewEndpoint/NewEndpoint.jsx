import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import EndpointForm from 'src/components/Endpoint/EndpointForm'

const CREATE_ENDPOINT_MUTATION = gql`
  mutation CreateEndpointMutation($input: CreateEndpointInput!) {
    createEndpoint(input: $input) {
      id
    }
  }
`

const NewEndpoint = ({ userId, organizationId }) => {
  const [createEndpoint, { loading, error }] = useMutation(
    CREATE_ENDPOINT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Endpoint created')
        navigate(routes.endpoints())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createEndpoint({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Endpoint</h2>
      </header>
      <div className="rw-segment-main">
        <EndpointForm
          onSave={onSave}
          loading={loading}
          error={error}
          userId={userId}
          organizationId={organizationId}
        />
      </div>
    </div>
  )
}

export default NewEndpoint
