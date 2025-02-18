import ShipstationFetcherCell from 'src/components/Shipstation/ShipstationFetcherCell/ShipstationFetcherCell'
const OrdersOfAnOrg = ({ appId, userId }) => {
  let resourceUrl =
    'https://ssapi.shipstation.com/shipments?batchId=342961074&includeShipmentItems=True'
  return (
    <div>
      <ShipstationFetcherCell
        organizationId={appId}
        shipstationUrl={resourceUrl}
      />
    </div>
  )
}

export default OrdersOfAnOrg
