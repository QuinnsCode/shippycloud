import ShipstationFetcherCell from 'src/components/Shipstation/ShipstationFetcherCell/ShipstationFetcherCell'
const OrdersOfAnOrg = ({ appId, userId }) => {
  const resourceUrl =
    'https://ssapi.shipstation.com/shipments?batchId=342961074&includeShipmentItems=False'
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
