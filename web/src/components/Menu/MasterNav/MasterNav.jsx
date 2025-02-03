import { useState } from 'react'

import { MenuIcon } from 'lucide-react'

import { Link, routes } from '@redwoodjs/router'

import LogInLogOutButton from 'src/components/Menu/LogInLogOutButton/LogInLogOutButton'

const MasterNav = ({ isAuthenticated, logOut }) => {
  const [isOpen, setIsOpen] = useState(false)
  // const isOpen = true

  const menuButtonTailwindStyle = `py-2 sm:py-2 md:py-2 lg:py-2 xl:py-2 2xl:py-2 px-4 hover:bg-blue-600 transition duration-100 rounded inline-flex`
  return (
    <div>
      <div className="sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
        <div className="relative inline-flex">
          <button
            onClick={() => {
              // console.log('isOpen: ', isOpen)
              setIsOpen(!isOpen)
            }}
            className="rw-button bg-blue-600 hover:bg-blue-700 text-white"
          >
            <MenuIcon className="w-5 h-5" />
          </button>
        </div>
        {isOpen && (
          <div className="absolute top-[4rem] right-[0] z-10 ">
            <ul className="relative grid overflow-y-scroll items-center font-light grid-cols-1 py-4 px-8 bg-gradient-to-r from-blue-700 via-blue-800 to-blue-600 text-white">
              <li>
                <Link className={menuButtonTailwindStyle} to={routes.home()}>
                  Home
                </Link>
              </li>
              <li>
                <Link className={menuButtonTailwindStyle} to={routes.home()}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link className={menuButtonTailwindStyle} to={routes.about()}>
                  About
                </Link>
              </li>
              <li>
                <Link className={menuButtonTailwindStyle} to={routes.contact()}>
                  Contact
                </Link>
              </li>

              <li>
                <LogInLogOutButton
                  isAuthenticated={isAuthenticated}
                  logOut={logOut}
                />
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="hidden sm:hidden md:block lg:block xl:block 2xl:block">
        <ul className="relative flex items-center font-light">
          <li>
            <Link className={menuButtonTailwindStyle} to={routes.home()}>
              Home
            </Link>
          </li>
          <li>
            <Link
              className="py-2 px-4 hover:bg-blue-600 transition duration-100 rounded"
              to={routes.home()}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              className="py-2 px-4 hover:bg-blue-600 transition duration-100 rounded"
              to={routes.about()}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className="py-2 px-4 hover:bg-blue-600 transition duration-100 rounded"
              to={routes.contact()}
            >
              Contact
            </Link>
          </li>

          <li>
            {isAuthenticated ? (
              <div>
                <button
                  type="button"
                  onClick={logOut}
                  className="py-2 px-4 hover:bg-blue-600 transition duration-100 rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to={routes.login()} className="py-2 px-4">
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MasterNav
