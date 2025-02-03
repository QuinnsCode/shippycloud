import { useUserSettings } from 'src/hooks/useUserSettings'

const UserSettingsUpdateWidget = ({ user }) => {
  const { updateSetting, getSetting } = useUserSettings(
    user.settings,
    updateUserSettingsInDB
  )

  // Using a feature flag
  const isNewFeatureEnabled = getSetting('newFeatureFlag', false)

  // Enabling a new feature
  const enableNewFeature = async () => {
    const success = await updateSetting('newFeatureFlag', true)
    if (success) {
      console.log('New feature enabled')
    } else {
      console.log('Failed to enable new feature')
    }
  }

  return (
    <div>
      {isNewFeatureEnabled && <>New Feature Enabled</>}
      <button onClick={enableNewFeature}>Enable New Feature</button>
    </div>
  )
}

export default UserSettingsUpdateWidget
