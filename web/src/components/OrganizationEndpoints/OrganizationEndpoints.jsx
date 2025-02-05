import EndpointsOfAnOrganizationCell from 'src/components/Endpoint/EndpointsOfAnOrganizationCell/EndpointsOfAnOrganizationCell'
import OrgTile from 'src/components/shippyUi/OrgTile/OrgTile'

import ShippyCloudBanner from '../shippyUi/ShippyCloudBanner/ShippyCloudBanner'

const OrganizationEndpoints = ({ organization, returnToWhere }) => {
  return (
    <>
      <div className="rw-segment w-full">
        <OrgTile key={'orgTile3'}>
          <ShippyCloudBanner>Endpoints</ShippyCloudBanner>

          <EndpointsOfAnOrganizationCell organizationId={organization.id} />
        </OrgTile>

        <div className="my-8"></div>
      </div>
    </>
  )
}

export default OrganizationEndpoints
