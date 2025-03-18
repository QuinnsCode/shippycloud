// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import OrganizationSettings from 'src/components/OrganizationWidgets/OrganizationSettings/OrganizationSettings'
import ShippyCloudColorfulBackground from 'src/components/shippyUi/ShippyCloudColorfulBackground/ShippyCloudColorfulBackground'
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

        <ShippyCloudColorfulBackground>
          {appId ? (
            <>
              <OrganizationSettings id={appId} userId={userId} />
            </>
          ) : (
            <></>
          )}
        </ShippyCloudColorfulBackground>
      </ShippyCloudPageContent>
    </>
  )
}

export default SettingsPage
