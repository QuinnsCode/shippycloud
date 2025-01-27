import { Link, routes } from '@redwoodjs/router'

import OrderDatas from 'src/components/OrderData/OrderDatas'

export const QUERY = gql`
  query FindOrderDatas {
    orderDatas {
      id
      organizationId
      orderId
      data
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No orderDatas yet. '}
      <Link to={routes.newOrderData()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ orderDatas }) => {
  return <OrderDatas orderDatas={orderDatas} />
}
