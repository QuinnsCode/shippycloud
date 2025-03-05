// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import OrganizationSettings from 'src/components/OrganizationWidgets/OrganizationSettings/OrganizationSettings'
import ShippyCloudPageContent from 'src/components/shippyUi/ShippyCloudPageContent/ShippyCloudPageContent'
import ShippyCloudPageHeader from 'src/components/shippyUi/ShippyCloudPageHeader/ShippyCloudPageHeader'
const SettingsPage = ({ appId, userId }) => {
  return (
    <>
      <Metadata title="Settings" description="Settings page" />

      {/* <ShippyCloudPageHeader>
        <p>Settings page header</p>
      </ShippyCloudPageHeader> */}
      <ShippyCloudPageContent>
        {/* <p>page content</p> */}
        {appId ? (
          <>
            <OrganizationSettings id={appId} userId={userId} />
          </>
        ) : (
          <></>
        )}
      </ShippyCloudPageContent>
    </>
  )
}

export default SettingsPage
