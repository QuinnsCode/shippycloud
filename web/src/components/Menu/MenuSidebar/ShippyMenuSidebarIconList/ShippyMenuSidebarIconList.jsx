import { Link } from '@redwoodjs/router'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from 'src/components/ui/hover-card'

const ShippyMenuSidebarIconList = ({ items, isOpen }) => {
  return (
    <>
      {items?.map((item) => {
        const Icon = item?.icon
        return (
          <li key={item.label}>
            <Link
              to={item.path}
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {isOpen ? (
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div>
                      <Icon className="w-5 h-5 flex-shrink-0" />
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent
                    side="right"
                    align="start"
                    sideOffset={16}
                    className="p-4 rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 bg-gradient-to-br from-blue-50 to-white border border-blue-200"
                  >
                    <div className="relative pr-8">
                      {item.label}
                      <svg
                        className="absolute top-0 right-0 w-6 h-6 text-blue-300"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 15a4 4 0 014-4h1m5-1h2a2 2 0 012 2h2m-2 2a2 2 0 11-4 0v-1m-4 1a2 2 0 104 0v1m-4-1a2 2 0 01-4 0v-1H5a2 2 0 00-2 2zm0-9a4 4 0 014-4"
                        />
                      </svg>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ) : (
                <>
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="ml-3 whitespace-nowrap h-5">
                    {item.label}
                  </span>
                </>
              )}
            </Link>
          </li>
        )
      })}
    </>
  )
}

export default ShippyMenuSidebarIconList
