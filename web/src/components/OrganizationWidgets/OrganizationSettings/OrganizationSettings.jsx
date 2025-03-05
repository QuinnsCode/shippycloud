import { useState } from 'react'

import OrganizationEditOrgSettings from 'src/components/OrganizationEditOrgSettings/OrganizationEditOrgSettings'

const OrganizationSettings = ({ id, organizationSettings }) => {
  const normalButtonString =
    'rw-button bg-gradient-to-br from-blue-500 via-sky-600  to-blue-700 hover:bg-gradient-to-br hover:from-blue-500 hover:via-sky-700 hover:to-blue-600 text-white font-bold rounded-lg focus:outline-none focus:shadow-outline w-full'

  return (
    <div className="w-full rounded-md p-4">
      <div className="w-full text-black">{organizationSettings}</div>

      <div className="w-full">
        <OrganizationEditOrgSettings
          id={id}
          organizationSettings={organizationSettings}
        />
      </div>
    </div>
  )
}

export default OrganizationSettings
