import AppBoard from 'src/components/AppBoard/AppBoard'
import OrganizationWidgetCell from 'src/components/OrganizationWidgetCell/OrganizationWidgetCell'

// show nothing if not logged in
const OrganizationWidget = ({ appId, currentUser }) => {
  return (
    <div className="border-2 border-black w-full">
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
    </div>
  )
}

export default OrganizationWidget
