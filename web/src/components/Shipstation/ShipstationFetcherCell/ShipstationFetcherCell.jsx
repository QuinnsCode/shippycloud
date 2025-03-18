import { useState } from 'react'

import PostHogTestButton from 'src/components/PostHogTestButton/PostHogTestButton'
import ShippyCloudFailure from 'src/components/shippyUi/ShippyCloudFailure/ShippyCloudFailure'
import ShippyCloudSearchBar from 'src/components/shippyUi/ShippyCloudSearchBar/ShippyCloudSearchBar'
import { ShipstationQueries } from 'src/gql/shipstation'

import ShipstationOrderCard from '../ShipstationOrderCard/ShipstationOrderCard'
import ShipstationShipmentCard from '../ShipstationShipmentCard/ShipstationShipmentCard'

export const QUERY = ShipstationQueries.GET_SHIPSTATION

export const Loading = ({ organizationId }) => (
  <div>Loading {organizationId}...</div>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <ShippyCloudFailure errorMessage={error?.message} />
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
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  return (
    <div className="w-full">
      <ShippyCloudSearchBar
        masterData={shipments}
        setSearchResults={setSearchResults}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        searchType={'shipstationShipments'}
      />
      {searchResults?.map((shipment) => (
        <ShipstationShipmentCard key={shipment.id} shipment={shipment} />
      ))}
    </div>
  )
}

const ShipstationOrders = ({ orders }) => {
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState([])

  return (
    <div className="w-full">
      <ShippyCloudSearchBar
        masterData={orders}
        setSearchResults={setSearchResults}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        searchType={'shipstationOrders'}
      />
      {searchResults?.map((order) => (
        <>
          {order?.orderId !== null && order?.orderId !== undefined && (
            <ShipstationOrderCard key={order.orderId} order={order} />
          )}
        </>
      ))}
    </div>
  )
}
