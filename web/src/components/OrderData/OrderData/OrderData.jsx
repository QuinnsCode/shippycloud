import { toast } from 'sonner'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
// import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_ORDER_DATA_MUTATION = gql`
  mutation DeleteOrderDataMutation($id: String!) {
    deleteOrderData(id: $id) {
      id
    }
  }
`

const OrderData = ({ orderData }) => {
  const [deleteOrderData] = useMutation(DELETE_ORDER_DATA_MUTATION, {
    onCompleted: () => {
      toast.success('OrderData deleted')
      navigate(routes.orderDatas())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete orderData ' + id + '?')) {
      deleteOrderData({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            OrderData {orderData.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{orderData.id}</td>
            </tr>
            <tr>
              <th>Organization id</th>
              <td>{orderData.organizationId}</td>
            </tr>
            <tr>
              <th>Order id</th>
              <td>{orderData.orderId}</td>
            </tr>
            <tr>
              <th>Data</th>
              <td>{orderData.data}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(orderData.createdAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editOrderData({ id: orderData.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(orderData.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default OrderData
