import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from 'src/components/ui/card'
// import { Switch } from 'src/components/ui/switch'
import useUserSettings from 'src/hooks/useUserSettings'

const NewUserFlow = ({ initialSettings, updateUserSettingsInDB }) => {
  const { updateSetting, getSetting } = useUserSettings(
    initialSettings,
    updateUserSettingsInDB
  )

  const setupFlags = [
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
      key: 'hasAddedPaidShipstation',
      label: 'Paid Shipstation',
      description: 'Shipstation subscription activated',
    },
    {
      key: 'hasAddedShipstationKey',
      label: 'Shipstation Key Added',
      description: 'API key configuration complete',
    },
    {
      key: 'hasChosenOrganizationLoginLandingPage',
      label: 'Landing Page Set',
      description: 'Organization login redirect configured',
    },
  ]

  const handleToggle = async (key) => {
    const currentValue = getSetting(key, false)
    const success = await updateSetting(key, !currentValue)

    if (!success) {
      console.error(`Failed to update ${key}`)
    }
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>User Setup Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 bg-black mx-auto">
          {setupFlags?.map(({ key, label, description }) => (
            <div
              key={key}
              className="flex items-center justify-between space-x-4"
            >
              <div>
                <div className="font-medium">{label}</div>
                <div className="text-sm text-gray-500">{description}</div>
              </div>
              <input
                type="checkbox"
                checked={getSetting(key, false)}
                onChange={() => handleToggle(key)}
                aria-label={label}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default NewUserFlow
