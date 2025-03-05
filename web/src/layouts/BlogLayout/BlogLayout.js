import { Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import DraggableCornerButton from 'src/components/DraggableCornerButton/DraggableCornerButton'
import LoggedInDisplayUserName from 'src/components/Menu/LoggedInDisplayUserName/LoggedInDisplayUserName'
import MasterNav from 'src/components/Menu/MasterNav/MasterNav'
import ContentSidebar from 'src/components/Menu/MenuSidebar/ContentSidebar/ContentSidebar'
import MenuSidebar from 'src/components/Menu/MenuSidebar/MenuSidebar'
import MenuSidebarForNoOrgId from 'src/components/Menu/MenuSidebarForNoOrgId/MenuSidebarForNoOrgId'
import OrganizationHeader from 'src/components/Menu/OrganizationHeader/OrganizationHeader'
import VersionTopRightCorner from 'src/components/Menu/VersionTopRightCorner/VersionTopRightCorner'
import ShippyCloudHeader from 'src/components/shippyUi/ShippyCloudHeader/ShippyCloudHeader'
import { Toaster as SonnerToaster } from 'src/components/ui/sonner'
import { TooltipProvider } from 'src/components/ui/tooltip'
const BlogLayout = ({ children }) => {
  const { logOut, isAuthenticated, currentUser } = useAuth()

  //show the whole menu if logged in and we are on an org page
  const shouldShowMenu = isAuthenticated && children?.props?.params?.appId

  const shouldShowContentMenu =
    isAuthenticated &&
    (children?.props?.path?.includes('events') ||
      children?.props?.path?.includes('orders') ||
      children?.props?.path?.includes('products') ||
      children?.props?.path?.includes('tags') ||
      children?.props?.path?.includes('stores') ||
      children?.props?.path?.includes('shipments'))

  //show limited menu if logged in and we are on a blog page
  const shouldShowMenuForNoOrgId =
    !isAuthenticated && children?.props?.path?.includes('blog')

  const orgName = window?.orgName
  // alert(orgName)
  // if (!orgName) {
  //   orgName = children?.props?.params?.appId
  // }

  const viewHeight =
    'h-[calc(100vh-12rem)] sm:h-[calc(100vh-50rem)] md:h-[calc(100vh-50rem)] lg:h-[calc(100vh-50rem)] xl:h-[calc(100v-50remh)] 2xl:h-[calc(100vh-50rem)] z-20'
  const contentbarViewHeight = 'h-[calc(100vh-2rem)]'

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Toaster />
      <SonnerToaster richColors />
      <header className="sticky top-0 z-30 flex flex-wrap justify-between items-center pb-0 pt-0.5 px-3 md:px-8 bg-gradient-to-r from-blue-700 to-blue-800 via-blue-800 text-white">
        <VersionTopRightCorner versionString={' v1.0034'} />
        <ShippyCloudHeader />
        <nav className="flex items-center">
          <MasterNav isAuthenticated={isAuthenticated} logOut={logOut} />
          <LoggedInDisplayUserName
            isAuthenticated={isAuthenticated}
            currentUser={currentUser}
          />
        </nav>
        {children?.props?.params?.appId && (
          <OrganizationHeader displayName={orgName || ''} />
        )}
      </header>
      <TooltipProvider>
        {/* We have an organizationId via appId and are logged in so good to show */}
        {shouldShowMenu && !shouldShowMenuForNoOrgId ? (
          <div className={`flex relative overflow-clip`}>
            <aside className={`fixed left-0  ${viewHeight} w-[2rem]`}>
              <MenuSidebar
                appId={children?.props?.params?.appId}
                userId={currentUser?.id}
                logOut={logOut}
              />
            </aside>

            {/* Show the content menu on the right if we need to  */}
            {shouldShowContentMenu && (
              <aside className={`fixed -right-0 h-[calc(100vh-2rem)] z-20`}>
                <ContentSidebar appId={children?.props?.params?.appId} />
              </aside>
            )}

            {/* FLOATING HELPER */}
            <DraggableCornerButton />

            {/* MAIN CONTENT */}
            <main className="flex-1 ml-0 pl-0 overflow-y-auto">
              <div className="bg-white shadow rounded-b fixed left-[3rem] w-[calc(100vw-2rem)]">
                {children}
              </div>
            </main>
          </div>
        ) : (
          <div className="flex relative">
            <aside className={`fixed left-0 ${viewHeight} w-14`}>
              <MenuSidebarForNoOrgId
                appId={children?.props?.params?.appId}
                userId={currentUser?.id}
                logOut={logOut}
              />
            </aside>
            <main className="flex-1 ml-0 pl-0 overflow-y-auto">
              <div className="bg-white shadow rounded-b fixed left-16 w-[calc(100vw-4.5rem)]">
                {children}
              </div>
            </main>
          </div>
        )}
      </TooltipProvider>
    </div>
  )
}

export default BlogLayout
