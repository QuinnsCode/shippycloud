import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import EndpointsOfAnOrganizationCell from 'src/components/Endpoint/EndpointsOfAnOrganizationCell/EndpointsOfAnOrganizationCell'
import OrganizationMembers from 'src/components/OrganizationMembers/OrganizationMembers'
import OrganizationSettings from 'src/components/OrganizationSettings/OrganizationSettings'
import { timeTag } from 'src/lib/formatters'

const DELETE_ORGANIZATION_MUTATION = gql`
  mutation DeleteOrganizationMutation2($id: String!) {
    deleteOrganization(id: $id) {
      id
    }
  }
`

const OrganizationOfUser = ({ organization, returnToWhere }) => {
  const [deleteOrganization] = useMutation(DELETE_ORGANIZATION_MUTATION, {
    onCompleted: () => {
      toast.success('Organization deleted')
      navigate(routes.organizations())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete organization ' + id + '?')) {
      deleteOrganization({ variables: { id } }).then(() => {
        toast.success('Organization deleted')
        setTimeout(() => {
          navigate(routes.home())
        }, 1300)
      })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <OrgTile key={'orgTile1'}>
          <p>Members</p>
          <OrganizationMembers members={organization.members} />
        </OrgTile>
        <OrgTile key={'orgTile2'}>
          <div className="w-full items-center justify-center">
            <div className="w-full">Settings</div>
            <div className="w-full">
              <OrganizationSettings
                id={organization.id}
                organizationSettings={organization.organizationSettings}
              />
            </div>
          </div>
        </OrgTile>
        <OrgTile key={'orgTile3'}>
          <p>Endpoints</p>

          <EndpointsOfAnOrganizationCell organizationId={organization.id} />
        </OrgTile>
        {/* <OrgTile key={'orgTile4'}>
          <p>Events</p>
          <WebhookEvents events={organization.webhooksEventLogs} />
        </OrgTile> */}

        <div className="my-8"></div>
      </div>
    </>
  )
}

const OrgTile = ({ children }) => {
  return (
    <div className="w-full border-2 border-black rounded-3xl p-4 items-center justify-center">
      <div className="w-full items-center justify-center">{children}</div>
    </div>
  )
}

export default OrganizationOfUser
