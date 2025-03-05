import { toast } from 'sonner'

// import { routes, navigate } from '@redwoodjs/router'
// import { useMutation } from '@redwoodjs/web'
// import { toast } from '@redwoodjs/web/toast'

// import OrganizationMembers from 'src/components/OrganizationMembers/OrganizationMembers'
// import OrganizationSettings from 'src/components/OrganizationWidgets/OrganizationSettings/OrganizationSettings'
import OrgTile from 'src/components/shippyUi/OrgTile/OrgTile'

import OrganizationOfAUserLandingAfterLogin from '../OrganizationOfAUserLandingAfterLogin/OrganizationOfAUserLandingAfterLogin'
import ShippyCloudBanner from '../shippyUi/ShippyCloudBanner/ShippyCloudBanner'

// const DELETE_ORGANIZATION_MUTATION = gql`
//   mutation DeleteOrganizationMutation2($id: String!) {
//     deleteOrganization(id: $id) {
//       id
//     }
//   }
// `

const OrganizationOfUser = ({ organization, returnToWhere, user }) => {
  // const [deleteOrganization] = useMutation(DELETE_ORGANIZATION_MUTATION, {
  //   onCompleted: () => {
  //     toast.success('Organization deleted')
  //     navigate(routes.organizations())
  //   },
  //   onError: (error) => {
  //     toast.error(error.message)
  //   },
  // })

  // const onDeleteClick = (id) => {
  //   if (confirm('Are you sure you want to delete organization ' + id + '?')) {
  //     deleteOrganization({ variables: { id } }).then(() => {
  //       toast.success('Organization deleted')
  //       setTimeout(() => {
  //         navigate(routes.home())
  //       }, 1300)
  //     })
  //   }
  // }

  if (!organization) {
    console.log('there is no organization for OrganizationOfUser')
  }
  const orgSettings = JSON.parse(organization?.organizationSettings || '{}')

  if (!orgSettings) {
    console.log('orgSettings is null')
  }
  // console.log('orgSettings: ', { orgSettings })

  const hasChosenDisplayEmailOrName = orgSettings?.hasChosenDisplayEmailOrName
  let n = !hasChosenDisplayEmailOrName ? user?.email : user?.name

  // if (!n) {
  //   n = user?.email
  // }

  if (!n) {
    n = 'User'
  }

  //store user organanization name in window for use in the landing page
  window.orgName = n

  return (
    <>
      <div className="rw-segment w-full">
        {/* <OrgTile key={'orgTile1'}>
          <ShippyCloudBanner>Members</ShippyCloudBanner>
          {organization?.members ? (
            <OrganizationMembers members={organization.members} />
          ) : (
            "No members yet? How did that happen?? Don't float away"
          )}
        </OrgTile> */}
        <OrgTile key={'orgTile2'}>
          <div className="w-full items-center justify-center">
            <ShippyCloudBanner>Welcome: {n} </ShippyCloudBanner>
            <div className="w-full">
              <div className="w-full">
                {/* WE NEED TO ADD AN API KEY! */}
                DO WE HAVE AN API KEY?
              </div>

              <div className="w-full">
                {/* WE NEED TO GET EVENTS! */}
                DO WE HAVE EVENTS?
              </div>
              <div className="w-full">
                {/* WE NEED TO GET EVENTS! */}
                DO WE HAVE MEMBERS?
              </div>
              <OrganizationOfAUserLandingAfterLogin
                organization={organization}
                user={user}
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
