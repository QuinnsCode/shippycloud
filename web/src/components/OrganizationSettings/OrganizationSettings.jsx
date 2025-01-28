import { useState } from 'react'

import OrganizationEditOrgSettings from 'src/components/OrganizationEditOrgSettings/OrganizationEditOrgSettings'

const OrganizationSettings = ({ id, organizationSettings }) => {
  const [isOpen, setIsOpen] = useState(false)
  // const settings = JSON.parse(organizationSettings)
  // console.log('settings: ', { settings })
  return (
    <div className="w-full border-2 border-black rounded-md p-4">
      <div className="w-full inline-flex items-center justify-center">
        <button
          onClick={() => {
            setIsOpen(!isOpen)
          }}
          className="rw-button bg-black text-white"
        >
          Edit Settings?
        </button>
      </div>
      <div className="w-full text-black">{organizationSettings}</div>
      {isOpen && (
        <div className="w-full">
          <OrganizationEditOrgSettings
            id={id}
            organizationSettings={organizationSettings}
          />
        </div>
      )}
    </div>
  )
}

export default OrganizationSettings
