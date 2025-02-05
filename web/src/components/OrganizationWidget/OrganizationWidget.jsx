import AppBoard from 'src/components/AppBoard/AppBoard'
import OrganizationWidgetCell from 'src/components/OrganizationWidgetCell/OrganizationWidgetCell'
import ShippyCloudColorfulBackground from 'src/components/shippyUi/ShippyCloudColorfulBackground/ShippyCloudColorfulBackground'
// show nothing if not logged in
const OrganizationWidget = ({ appId, currentUser }) => {
  return (
    <ShippyCloudColorfulBackground>
      {currentUser?.id ? (
        <div className="w-full">
          {appId ? (
            <div className="w-full">
              <AppBoard appId={appId} currentUser={currentUser} />
            </div>
          ) : (
            <OrganizationWidgetCell
              organizationId={appId}
              userId={currentUser?.id}
            />
          )}
        </div>
      ) : (
        <></>
      )}
    </ShippyCloudColorfulBackground>
  )
}

export default OrganizationWidget
