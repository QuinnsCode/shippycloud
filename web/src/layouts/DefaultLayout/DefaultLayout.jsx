// const DefaultLayout = ({ children }) => {
//   return <>{children}</>
// }

// export default DefaultLayout

//import { Fragment, useState } from 'react'
import { useState, useEffect, useRef, useMemo } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import { Link, routes } from '@redwoodjs/router'
// import { Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
// import Chatbot from 'src/components/ChatBot/ChatBot'
import MenuPopUp from 'src/components/MenuPopUp/MenuPopUp'
import { Toaster } from 'src/components/ui/toaster'
// import { useToast } from 'src/components/ui/use-toast'
import { safeStorage } from 'src/lib/safeStorage'

const DefaultLayout = ({ children }) => {
  const { isAuthenticated, currentUser, logOut, hasRole } = useAuth()

  const [showMenu, setMenu] = useState()
  const [showMenuMobile, setMenuMobile] = useState()

  // const { toast } = useToast()

  function logOutHandler(id) {
    console.log(id, 'lougOutHandler')
  }

  //turn off the menus on entry
  useEffect(() => {
    setTimeout(function () {
      setMenu(false)
    }, 1)
    setTimeout(function () {
      setMenuMobile(false)
    }, 1)
  }, [])

  useEffect(() => {
    document?.addEventListener('click', handleClickOutside, true)

    return () => {
      document?.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const webMenuButtonRef = useRef()

  const webMenuPopUpRef = useRef()

  const handleClickOutside = (e) => {
    if (
      e.target.id == 'web-menu-logout' ||
      e.target.id == 'mobile-menu-logout'
    ) {
      console.log('HERE!')
      logOut()
      // setMenuMobile(false)
      // setMenu(false)
    }
    //if we are not clicking the menu button check if we are in the menu pop up
    if (
      !webMenuButtonRef?.current?.contains(e?.target) &&
      !webMenuPopUpRef?.current?.contains(e?.target)
    ) {
      // console.log('outside menu')

      if (
        e.target.id != 'web-menu-pop-up' ||
        e.target.id != 'web-menu-logout' ||
        e.target.id != 'mobile-menu-logout'
      ) {
        // alert(e.target.id)
        if (e.target.id === 'user-menu-button') {
          // alert('1')
          // setMenu(!showMenu)
          setMenuMobile(false)
        } else if (e.target.id === 'user-menu-button-mobile') {
          // alert('2')
          // setMenuMobile(!showMenuMobile)
          setMenu(false)
        } else if (e.target.id === 'web-menu-pop-up') {
          //
        } else {
          setMenuMobile(false)
          setMenu(false)
        }
      }
    }
    // else {
    //   //console.log('inside menu')
    // }
  }

  const handleShowMenu = (id) => {
    // console.log({ id })
    if (id == 'web-menu-logout') {
      // alert('dont close')
      setMenu(!showMenu)
    }

    if (id == 'mobile-menu-logout') {
      // console.log('dont close mobile')
      setMenuMobile(!showMenuMobile)
    }
  }

  const currentUserRef = useRef(null)

  useEffect(() => {
    if (
      currentUser &&
      currentUser !== currentUserRef.current &&
      currentUserRef.current === null &&
      isAuthenticated
    ) {
      console.log('new current user!')
      currentUserRef.current = currentUser
    }
  }, [currentUser, isAuthenticated])

  const showChatbot = useMemo(() => {
    if (!currentUser) return false
    try {
      const userOptions = JSON.parse(currentUser.userOptions || '{}')
      return userOptions.showChatbotWidget || false
    } catch (error) {
      console.error('Error parsing userOptions:', error)
      return false
    }
  }, [currentUser])

  useEffect(() => {
    console.log('updated user')
  }, [isAuthenticated])

  useEffect(() => {
    if (safeStorage.get('theme') === 'light') {
      document.documentElement.classList.remove('dark')
    } else {
      console.log('add dark mode')
      document.body.classList.add('dark')
    }
  }, [])

  const dropIn = {
    hidden: {
      x: '10vw',
      opacity: 0,
    },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 3,
        type: 'spring',
        damping: 50,
        stiffness: 500,
      },
    },
    exit: { x: '100vw', opacity: 0 },
  }

  const HOVER_BUTTON_SCALE = 1.2

  const buttonValues = {
    rest: { scale: 1 },
    hover: { scale: HOVER_BUTTON_SCALE },
    pressed: { scale: 0.9 },
    exit: { scale: 0 },
  }

  const mobileButtonClass =
    'hover:bg-gradient-to-b border-2 border-white rw-button border-solid rounded-2xl dark:hover:to-teal-600 hover:from-teal-700 hover:shadow-sm hover:shadow-white hover:via-indigo-800 hover:rounded-2xl dark:text-indigo-100 hover:text-gray-300 hover:border-gray-300 px-1 pt-1 font-medium rw-button-group'

  const menuButtonClass =
    'hover:bg-gradient-to-b text-center hover:to-gray-600 hover:from-teal-700 hover:shadow-sm hover:shadow-white hover:via-indigo-800 hover:rounded-2xl border-transparent dark:text-indigo-100 hover:text-gray-300 hover:border-gray-300 inline-flex items-center px-1 pt-1 text-sm font-medium'
  return (
    <>
      {/* <Toaster toastOptions={{ className: 'rw-toast', duration: 1500 }} /> */}
      <Toaster />
      <AnimatePresence initial={false}>
        <div className="min-h-full" id="layout-blog-top">
          <nav className="bg-gradient-to-b from-slate-300 dark:from-teal-900 to-slate-200 dark:to-gray-800 via-gray-100 dark:via-black shadow-sm inline-flex w-full">
            <div className="max-h-full mx-auto sm:px-4 lg:px-4 w-full">
              <div className="w-full flex justify-between h-16">
                <div className="flex-grow"></div>
                <div className="flex">
                  <motion.div
                    layout
                    variants={buttonValues}
                    initial="rest"
                    whileHover="hover"
                    whileTap="pressed"
                    exit="exit"
                    className="flex-shrink-0 rounded-full flex items-center text-white rw-button bg-gradient-to-br from-sky-200 via-gray-500 to-blue-300 hover:from-sky-300 hover:via-violet-600 hover:to-teal-300 h-14 w-14 m-1"
                  >
                    <Link to={routes.home()}>Home</Link>
                  </motion.div>
                  <div className="hidden sm:hidden md:hidden lg:-my-px lg:ml-6 lg:flex lg:space-x-8">
                    {isAuthenticated ? (
                      hasRole(['admin', 'manager', 'supervisor', 'badger']) && (
                        <motion.div
                          layout
                          className={`${menuButtonClass}`}
                          variants={buttonValues}
                          initial="rest"
                          whileHover="hover"
                          whileTap="pressed"
                        >
                          <Link
                            className="w-fit h-full inline-flex items-center"
                            to={routes.webhookTest()}
                          >
                            Batchify
                          </Link>
                        </motion.div>
                      )
                    ) : (
                      <></>
                    )}
                    {isAuthenticated ? (
                      hasRole(['admin', 'manager', 'badger']) && (
                        <motion.div
                          layout
                          className={`${menuButtonClass}`}
                          variants={buttonValues}
                          initial="rest"
                          whileHover="hover"
                          whileTap="pressed"
                        >
                          <Link
                            className="w-fit h-full inline-flex items-center"
                            to={routes.myBatches2()}
                          >
                            {' '}
                            My Batches
                          </Link>
                        </motion.div>
                      )
                    ) : (
                      <></>
                    )}
                    {isAuthenticated ? (
                      hasRole(['admin', 'manager', 'cs']) && (
                        <motion.div
                          layout
                          className={`${menuButtonClass}`}
                          variants={buttonValues}
                          initial="rest"
                          whileHover="hover"
                          whileTap="pressed"
                        >
                          <Link
                            className="w-fit h-full inline-flex items-center"
                            to={routes.analysis()}
                          >
                            Analysis
                          </Link>
                        </motion.div>
                      )
                    ) : (
                      <></>
                    )}
                    {isAuthenticated ? (
                      hasRole(['admin', 'manager', 'badger']) && (
                        <motion.div
                          layout
                          className={`${menuButtonClass}`}
                          variants={buttonValues}
                          initial="rest"
                          whileHover="hover"
                          whileTap="pressed"
                        >
                          <Link
                            className="w-fit h-full inline-flex items-center"
                            to={routes.fetchTest()}
                          >
                            Search Orders
                          </Link>
                        </motion.div>
                      )
                    ) : (
                      <></>
                    )}
                    {isAuthenticated ? (
                      hasRole(['admin', 'manager', 'badger']) && (
                        <motion.div
                          layout
                          className={`${menuButtonClass}`}
                          variants={buttonValues}
                          initial="rest"
                          whileHover="hover"
                          whileTap="pressed"
                        >
                          <Link
                            className="w-fit h-full inline-flex items-center"
                            to={routes.print()}
                          >
                            Scan Orders
                          </Link>
                        </motion.div>
                      )
                    ) : (
                      <></>
                    )}

                    {isAuthenticated ? (
                      hasRole(['admin', 'manager', 'badger']) && (
                        <motion.div
                          layout
                          className={`${menuButtonClass}`}
                          variants={buttonValues}
                          initial="rest"
                          whileHover="hover"
                          whileTap="pressed"
                        >
                          <Link
                            className="w-fit h-full inline-flex items-center"
                            to={routes.recharge()}
                          >
                            Search Recharge
                          </Link>
                        </motion.div>
                      )
                    ) : (
                      <></>
                    )}
                    {isAuthenticated ? (
                      hasRole(['admin', 'manager']) && (
                        <motion.div
                          layout
                          className={`${menuButtonClass}`}
                          variants={buttonValues}
                          initial="rest"
                          whileHover="hover"
                          whileTap="pressed"
                        >
                          <Link
                            className="w-fit h-full inline-flex items-center"
                            to={routes.customilyTest()}
                          >
                            Customily
                          </Link>
                        </motion.div>
                      )
                    ) : (
                      <></>
                    )}
                    {isAuthenticated ? (
                      hasRole(['defaultUser']) && (
                        <motion.div
                          layout
                          className={`${menuButtonClass}`}
                          variants={buttonValues}
                          initial="rest"
                          whileHover="hover"
                          whileTap="pressed"
                        >
                          <Link
                            className="w-fit h-full inline-flex items-center"
                            to={routes.customilyTest5()}
                          >
                            Export Images
                          </Link>
                        </motion.div>
                      )
                    ) : (
                      <></>
                    )}
                    {isAuthenticated ? (
                      hasRole(['admin', 'manager']) && (
                        <motion.div
                          layout
                          className={`${menuButtonClass}`}
                          variants={buttonValues}
                          initial="rest"
                          whileHover="hover"
                          whileTap="pressed"
                        >
                          <Link
                            className="w-fit h-full inline-flex items-center"
                            to={routes.asana()}
                          >
                            Asana
                          </Link>
                        </motion.div>
                      )
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="hidden sm:hidden md:hidden lg:ml-6 lg:flex lg:items-center">
                  <button
                    type="button"
                    className="hidden bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    <span className="sr-only">View notifications</span>

                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </button>

                  <motion.div layout className="ml-3 relative group">
                    <motion.div
                      layout
                      variants={buttonValues}
                      initial="rest"
                      whileHover="hover"
                      whileTap="pressed"
                    >
                      <button
                        type="button"
                        className="pointer-events-auto cursor-pointer bg-indigo-400 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex-shrink-0 rounded-full flex items-center text-white rw-button bg-gradient-to-br from-sky-200 via-gray-500 to-blue-300 hover:from-sky-300 hover:via-violet-600 hover:to-teal-300 h-14 w-14 m-1"
                        id="user-menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                        onClick={(e) => {
                          handleShowMenu(e.target.id)
                          setMenu(!showMenu)
                        }}
                      >
                        <span className="sr-only">Open user menu</span>
                        {/* <div className="hidden"> */}
                        Menu
                      </button>
                    </motion.div>

                    {showMenu && (
                      <div className="">
                        <motion.div
                          layout
                          variants={dropIn}
                          initial="hidden"
                          animate="show"
                          exit="exit"
                        >
                          <div
                            className="group-hover:visible transition duration-700 origin-top-right absolute right-0 mt-2 w-fit min-w-full rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none pointer-events-auto z-50"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="user-menu-button"
                            tabIndex="-1"
                            ref={webMenuPopUpRef}
                          >
                            <MenuPopUp
                              logOut={logOutHandler}
                              currentUser={currentUser}
                              isAuthenticated={isAuthenticated}
                              hasRole={hasRole}
                              className="mx-auto"
                            />
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                </div>
                <div
                  className="mr-2 py-4 items-center lg:hidden"
                  ref={webMenuButtonRef}
                >
                  <button
                    id="user-menu-button-mobile"
                    className="bg-white items-center justify-center rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    aria-controls="mobile-menu"
                    aria-expanded="false"
                    onClick={() => setMenuMobile(!showMenuMobile)}
                  >
                    <span className="sr-only inline">Open main menu</span>
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                    <svg
                      className="hidden h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>{' '}
                  </button>
                </div>
                <div className="flex-grow -mr-16 sm:-mr-16 md:-mr-8 lg:-mr-4 xl:-mr-0 2xl:-mr-0"></div>
                <div className="flex pr-5 sm:pr-5 md:pr-3 lg:pr-3 xl:pr-0 2xl:pr-0">
                  <DarkModeWidget buttonValues={buttonValues} />
                </div>
              </div>
            </div>
          </nav>
          {showMenuMobile && (
            <div className="w-full" id="mobile-menu">
              <div className="w-full">
                <div className="border rounded-2xl border-violet-200 border-solid w-full">
                  <motion.div
                    className={`${mobileButtonClass}`}
                    variants={buttonValues}
                    initial="rest"
                    whileHover="hover"
                    whileTap="pressed"
                  >
                    <Link to={routes.home()} className="w-full text-center">
                      Home
                    </Link>
                  </motion.div>

                  {isAuthenticated ? (
                    <div className="w-full">
                      {hasRole(['defaultUser']) && (
                        <motion.div
                          className={`${mobileButtonClass}`}
                          variants={buttonValues}
                          initial="rest"
                          whileHover="hover"
                          whileTap="pressed"
                        >
                          <Link
                            to={routes.customilyTest5()}
                            className="w-full text-center"
                          >
                            Export Images
                          </Link>
                        </motion.div>
                      )}
                      {hasRole(['admin', 'manager', 'badger']) && (
                        <motion.div
                          className={`${mobileButtonClass}`}
                          variants={buttonValues}
                          initial="rest"
                          whileHover="hover"
                          whileTap="pressed"
                        >
                          <Link
                            to={routes.customilyTest()}
                            className="w-full text-center"
                          >
                            Customily{' '}
                          </Link>
                        </motion.div>
                      )}
                      {hasRole(['admin', 'manager', 'badger']) && (
                        <motion.div
                          className={`${mobileButtonClass}`}
                          variants={buttonValues}
                          initial="rest"
                          whileHover="hover"
                          whileTap="pressed"
                        >
                          <Link
                            to={routes.webhookTest()}
                            className="w-full text-center"
                          >
                            Batchify{' '}
                          </Link>
                        </motion.div>
                      )}
                      {hasRole(['admin', 'manager', 'badger']) && (
                        <motion.div
                          className={`${mobileButtonClass}`}
                          variants={buttonValues}
                          initial="rest"
                          whileHover="hover"
                          whileTap="pressed"
                        >
                          <Link
                            to={routes.myBatches2()}
                            className="w-full text-center"
                          >
                            My Batches{' '}
                          </Link>
                        </motion.div>
                      )}
                      {hasRole(['admin', 'manager', 'badger']) && (
                        <motion.div
                          className={`${mobileButtonClass}`}
                          variants={buttonValues}
                          initial="rest"
                          whileHover="hover"
                          whileTap="pressed"
                        >
                          <Link
                            to={routes.fetchTest()}
                            className="w-full text-center"
                          >
                            Search Orders{' '}
                          </Link>
                        </motion.div>
                      )}
                      {hasRole(['admin', 'manager', 'badger']) && (
                        <motion.div
                          className={`${mobileButtonClass}`}
                          variants={buttonValues}
                          initial="rest"
                          whileHover="hover"
                          whileTap="pressed"
                        >
                          <Link
                            to={routes.print()}
                            className="w-full text-center"
                          >
                            Scan Orders{' '}
                          </Link>
                        </motion.div>
                      )}
                      {hasRole(['admin', 'manager']) && (
                        <motion.div
                          className={`${mobileButtonClass}`}
                          variants={buttonValues}
                          initial="rest"
                          whileHover="hover"
                          whileTap="pressed"
                        >
                          <Link
                            to={routes.analysis()}
                            className="w-full text-center"
                          >
                            Analysis{' '}
                          </Link>
                        </motion.div>
                      )}
                      {hasRole(['admin', 'manager', 'badger']) && (
                        <motion.div
                          className={`${mobileButtonClass}`}
                          variants={buttonValues}
                          initial="rest"
                          whileHover="hover"
                          whileTap="pressed"
                        >
                          <Link
                            to={routes.recharge()}
                            className="w-full text-center"
                          >
                            Search Recharge{' '}
                          </Link>
                        </motion.div>
                      )}
                      {hasRole(['admin', 'manager']) && (
                        <motion.div
                          className={`${mobileButtonClass}`}
                          variants={buttonValues}
                          initial="rest"
                          whileHover="hover"
                          whileTap="pressed"
                        >
                          <Link
                            to={routes.asana()}
                            className="w-full text-center"
                          >
                            Asana{' '}
                          </Link>
                        </motion.div>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
              {isAuthenticated ? (
                <div className="pt-4 pb-3 rw-button-group">
                  <div className="items-center px-4 inline">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src="https://m.media-amazon.com/images/S/abs-image-upload-na/4/AmazonStores/ATVPDKIKX0DER/6673846d735a4fce51767fffa27c5e08.w602.h602.png"
                        alt="badger badger badger badger badger badger badger badger badger snaaaaaake"
                      ></img>
                    </div>
                    <pre className="font-thin inline w-fit min-w-max text-white">
                      User:{' '}
                      <span className="rw-button pointer-events-none cursor-pointer font-thin w-fit inline-block bg-gray-800 text-white">
                        {currentUser?.email}
                      </span>
                    </pre>
                    <button
                      type="button"
                      className="hidden ml-auto bg-white flex-shrink-0 p-1 rounded-full text-indigo-400 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span className="sr-only">View notifications</span>

                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 inline">
                    <button
                      id="mobile-menu-logout"
                      type="button"
                      className="rw-button bg-indigo-800 text-white hover:bg-gradient-to-br hover:from-indigo-900 hover:via-indigo-700 hover:to-indigo-500  hover:text-white inline"
                      onClick={(e) => logOutHandler(e.target.id)}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="rw-button-group">
                  <Link
                    className="rw-button bg-indigo-800 text-white hover:bg-gradient-to-br hover:from-indigo-900 hover:via-indigo-700 hover:to-indigo-500  hover:text-white inline-flex"
                    to={routes.login()}
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          )}

          <div className="">
            <main>
              <div className="max-h-full mx-auto sm:px-3 lg:px-3">
                <div className="px-4 py-3 sm:px-0">
                  <div className="from-white to-white via-violet-100 dark:from-indigo-900 bg-gradient-to-r dark:via-black dark:to-indigo-900 border-4 border-solid border-indigo-800 rounded-lg px-3 py-1 overflow-visible text-justified scrollbar">
                    {children}
                  </div>
                  {/* {showChatbot && <Chatbot model="openai" />} */}
                  {/* <div className="bg-gradient-to-br from-indigo-900 via-transparent to-transparent flex md:flex md:flex-grow flex-row-reverse space-x-1 my-2">
                    <Link
                      to={routes.newV1PR()}
                      className="rw-button w-fit  bg-indigo-900 text-white border-solid border-2 border-transparent hover:bg-indigo-700 hover:border-solid hover:border-2 hover:border-white pointer-events-auto opacity-100 content-end py-0 my-0"
                    >
                      Submit Error / PR
                    </Link>
                  </div> */}
                </div>
              </div>
            </main>
          </div>
        </div>
      </AnimatePresence>
    </>
  )
}

export default DefaultLayout

export const DarkModeWidget = ({ buttonValues }) => {
  if (!safeStorage.get('theme')) {
    console.log('No theme found - setting theme to dark')
    safeStorage.set('theme', 'dark')
    document.documentElement.classList.add('dark')
  } else {
    // console.log('theme found - ' + safeStorage.get('theme'))
  }

  const [theme, setTheme] = useState(safeStorage.get('theme') || 'dark')

  const swapDarkMode = () => {
    if (safeStorage.get('theme') === 'dark') {
      safeStorage.set('theme', 'light')
      setTheme('light')
      document.body.classList.remove('dark')
    } else {
      safeStorage.set('theme', 'dark')
      setTheme('dark')
      document.body.classList.add('dark')
    }
  }

  return (
    <button
      type="button"
      className=""
      onClick={() => {
        swapDarkMode()
      }}
    >
      {theme === 'light' ? (
        <motion.div
          variants={buttonValues}
          initial="rest"
          whileHover="hover"
          whileTap="pressed"
          className=""
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              className="stroke-slate-400 dark:stroke-slate-500"
            ></path>
            <path
              d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
              className="stroke-slate-400 dark:stroke-slate-500"
            ></path>
          </svg>
        </motion.div>
      ) : null}
      {theme !== 'light' ? (
        <motion.div
          variants={buttonValues}
          initial="rest"
          whileHover="hover"
          whileTap="pressed"
          className=""
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
              className="fill-transparent"
            ></path>
            <path
              d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
              className="fill-slate-400 dark:fill-slate-500"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
              className="fill-slate-400 dark:fill-slate-500"
            ></path>
          </svg>
        </motion.div>
      ) : null}
    </button>
  )
}
