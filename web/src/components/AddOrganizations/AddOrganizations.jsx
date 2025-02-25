import { useState } from 'react'

import SignUpOrganizationCard from 'src/components/OrganizationList/OrganizationList'

const AddOrganizations = ({ userId }) => {
  const [addingAnOrganization, setAddingAnOrganization] = useState(false)

  return (
    <>
      {!addingAnOrganization ? (
        <div className="w-full inline-flex justify-center h-full">
          <SignUpOrganizationCard
            userId={userId}
            index={0}
            setAddingAnOrganization={setAddingAnOrganization}
          />
        </div>
      ) : null}
    </>
  )
}
// const shippyCloudBaseButtonTainwildString =
//   'rw-button bg-gradient-to-r from-blue-600 via-blue-600 to-blue-500 text-white hover:bg-gradient-to-r hover:from-sky-500 hover:via-sky-600 hover:to-blue-500 hover:text-white'
// const AddAnOrganizationButton = ({ userId, addAnOrg }) => {
//   return (
//     <button
//       onClick={() => {
//         addAnOrg()
//       }}
//       className={`rw-button bg-black text-white ${shippyCloudBaseButtonTainwildString}`}
//     >
//       Add An Organization
//     </button>
//   )
// }

export default AddOrganizations
