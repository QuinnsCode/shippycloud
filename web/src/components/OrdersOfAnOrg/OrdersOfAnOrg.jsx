import ShipstationFetcherCell from 'src/components/Shipstation/ShipstationFetcherCell/ShipstationFetcherCell'
const OrdersOfAnOrg = ({ appId }) => {
  //
  // const url1 =
  //   'https://ssapi.shipstation.com/shipments?batchId=342961074&includeShipmentItems=True'
  // const url2 =
  //   'https://ssapi.shipstation.com/shipments?includeShipmentItems=True'
  const url3 =
    'https://ssapi.shipstation.com/orders?orderStatus=awaiting_shipment'

  const resourceUrl = url3

  const marginOpts =
    'ml-2 mr-2 xs:ml-2 xs:mr-2 sm:ml-2 sm:mr-2 md:ml-24 md:mr-12 lg:ml-2 lg:mr-2 xl:ml-4 xl:mr-4 2xl:ml-24 2xl:mr-16'

  return (
    <div className={`max-h-[calc(100vh-5rem)] overflow-y-scroll ${marginOpts}`}>
      <ShipstationFetcherCell
        organizationId={appId}
        shipstationUrl={resourceUrl}
      />
    </div>
  )
}

export default OrdersOfAnOrg
