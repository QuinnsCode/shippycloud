import React, { useState, useRef } from 'react'

import {
  Package2,
  Calendar,
  Users,
  Building2,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

import { Link, routes } from '@redwoodjs/router'

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
    { icon: Users, label: 'Members', path: routes.homeWithAppId({ appId }) },
    { icon: Building2, label: 'Orgs', path: routes.homeWithAppId({ appId }) },
    { icon: Settings, label: 'Settings', path: routes.settings({ appId }) },
  ]

  //REFS
  const sidebarMenuRef = useRef(null)
  //STATE
  const [isOpen, setIsOpen] = useState(true)

  //FUNCTIONS
  const handleClose = () => {
    setIsOpen(true)
  }

  //HOOKS
  useOutsideClick(handleClose, sidebarMenuRef)
  useEscapeKey(handleClose)

  //EFFECTS

  return (
    <div
      ref={sidebarMenuRef}
      className={`flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300 ${
        !isOpen ? 'w-[14rem]' : 'w-16'
      }`}
    >
      <div className="flex items-center justify-end px-2 border-b border-gray-200">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label={isOpen ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {!isOpen ? (
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="py-0">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isOpen && (
                    <span className="ml-3 whitespace-nowrap h-5">
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default MenuSidebar
