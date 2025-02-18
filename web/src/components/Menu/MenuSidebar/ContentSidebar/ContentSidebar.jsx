import React, { useState, useRef } from 'react'

import { ChevronLeft, ChevronRight } from 'lucide-react'

import SidebarContentHandler from 'src/components/Menu/MenuSidebar/SidebarContentHandler/SidebarContentHandler'
import { useOutsideClick } from 'src/hooks/useClickOutside'
import { useEscapeKey } from 'src/hooks/useEscapeKey'
import { useSidebarState } from 'src/hooks/useSidebarState'
const ContentSidebar = ({ appId }) => {
  const mainMenuSidebarRef = useRef(null)
  // const [isOpen, setIsOpen] = useState(false)

  const {
    sidebarType,
    sidebarContent,
    isOpen,
    updateSidebar,
    setSidebar,
    clearSidebarContent,
    toggleSidebar,
  } = useSidebarState()

  // Change width values to accommodate content better
  // 72rem is widest we wanna go

  const widOpts = {
    full: 'w-[72rem] ',
    half: ' xs:w-[30rem] sm:w-[30rem] md:w-[30rem] lg:w-[50rem] xl:w-[70rem]',
    quarter: 'w-[25rem] sm:w=[10rem]',
  }

  const userSettings = {
    contentSidebarWidth: ['full', 'half', 'quarter'],
    contentBarClosesOnEscape: [true, false],
    contentBarClosesOnClick: [true, false],
    darkMode: [true, false],
    smallText: [false, true],
  }

  const menuWidthString = isOpen ? 'w-[4rem]' : widOpts.half

  const handleMainMenuClose = () => {
    setSidebar(true)
  }

  useOutsideClick(handleMainMenuClose, mainMenuSidebarRef)
  useEscapeKey(handleMainMenuClose)

  return (
    <div
      ref={mainMenuSidebarRef}
      data-sidebar="content-menu"
      className={`inline-flex h-[calc(100vh-4.5rem)] flex-col opacity-[.98] bg-gradient-to-b from-sky-100 via-sky-100 to-blue-200 border-l border-gray-200 transition-all duration-300 ${menuWidthString}`}
    >
      <div className="flex items-center justify-start px-2 border-b border-gray-200">
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleSidebar()
          }}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label={isOpen ? 'Expand content' : 'Collapse content'}
          data-trigger="content-menu"
        >
          {isOpen ? (
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-500" />
          )}
        </button>
        {/* {!isOpen && (
          <p className="font-thin italic h-8 ml-2 flex items-center justify-start overflow-clip font-mono">
            Content Panel
          </p>
        )} */}
      </div>

      <div className={`flex-1 overflow-y-auto ${isOpen ? 'hidden' : 'block'}`}>
        <div className="px-4">
          <SidebarContentHandler
            sidebarContent={sidebarContent}
            sidebarType={sidebarType}
          />
        </div>
      </div>
    </div>
  )
}

export default ContentSidebar
