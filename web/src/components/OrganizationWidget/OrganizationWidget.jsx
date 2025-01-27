import OrganizationWidgetCell from 'src/components/OrganizationWidgetCell/OrganizationWidgetCell'

const OrganizationWidget = ({ appId, currentUser }) => {
  let organizationId = ''
  let userId = ''

  return (
    <div>
      <OrganizationWidgetCell organizationId={organizationId} userId={userId} />
    </div>
  )
}

export default OrganizationWidget
