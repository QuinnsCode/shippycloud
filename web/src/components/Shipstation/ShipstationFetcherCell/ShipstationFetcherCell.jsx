export const QUERY = gql`
  query GetShipstation($shipstationUrl: String!, $organizationId: String!) {
    shipders: getShipstation(
      shipstationUrl: $shipstationUrl
      organizationId: $organizationId
    ) {
      data
    }
  }
`

export const Loading = ({ organizationId }) => (
  <div>Loading {organizationId}...</div>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ shipders }) => {
  const shipdersData = JSON.parse(shipders?.data)
  console.log({ shipdersData })
  return (
    <>
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
    </>
  )
}

const ShipstationShipments = ({ shipments }) => {
  return (
    <div>
      <h2>Shipments</h2>
      {shipments?.map((shipment) => (
        <ShipstationShipmentDisplay key={shipment.id} shipment={shipment} />
      ))}
    </div>
  )
}

const ShipstationShipmentDisplay = ({ shipment }) => {
  return (
    <div className="w-full border-b-2- border-black">
      <h3>{shipment.id}</h3>
      <p>{JSON.stringify(shipment)}</p>
    </div>
  )
}

const ShipstationOrders = ({ orders }) => {
  return (
    <div>
      <h2>Orders</h2>
      {orders.map((order) => (
        <div key={order.orderNumber}>
          <h3>{order.orderNumber}</h3>
          <p>{order.shipmentItems[0].item.name}</p>
        </div>
      ))}
    </div>
  )
}
