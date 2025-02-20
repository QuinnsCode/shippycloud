import PostHogTestButton from 'src/components/PostHogTestButton/PostHogTestButton'
import { ShipstationQueries } from 'src/gql/shipstation'

import ShipstationOrderCard from '../ShipstationOrderCard/ShipstationOrderCard'
import ShipstationShipmentCard from '../ShipstationShipmentCard/ShipstationShipmentCard'

export const QUERY = ShipstationQueries.GET_SHIPSTATION

export const Loading = ({ organizationId }) => (
  <div>Loading {organizationId}...</div>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ shipders }) => {
  const shipdersData = JSON.parse(shipders?.data)
  // console.log({ shipdersData })
  return (
    <>
      <div className="w-full">{/* <PostHogTestButton /> */}</div>
      {shipdersData?.shipments ? (
        <ShipstationShipments shipments={shipdersData?.shipments} />
      ) : (
        <></>
      )}
      {shipdersData?.orders ? (
        <ShipstationOrders orders={shipdersData?.orders} />
      ) : (
        <></>
      )}
      {/* {!shipdersData?.orders && !shipdersData?.shipments && 'Somethiing'} */}
    </>
  )
}

const ShipstationShipments = ({ shipments }) => {
  return (
    <div className="mx-24">
      <h2>Shipments - Fetcher cell</h2>
      {shipments?.map((shipment) => (
        <ShipstationShipmentCard key={shipment.id} shipment={shipment} />
      ))}
    </div>
  )
}

const ShipstationOrders = ({ orders }) => {
  return (
    <div className="w-full">
      {orders?.map((order) => (
        <>
          {order?.orderId !== null && order?.orderId !== undefined && (
            <ShipstationOrderCard key={order.orderId} order={order} />
          )}
        </>
      ))}
    </div>
  )
}
