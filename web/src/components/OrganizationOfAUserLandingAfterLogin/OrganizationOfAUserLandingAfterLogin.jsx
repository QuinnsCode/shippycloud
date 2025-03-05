import { useMutation } from '@redwoodjs/web'
import { gql } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import UserAndOrganizationSettingsCell from 'src/components/UserAndOrganizationSettingsCell/UserAndOrganizationSettingsCell'

import NewUserFlow from '../NewUserFlow/NewUserFlow'
import ShippyCloudSkyBanner from '../shippyUi/ShippyCloudSkyBanner/ShippyCloudSkyBanner'

const UPDATE_ORGANIZATION_SETTINGS_FROM_SETUP = gql`
  mutation UpdateOrganizationSettings(
    $organizationId: String!
    $input: UpdateOrganizationSettingsInput!
  ) {
    updateOrganizationSettings(organizationId: $organizationId, input: $input) {
      organizationSettings
    }
  }
`

const UPDATE_USER_TO_HAVE_A_NAME = gql`
  mutation UpdateUserToHaveAName($id: String!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      name
    }
  }
`

const OrganizationOfAUserLandingAfterLogin = ({ organization, user }) => {
  console.log('organization------', user)
  const [updateOrganizationSetting] = useMutation(
    UPDATE_ORGANIZATION_SETTINGS_FROM_SETUP
  )

  const [updateUserToHaveAName] = useMutation(UPDATE_USER_TO_HAVE_A_NAME)

  const updateOrganizationSettingsInDB = async ({ organizationId, input }) => {
    try {
      const { data } = await updateOrganizationSetting({
        variables: {
          organizationId,
          input,
        },
      })

      toast.success('Organization settings updated successfully.')

      return !!data.updateOrganizationSettings
    } catch (error) {
      console.error('Error updating organization settings:', error)
      toast.error('Failed to update organization settings.')
      return false
    }
  }

  const updateUserToHaveANameInDB = async ({ id, input }) => {
    try {
      const { data } = await updateUserToHaveAName({
        variables: {
          id,
          input,
        },
      })

      toast.success('User name updated successfully.')

      return !!data.updateUserToHaveAName
    } catch (error) {
      console.error('Error updating user name:', error)
      toast.error('Failed to update user name.')
      return false
    }
  }

  return (
    <div className="text-left mx-2">
      <ShippyCloudSkyBanner>{'Features'}</ShippyCloudSkyBanner>
      <div className="pl-2 my-auto text-justify">
        {user?.id && organization ? (
          <UserAndOrganizationSettingsCell
            userId={user.id}
            organizationId={organization?.id}
          />
        ) : (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Please log in and select an organization to view settings.
                </p>
              </div>
            </div>
          </div>
        )}
        <NewUserFlow
          organizationId={organization.id}
          user={user}
          initialSettings={organization.organizationSettings} // Ensure correct initial settings
          updateOrganizationSettingsInDB={updateOrganizationSettingsInDB}
          updateUserToHaveANameInDB={updateUserToHaveANameInDB}
        />
      </div>
    </div>
  )
}

export default OrganizationOfAUserLandingAfterLogin
