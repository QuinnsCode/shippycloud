// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import ShippyCloudPageContent from 'src/components/shippyUi/ShippyCloudPageContent/ShippyCloudPageContent'
import ShippyCloudPageHeader from 'src/components/shippyUi/ShippyCloudPageHeader/ShippyCloudPageHeader'

const SettingsPage = () => {
  return (
    <>
      <Metadata title="Settings" description="Settings page" />

      <ShippyCloudPageHeader>
        <p>Settings page header</p>
      </ShippyCloudPageHeader>
      <ShippyCloudPageContent>
        <p>page content</p>
      </ShippyCloudPageContent>
    </>
  )
}

export default SettingsPage
