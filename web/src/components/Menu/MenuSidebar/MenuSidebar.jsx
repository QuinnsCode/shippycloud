import React, { useState } from 'react'

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

const MenuSidebar = ({ userId, appId, memberId }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

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
    { icon: Users, label: 'Members', path: routes.home() },
    { icon: Building2, label: 'Orgs', path: routes.home() },
    { icon: Settings, label: 'Settings', path: routes.home() },
  ]

  return (
    <div
      className={`flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-[14rem]'
      }`}
    >
      <div className="flex items-center justify-end p-4 border-b border-gray-200">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="py-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="ml-3 whitespace-nowrap">{item.label}</span>
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
