import { useState } from 'react'

const SetupMasterSettingsSwitch = ({
  keyName,
  handleToggle,
  updateUserToHaveAName,
  wasValue,
  user,
  closeMenu,
}) => {
  const [userNameInputValue, setUserNameInputValue] = useState('')
  if (keyName === 'hasChosenDisplayEmailOrName') {
    let showInput = false
    //we either already have a value or we found a user because id is there but they havent set a name
    if (wasValue || (user?.id && !user?.name)) {
      // console.log('they have no name but exist')
      showInput = true
    }

    return (
      <div className="w-full h-[23rem] items-center justify-between px-2 py-4 border-2 border-slate-300 rounded-xl">
        {wasValue && user?.name && (
          <div className="w-full h=[12rem] my-4">
            Display Name is currently is:{' '}
            <p>
              <u>{wasValue ? user?.email : user?.name} </u>
            </p>
          </div>
        )}
        <div className="inline-flex w-full items-center justify-between px-12">
          {!wasValue && !showInput ? (
            <button
              onClick={handleToggle}
              className={`w-[12rem] rw-button inline-flex bg-black text-white h-[4rem] items-center justify-center`}
            >
              Change to: {user?.name || 'Name?'}
            </button>
          ) : null}
          {/* Default to using email */}
          {!wasValue ? (
            <button
              onClick={handleToggle}
              className={`w-[24rem] rw-button inline-flex bg-purple-600 text-white h-[4rem] items-center justify-center font-thin tracking-widest`}
            >
              {user?.email}
            </button>
          ) : null}
          {wasValue && user?.name ? (
            <div className="w-full items-center justify-center border-2 border-slate-300 rounded-xl px-4 py-2 bg-sky-200">
              {user?.name}
            </div>
          ) : null}
          {showInput ? (
            <div className="w-full items-center justify-between">
              <div className="w-full h=[12rem] my-4 ">
                <p className="">No name found for email: </p>
                <p className="w-full ">
                  <u>{wasValue ? user?.name : user?.email} </u>
                </p>
              </div>
              <input
                type="text"
                placeholder="New Name?"
                onChange={(e) => {
                  setUserNameInputValue(e.target.value)
                }}
                className="w-[12rem] px-2 inline-flex text-purple-900 bg-white h-[4rem] items-center justify-center"
              />
              <div className="w-full items-center justify-center inline-flex">
                {userNameInputValue}
              </div>
              <div className="w-full items-center justify-center">
                <button
                  onClick={() => {
                    if (userNameInputValue) {
                      // console.log(
                      //   'userNameInputValue',
                      //   userNameInputValue,
                      //   user?.id
                      // )

                      updateUserToHaveAName(user?.id, userNameInputValue).then(
                        (res) => {
                          if (res.error) {
                            alert(res.error)
                          } else {
                            alert('Name updated!')
                          }
                        }
                      )
                    } else {
                      alert('Please enter a new name')
                    }
                    closeMenu()
                  }}
                  className={`w-[12rem] rw-button inline-flex bg-purple-600 text-white h-[4rem] items-center justify-center`}
                >
                  Save
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    )
  }
}
export default SetupMasterSettingsSwitch
