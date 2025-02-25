import React, { useState, useRef } from 'react'

import {
  Package2,
  Calendar,
  Users,
  Building2,
  Settings,
  Pencil,
  ChevronLeft,
  ChevronRight,
  ScrollText,
  House,
} from 'lucide-react'

import { Link, routes } from '@redwoodjs/router'

import { useOutsideClick } from 'src/hooks/useClickOutside'
import { useEscapeKey } from 'src/hooks/useEscapeKey'

const MenuSidebarForNoOrgId = ({ userId, appId, memberId }) => {
  //CONSTS
  const menuItems = [
    { icon: House, label: 'Home', path: routes.home() },
    { icon: Pencil, label: 'Blog', path: routes.blog() },
    { icon: ScrollText, label: 'Docs', path: routes.docs() },
  ]

  //REFS
  const sidebarMiniMenuRef = useRef(null)
  //STATE
  const [isOpen, setIsOpen] = useState(false)

  //FUNCTIONS
  const handleClose = () => {
    setIsOpen(true)
  }

  //HOOKS
  useOutsideClick(handleClose, sidebarMiniMenuRef)
  useEscapeKey(handleClose)

  //EFFECTS

  return (
    <div
      ref={sidebarMiniMenuRef}
      className={`flex flex-col h-[calc(100vh-4rem)] bg-gradient-to-b from-sky-100 via-sky-100 to-blue-100 border-r border-gray-200 transition-all duration-300 ${
        !isOpen ? 'w-64' : 'w-14'
      }`}
    >
      <div className="flex items-center justify-end px-2 border-b border-gray-200">
        {!isOpen && (
          <p className="font-thin italic h-8 w-[14rem] items-center justify-center overflow-clip font-mono text-right">
            (esc to close)
          </p>
        )}{' '}
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

export default MenuSidebarForNoOrgId
