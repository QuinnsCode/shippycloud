import { Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import LoggedInDisplayUserName from 'src/components/Menu/LoggedInDisplayUserName/LoggedInDisplayUserName'
import MasterNav from 'src/components/Menu/MasterNav/MasterNav'
import MenuSidebar from 'src/components/Menu/MenuSidebar/MenuSidebar'
import OrganizationHeader from 'src/components/Menu/OrganizationHeader/OrganizationHeader'
import VersionTopRightCorner from 'src/components/Menu/VersionTopRightCorner/VersionTopRightCorner'
import ShippyCloudHeader from 'src/components/shippyUi/ShippyCloudHeader/ShippyCloudHeader'
const BlogLayout = ({ children }) => {
  const { logOut, isAuthenticated, currentUser } = useAuth()

  // console.log('children', children)
  return (
    <div className="w-full">
      {' '}
      <Toaster />
      <header className="relative z-20 flex justify-between items-center pb-0 pt-0.5 px-8 bg-gradient-to-r from-blue-700 to-blue-800 via-blue-800 text-white">
        <VersionTopRightCorner versionString={' v1.0034'} />
        <ShippyCloudHeader />
        <nav>
          <MasterNav isAuthenticated={isAuthenticated} logOut={logOut} />
          {
            <LoggedInDisplayUserName
              isAuthenticated={isAuthenticated}
              currentUser={currentUser}
            />
          }
        </nav>
        {children?.props?.params?.appId && (
          <OrganizationHeader
            displayName={children?.props?.params?.appId || ''}
          />
        )}
      </header>
      {/* only if authenticated AND there is an appId do we show the organization */}
      {isAuthenticated && children?.props?.params?.appId ? (
        <main className="relative flex">
          <div className="fixed 2xl:top-[100px] left-0 h-[calc(100vh-88px)] z-20">
            <MenuSidebar
              appId={children?.props?.params?.appId}
              userId={currentUser?.id}
              logOut={logOut}
            />
          </div>

          <div className="flex-1 ml-12 p-6">
            <div className="bg-white shadow rounded-b">{children}</div>
          </div>
        </main>
      ) : (
        <main className="max-w-7xl mx-auto bg-white shadow rounded-b">
          {children}
        </main>
      )}
    </div>
  )
}

export default BlogLayout
