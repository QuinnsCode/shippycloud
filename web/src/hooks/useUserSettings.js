import { useState, useEffect } from 'react'

const useUserSettings = (
  initialSettings,
  organizationId,
  userId,
  dbUpdateFunction
) => {
  const [currentSettings, setCurrentSettings] = useState(() => {
    try {
      return typeof initialSettings === 'string'
        ? JSON.parse(initialSettings)
        : initialSettings || {}
    } catch (error) {
      console.error('Invalid initial settings JSON:', error)
      return {}
    }
  })

  const [backupSettings, setBackupSettings] = useState(currentSettings)

  const updateSetting = async (key, value) => {
    if (!currentSettings) return false

    try {
      const newSettings = { ...currentSettings, [key]: value }

      // console.log('newSettings', { newSettings })
      setCurrentSettings(newSettings)

      const success = await dbUpdateFunction({
        organizationId,
        input: { userId, key, value },
      })

      if (success) {
        setBackupSettings(newSettings)
        return true
      } else {
        throw new Error('Failed to update settings in database')
      }
    } catch (error) {
      console.error('Error updating settings:', error)
      // console.log('newSettings-error: showing backup', { backupSettings })
      setCurrentSettings(backupSettings)
      return false
    }
  }

  const getSetting = (key, defaultValue) => {
    if (defaultValue === undefined) {
      // console.log('defaultValue is just getting setup')
      return currentSettings?.[key] ?? false
    } else if (defaultValue === null) {
      // console.log('defaultValue was reset')
      return currentSettings?.[key] ?? false
    } else {
      // console.log('defaultValue is not null or undefined')
      return currentSettings?.[key] ?? defaultValue
    }
  }

  return {
    updateSetting,
    getSetting,
    currentSettings,
  }
}

export default useUserSettings
