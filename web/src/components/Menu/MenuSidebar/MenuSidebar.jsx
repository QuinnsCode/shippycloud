import React, { useState, useRef } from 'react'

import {
  Package2,
  Calendar,
  Users,
  Building2,
  Settings,
  ChevronLeft,
  ChevronRight,
  ScrollText,
} from 'lucide-react'

import { routes } from '@redwoodjs/router'

import ShippyMenuSidebarIconList from 'src/components/Menu/MenuSidebar/ShippyMenuSidebarIconList/ShippyMenuSidebarIconList'
import { useOutsideClick } from 'src/hooks/useClickOutside'
import { useEscapeKey } from 'src/hooks/useEscapeKey'

const MenuSidebar = ({ userId, appId, memberId }) => {
  //CONSTS

  const menuItems = [
    {
      icon: Package2,
      label: 'Orders',
      path: routes.ordersOfAnOrg({ appId: appId, userId: userId }),
    },
    {
      icon: Calendar,
      label: 'Events',
      path: routes.eventsOfAnOrg({ appId: appId, userId: userId }),
    },
    {
      icon: Users,
      label: 'Members',
      path: routes.organizationMembers({ appId }),
    },
    { icon: Building2, label: 'Orgs', path: routes.homeWithAppId({ appId }) },
  ]

  const bottomMenuItems = [
    { icon: ScrollText, label: 'Blog', path: routes.blog() },
    { icon: ScrollText, label: 'Docs', path: routes.docs() },
    {
      icon: Settings,
      label: 'Settings',
      path: routes.settingsOfAnOrg({ appId: appId, userId: userId }),
    },
  ]

  //REFS
  const mainMenuSidebarRef = useRef(null)

  //STATE
  const [isOpen, setIsOpen] = useState(false)

  const menuWidthString = isOpen ? 'w-14' : 'w-[12rem]'

  //FUNCTIONS
  const handleMainMenuClose = () => {
    // renamed from handleClose
    setIsOpen(true)
  }

  //HOOKS
  useOutsideClick(handleMainMenuClose, mainMenuSidebarRef)
  useEscapeKey(handleMainMenuClose)

  //EFFECTS

  return (
    <div
      ref={mainMenuSidebarRef}
      data-sidebar="main-menu"
      className={`inline-flex h-[calc(100vh-4.5rem)] flex-col opacity-90 bg-gradient-to-b from-sky-100 via-sky-100 to-blue-200 border-r border-gray-200 transition-all duration-300 ${
        menuWidthString
      }`}
    >
      <div className="flex items-center justify-end px-2 border-b border-gray-200">
        {!isOpen && (
          <p className="font-thin italic h-8 w-[14rem] items-center justify-center overflow-clip font-mono text-right">
            (esc to close)
          </p>
        )}{' '}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen(!isOpen)
          }}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label={isOpen ? 'Expand sidebar' : 'Collapse sidebar'}
          data-trigger="main-menu"
        >
          {!isOpen ? (
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="flex flex-col h-full py-0">
          <div>
            <ShippyMenuSidebarIconList
              key="top"
              items={menuItems}
              isOpen={isOpen}
            />
          </div>
          <div className="mt-auto">
            <ShippyMenuSidebarIconList
              key="bottom"
              items={bottomMenuItems}
              isOpen={isOpen}
            />
          </div>
        </ul>
      </nav>
    </div>
  )
}

export default MenuSidebar
