import OrderData from 'src/components/OrderData/OrderData'

export const QUERY = gql`
  query FindOrderDataById($id: String!) {
    orderData: orderData(id: $id) {
      id
      organizationId
      orderId
      data
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>OrderData not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ orderData }) => {
  return <OrderData orderData={orderData} />
}
