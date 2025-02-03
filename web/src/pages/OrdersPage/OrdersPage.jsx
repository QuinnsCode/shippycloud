// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import OrdersOfAnOrg from 'src/components/OrdersOfAnOrg/OrdersOfAnOrg'

const OrdersPage = ({ appId, userId }) => {
  return (
    <>
      <Metadata title="Orders" description="Orders page" />

      <OrdersOfAnOrg appId={appId} userId={userId} />
    </>
  )
}

export default OrdersPage
