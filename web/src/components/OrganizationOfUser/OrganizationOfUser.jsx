import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import OrganizationMembers from 'src/components/OrganizationMembers/OrganizationMembers'
import OrganizationSettings from 'src/components/OrganizationWidgets/OrganizationSettings/OrganizationSettings'
import OrgTile from 'src/components/shippyUi/OrgTile/OrgTile'

import ShippyCloudBanner from '../shippyUi/ShippyCloudBanner/ShippyCloudBanner'

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
      <div className="rw-segment w-full">
        <OrgTile key={'orgTile1'}>
          <ShippyCloudBanner>Members</ShippyCloudBanner>
          <OrganizationMembers members={organization.members} />
        </OrgTile>
        <OrgTile key={'orgTile2'}>
          <div className="w-full items-center justify-center">
            <ShippyCloudBanner>Settings</ShippyCloudBanner>
            <div className="w-full">
              <OrganizationSettings
                id={organization.id}
                organizationSettings={organization.organizationSettings}
              />
            </div>
          </div>
        </OrgTile>

        <div className="my-8"></div>
      </div>
    </>
  )
}

export default OrganizationOfUser
