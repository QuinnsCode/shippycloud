import { useState, useRef } from 'react'

import { MenuIcon } from 'lucide-react'

import { Link, routes } from '@redwoodjs/router'

import LogInLogOutButton from 'src/components/Menu/LogInLogOutButton/LogInLogOutButton'
import { useOutsideClick } from 'src/hooks/useClickOutside'
import { useEscapeKey } from 'src/hooks/useEscapeKey'

const MasterNav = ({ isAuthenticated, logOut }) => {
  //CONSTS
  const menuButtonTailwindStyle = `italic py-2 sm:py-2 md:py-2 lg:py-2 xl:py-2 2xl:py-2 px-4 hover:bg-blue-600 transition duration-100 rounded inline-flex`

  //REFS
  const mobileMenuRef = useRef(null)
  //STATES

  const [isOpen, setIsOpen] = useState(false)
  // const isOpen = true

  const handleClose = () => {
    setIsOpen(false)
  }
  //HOOKS
  useOutsideClick(handleClose, mobileMenuRef)
  useEscapeKey(handleClose)

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
          <div
            ref={mobileMenuRef}
            className="absolute top-[2.2rem] right-[0] z-10 rounded-md"
          >
            <ul className="relative grid overflow-y-scroll items-center font-light grid-cols-1 py-4 px-8 bg-gradient-to-r from-blue-700 via-blue-800 to-blue-600 text-white rounded-md">
              <li>
                <Link className={menuButtonTailwindStyle} to={routes.home()}>
                  <p className="font-mono italic tracking-wide">Home</p>
                </Link>
              </li>
              <li>
                <Link className={menuButtonTailwindStyle} to={routes.home()}>
                  <p className="font-mono italic tracking-wide">Dashboard</p>
                </Link>
              </li>
              <li>
                <Link className={menuButtonTailwindStyle} to={routes.about()}>
                  <p className="font-mono italic tracking-wide">About</p>
                </Link>
              </li>
              <li>
                <Link className={menuButtonTailwindStyle} to={routes.contact()}>
                  <p className="font-mono italic tracking-wide">Contact</p>
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
      <div className="hidden sm:hidden md:block lg:block xl:block 2xl:block shadow-xl shadow-white rounded-2xl bg-graident-to-r from-blue-700 via-blue-800 to-blue-600 text-white">
        <ul className="relative items-center font-light pl-2 inline-flex">
          <li>
            <Link className={menuButtonTailwindStyle} to={routes.home()}>
              <p className="font-mono italic">Home</p>
            </Link>
          </li>
          {/* <li>
            <Link
              className="py-2 px-4 hover:bg-blue-600 transition duration-100 rounded mx-12"
              to={routes.home()}
            >
              <p className="font-mono italic">Dashboard</p>
            </Link>
          </li> */}
          <li className="">
            <Link
              className="py-2 px-5 hover:bg-blue-600 inline-flex transition duration-100 rounded"
              to={routes.about()}
            >
              <p className="font-mono italic">About</p>
            </Link>
          </li>
          <li>
            <Link
              className="py-2 px-2 hover:bg-blue-600 inline-flex transition duration-100 rounded"
              to={routes.contact()}
            >
              <p className="font-mono italic">Contact</p>
            </Link>
          </li>

          <li>
            {isAuthenticated ? (
              <div>
                <button
                  type="button"
                  onClick={logOut}
                  className="py-2 pl-5 pr-5 hover:bg-blue-600 transition duration-100 rounded-sm"
                >
                  <p className="font-mono italic">Logout</p>
                </button>
              </div>
            ) : (
              <div className="inline-flex">
                <Link
                  to={routes.login()}
                  className="py-2 pl-5 pr-5 hover:bg-blue-600 transition duration-100 rounded-sm"
                >
                  <p className="font-mono italic tracking-wide">Login</p>
                </Link>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MasterNav
