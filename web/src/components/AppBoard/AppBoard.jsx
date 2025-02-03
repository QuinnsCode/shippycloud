import { routes } from '@redwoodjs/router'

import OrganizationOfAUserCell from 'src/components/OrganizationOfAUserCell/OrganizationOfAUserCell'

const AppBoard = ({ appId, currentUser }) => {
  console.log('appId: ', appId, 'currentUser: ', currentUser)
  return (
    <div className="w-full my-24">
      {/* <div className="w-full my-24">{appId}</div> */}

      <div className="w-full my-24">
        <OrganizationOfAUserCell
          id={appId}
          userId={currentUser?.id}
          returnToWhere={routes.home()}
        />
      </div>
    </div>
  )
}

export default AppBoard
