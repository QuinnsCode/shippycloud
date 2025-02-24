// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import ShipstationProductsCell from 'src/components/Shipstation/ShipstationProductsCell/ShipstationProductsCell'

const ProductsPage = ({ appId }) => {
  return (
    <>
      <Metadata title="Products" description="Products page" />

      <ShipstationProductsCell
        organizationId={appId}
        shipstationUrl={'https://ssapi.shipstation.com/products'}
      />
    </>
  )
}

export default ProductsPage
