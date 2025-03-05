import { toast } from 'sonner'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
// import { toast } from '@redwoodjs/web/toast'

import OrderDataForm from 'src/components/OrderData/OrderDataForm'

export const QUERY = gql`
  query EditOrderDataById($id: String!) {
    orderData: orderData(id: $id) {
      id
      organizationId
      orderId
      data
      createdAt
    }
  }
`

const UPDATE_ORDER_DATA_MUTATION = gql`
  mutation UpdateOrderDataMutation(
    $id: String!
    $input: UpdateOrderDataInput!
  ) {
    updateOrderData(id: $id, input: $input) {
      id
      organizationId
      orderId
      data
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ orderData }) => {
  const [updateOrderData, { loading, error }] = useMutation(
    UPDATE_ORDER_DATA_MUTATION,
    {
      onCompleted: () => {
        toast.success('OrderData updated')
        navigate(routes.orderDatas())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateOrderData({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit OrderData {orderData?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <OrderDataForm
          orderData={orderData}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
