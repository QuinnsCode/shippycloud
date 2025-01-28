import Endpoint from 'src/components/Endpoint/Endpoint'

export const QUERY = gql`
  query FindEndpointById($id: String!) {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Endpoint not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ endpoint }) => {
  return <Endpoint endpoint={endpoint} />
}
