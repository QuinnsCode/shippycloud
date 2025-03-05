import { toast } from 'sonner'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
// import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/OrderData/OrderDatasCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_ORDER_DATA_MUTATION = gql`
  mutation DeleteOrderDataMutation($id: String!) {
    deleteOrderData(id: $id) {
      id
    }
  }
`

const OrderDatasList = ({ orderDatas }) => {
  const [deleteOrderData] = useMutation(DELETE_ORDER_DATA_MUTATION, {
    onCompleted: () => {
      toast.success('OrderData deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete orderData ' + id + '?')) {
      deleteOrderData({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Organization id</th>
            <th>Order id</th>
            <th>Data</th>
            <th>Created at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {orderDatas.map((orderData) => (
            <tr key={orderData.id}>
              <td>{truncate(orderData.id)}</td>
              <td>{truncate(orderData.organizationId)}</td>
              <td>{truncate(orderData.orderId)}</td>
              <td>{truncate(orderData.data)}</td>
              <td>{timeTag(orderData.createdAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.orderData({ id: orderData.id })}
                    title={'Show orderData ' + orderData.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editOrderData({ id: orderData.id })}
                    title={'Edit orderData ' + orderData.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete orderData ' + orderData.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(orderData.id)}
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

export default OrderDatasList
