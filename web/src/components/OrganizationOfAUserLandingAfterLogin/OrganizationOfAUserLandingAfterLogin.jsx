import NewUserFlow from '../NewUserFlow/NewUserFlow'
import ShippyCloudSkyBanner from '../shippyUi/ShippyCloudSkyBanner/ShippyCloudSkyBanner'

const OrganizationOfAUserLandingAfterLogin = () => {
  return (
    <div className="text-left">
      <ShippyCloudSkyBanner>{'Features'}</ShippyCloudSkyBanner>
      <div className="pl-12 my-auto text-justify">
        {/* <h2>{'~Shipstation'}</h2>
        <h2>{'~Orders'}</h2>
        <h2>{'~Shipments'}</h2>
        <h2>{'~Tags'}</h2>
        <h2>{'~Products'}</h2>
        <h2>{'~Shopify'}</h2>
        <h2>{'~Etsy'}</h2>
        <h2>{'~Duoplane'}</h2>
        <h2>{'~Make'}</h2>
        <h2>{'~Recharge'}</h2>
        <h2>{'~Team chat'}</h2>
        <h2>{'~WooCommerce???'}</h2> */}
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ New USER flow
        {/* <h2>
          {
            'Give them a sandbox on the home static page! A simple try it out button'
          }
        </h2>
        <h2>{'Add a new organization'}</h2>
        <h2>{'Once the organization is created, they are the first admin'}</h2>
        <h2>{'Then the admin can invite other members to the organization'}</h2>
        <h2>{'The manager can then have permissions turned on or off'}</h2>
        <h2>
          {
            'The main difference between manager and admin is access to delete the org and access to view or edit the API keys'
          }
        </h2> */}
        <NewUserFlow />
        <h2>{''}</h2>
        <h2>{''}</h2>
        <h2>{''}</h2>
        <h2>{''}</h2>
        <h2>{''}</h2>
        <h2>{''}</h2>
      </div>
    </div>
  )
}

export default OrganizationOfAUserLandingAfterLogin
