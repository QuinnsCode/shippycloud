import { useMutation } from '@redwoodjs/web'
import { gql } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

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
    <div className="text-left">
      <ShippyCloudSkyBanner>{'Features'}</ShippyCloudSkyBanner>
      <div className="pl-4 my-auto text-justify">
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
