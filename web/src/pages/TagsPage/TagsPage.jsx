// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import ShipstationTagsCell from 'src/components/Shipstation/ShipstationTagsCell'

const TagsPage = ({ appId }) => {
  // console.log('appId', appId)
  return (
    <>
      <Metadata title="Tags" description="Tags page" />

      <ShipstationTagsCell
        organizationId={appId}
        shipstationUrl={'https://ssapi.shipstation.com/accounts/listtags'}
      />
    </>
  )
}

export default TagsPage
