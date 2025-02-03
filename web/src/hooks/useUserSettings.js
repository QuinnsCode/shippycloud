import { useState, useEffect } from 'react'

const useUserSettings = (initialSettings, updateUserSettingsInDB) => {
  const [currentSettings, setCurrentSettings] = useState(null)
  const [backupSettings, setBackupSettings] = useState(null)

  useEffect(() => {
    try {
      const parsedSettings = JSON.parse(initialSettings || '{}')
      setCurrentSettings(parsedSettings)
      setBackupSettings(parsedSettings)
    } catch (error) {
      console.error('Invalid initial settings JSON:', error)
      setCurrentSettings({})
      setBackupSettings({})
    }
  }, [initialSettings])

  const updateSetting = async (key, value) => {
    if (!currentSettings) return false

    try {
      const newSettings = { ...currentSettings, [key]: value }
      const validJSON = JSON.stringify(newSettings)
      JSON.parse(validJSON) // Test if it's valid JSON

      setCurrentSettings(newSettings)
      const success = await updateUserSettingsInDB(validJSON)

      if (success) {
        setBackupSettings(newSettings)
        return true
      } else {
        throw new Error('Failed to update settings in database')
      }
    } catch (error) {
      console.error('Error updating settings:', error)
      setCurrentSettings(backupSettings)
      return false
    }
  }

  const getSetting = (key, defaultValue = undefined) => {
    return currentSettings && key in currentSettings
      ? currentSettings[key]
      : defaultValue
  }

  return {
    updateSetting,
    getSetting,
    currentSettings,
  }
}

export default useUserSettings
