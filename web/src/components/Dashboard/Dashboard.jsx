import OrganizationWidget from 'src/components/OrganizationWidget/OrganizationWidget'
import SetupWidget from 'src/components/SetupWidget/SetupWidget'

const Dashboard = ({ appId, currentUser }) => {
  return (
    <div>
      {/* <SetupWidget appId={appId} currentUser={currentUser} /> */}
      <OrganizationWidget appId={appId} currentUser={currentUser} />
    </div>
  )
}

export default Dashboard
