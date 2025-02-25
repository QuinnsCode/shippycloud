import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import SetupSettingsList from 'src/components/NewUserSetupFlow/SetupSettingsList/SetupSettingsList'
import { Card, CardContent } from 'src/components/ui/card'
// import { Switch } from 'src/components/ui/switch'
import useUserSettings from 'src/hooks/useUserSettings'

const UPDATE_USER_TO_HAVE_A_NAME = gql`
  mutation UpdateUserToHaveAName($id: String!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      name
    }
  }
`
const setupFlags = [
  {
    key: 'hasChosenDisplayEmailOrName',
    label: 'Display Email Or Name',
    description: 'Choose display name: email-or-name',
  },
  {
    key: 'hasAddedPaidShipstation',
    label: 'Paid Shipstation',
    description: 'Shipstation subscription activated',
  },
  {
    key: 'hasAddedShipstationKey',
    label: 'Shipstation API Key Added To Organization',
    description: 'Shipstation API key configuration complete',
  },
  {
    key: 'hasAddedManagers',
    label: 'Added Managers',
    description: 'Initial manager setup completed',
  },
  {
    key: 'hasAddedManagersTurnedOffAlerts',
    label: 'Manager Alerts Configured',
    description: 'Manager notification preferences set',
  },
  {
    key: 'hasAddedMembers',
    label: 'Added Members',
    description: 'Team members have been added',
  },
  {
    key: 'hasChosenOrganizationLoginLandingPage',
    label: 'Landing Page Set',
    description: 'Organization login redirect configured',
  },
]

const NewUserFlow = ({
  organizationId,
  user,
  initialSettings,
  updateOrganizationSettingsInDB,
  updateUserToHaveANameInDB,
}) => {
  const { updateSetting, getSetting } = useUserSettings(
    initialSettings,
    organizationId,
    user?.id,
    updateOrganizationSettingsInDB
  )

  const [updateUser] = useMutation(UPDATE_USER_TO_HAVE_A_NAME)

  const handleToggle = async (key) => {
    const currentValue = getSetting(key)
    const success = await updateSetting(key, !currentValue)

    if (!success) {
      console.error(`Failed to update ${key}`)
    }
  }

  const updateUserToHaveAName = async (userId, name) => {
    console.log('updateUserToHaveAName', { id: userId, input: { name: name } })
    try {
      const { data } = await updateUser({
        variables: {
          id: userId,
          input: { name: name },
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
    <Card className="">
      <CardContent>
        <div className="space-y-3 overflow-y-scroll h-[calc(100vh-12rem)] bg-opacity-[.6] bg-black mx-0 px-1.5 py-4 rounded-[9px]">
          {setupFlags?.length
            ? setupFlags?.map(({ key, label, description }, index) => (
                <div
                  key={`${key}-${index}`} // Combining the key with index to ensure uniqueness
                  className="flex items-center justify-between space-x-4"
                >
                  <SetupSettingsList
                    user={user}
                    keyName={key}
                    label={label}
                    description={description}
                    handleToggle={handleToggle}
                    getSetting={getSetting}
                    updateUserToHaveAName={updateUserToHaveAName}
                  />
                </div>
              ))
            : 'No setup flags found, how did we manage that?!'}
        </div>
      </CardContent>
    </Card>
  )
}

const SettingsList = ({
  label,
  description,
  handleToggle,
  getSetting,
  keyName,
}) => {
  const isDone = !!getSetting(keyName, false)

  return (
    <div
      className={`w-[calc(100vw-4.5rem)] overflow-clip pl-2 pr-4 py-2 transition-all justify-center items-center rounded-xl ml-0 ${
        isDone
          ? 'bg-gradient-to-br from-gray-700 via-gray-900 to-black text-white'
          : 'bg-gradient-to-br from-yellow-200 via-amber-300 to-amber-500 text-black'
      }`}
    >
      <div className="flex items-center justify-between h-[3rem]">
        <div
          className={`font-thin text-xs px-2 w-[8rem] text-left inline-flex ${isDone ? 'text-yellow-300' : 'text-blue-800'} border-r-2 border-slate-300`}
        >
          {label}
        </div>
        <div
          className={`text-sm px-2 flex-grow inline-flex text-left overflow-clip  ${isDone ? 'text-gray-400' : 'text-gray-600'}`}
        >
          {description}
        </div>
        <div className="inline-flex items-center justify-center">
          <input
            type="checkbox"
            checked={isDone}
            onChange={() => handleToggle(keyName)}
            aria-label={label}
            className="form-checkbox inline-flex h-5 w-5 text-blue-600 items-center justify-center"
          />
        </div>
      </div>
    </div>
  )
}

export default NewUserFlow
