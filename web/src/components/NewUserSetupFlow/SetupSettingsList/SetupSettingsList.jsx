import { useState } from 'react'

import SetupMasterSettingsSwitch from 'src/components/NewUserSetupFlow/SetupMasterSettingsSwitch/SetupMasterSettingsSwitch'
const SetupSettingsList = ({
  label,
  description,
  handleToggle,
  getSetting,
  keyName,
  updateUserToHaveAName,
  user,
}) => {
  const isDone = !!getSetting(keyName, false)

  const [isOpen, setIsOpen] = useState(false)
  const wasValue = getSetting(keyName)

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(!isOpen)
    }
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <button
      onClick={handleClick}
      className={`w-[calc(100vw-4.5rem)] overflow-clip pl-2 pr-4 py-8 transition-all justify-center items-center rounded-xl ml-0 ${
        isDone
          ? 'bg-gradient-to-br from-gray-700 via-gray-900 to-black text-white'
          : 'bg-gradient-to-br from-yellow-200 via-amber-300 to-amber-200 text-black'
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
          {/* <input
            type="checkbox"
            checked={isDone}
            onChange={() => handleToggle(keyName)}
            aria-label={label}
            className="form-checkbox inline-flex h-5 w-5 text-blue-600 items-center justify-center"
          /> */}
        </div>
      </div>
      {isOpen ? (
        <div className="w-full min-h-[24rem] bg-gradient-to-br from-amber-100 via-amber-50 to-amber-50 text-slate-900 rounded-[14px] items-center justify-center">
          <SetupMasterSettingsSwitch
            keyName={keyName}
            handleToggle={handleToggle}
            wasValue={wasValue}
            closeMenu={closeMenu}
            user={user}
            updateUserToHaveAName={updateUserToHaveAName}
          />
        </div>
      ) : null}
    </button>
  )
}

export default SetupSettingsList
