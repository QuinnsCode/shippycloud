// import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import OrganizationMembers from 'src/components/OrganizationMembers/OrganizationMembers'
import OrganizationMembersWidgetCell from 'src/components/OrganizationMembersWidgetCell/OrganizationMembersWidgetCell'
import OrgTile from 'src/components/shippyUi/OrgTile/OrgTile'
import ShippyCloudBanner from 'src/components/shippyUi/ShippyCloudBanner/ShippyCloudBanner'

const OrganizationMembersPage = ({ appId }) => {
  const addANewMember = (appId) => {
    // console.log('addANewMember: ', appId)
  }
  return (
    <>
      <div className="rw-segment w-full">
        <OrgTile key={'orgTile1'}>
          <ShippyCloudBanner>Members</ShippyCloudBanner>
          {/* <OrganizationWidgetCell
            organizationId={appId}
            userId={currentUser?.id}
          /> */}
          <OrganizationMembersWidgetCell
            id={appId}
            appId={appId}
            addANewMember={addANewMember}
          />
        </OrgTile>

        <div className="my-8"></div>
      </div>
    </>
  )
}

export default OrganizationMembersPage
