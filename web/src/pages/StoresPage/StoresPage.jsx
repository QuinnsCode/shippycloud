// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import ShipstationStoresCell from 'src/components/Shipstation/ShipstationStoresCell/ShipstationStoresCell'

const StoresPage = ({ appId }) => {
  return (
    <>
      <Metadata title="Stores" description="Stores page" />

      <ShipstationStoresCell
        organizationId={appId}
        shipstationUrl={'https://ssapi.shipstation.com/stores'}
      />
    </>
  )
}

export default StoresPage
