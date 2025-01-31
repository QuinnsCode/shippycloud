// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const OrdersPage = ({ appId, userId }) => {
  return (
    <>
      <Metadata title="Orders" description="Orders page" />

      <h1>OrdersPage</h1>
      <p>
        Find me in <code>./web/src/pages/OrdersPage/OrdersPage.jsx</code>
      </p>
      {/*
           My default route is named `orders`, link to me with:
           `<Link to={routes.orders()}>Orders</Link>`
        */}
    </>
  )
}

export default OrdersPage
