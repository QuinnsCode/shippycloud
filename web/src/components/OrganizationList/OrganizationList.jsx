import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react'

import {
  Bird,
  Cat,
  Dog,
  Fish,
  Rabbit,
  Turtle,
  Bug,
  Squirrel,
  Worm,
  Rat,
  Egg,
  Feather,
} from 'lucide-react'

import { Link, routes } from '@redwoodjs/router'

import ShippyCloudBanner from '../shippyUi/ShippyCloudBanner/ShippyCloudBanner'
const tailwindString = 'w-[7rem] h-[7rem]'
const shippyCloudBaseButtonTainwildString =
  'rw-button bg-gradient-to-r from-blue-600 via-blue-600 to-blue-500 text-white hover:bg-gradient-to-r hover:from-sky-500 hover:via-sky-600 hover:to-blue-500 hover:text-white'

const OrganizationList = ({ organizations, userId }) => {
  return (
    <div>
      <ShippyCloudBanner>
        <p>Your Organizations:</p>
      </ShippyCloudBanner>
      <hr />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 shadow-xl shadow-slate-600">
        {organizations &&
          organizations.map((organization, index) => {
            return (
              <OrganizationCard
                key={organization.id}
                organization={organization}
                index={index}
              />
            )
          })}
        <AddANewOrganizationCard
          userId={userId}
          index={organizations?.length || 0}
        />
      </div>
      {/* <div>
        <AddOrganizations userId={userId} />
      </div> */}
      <hr />
    </div>
  )
}

const AddANewOrganizationCard = ({ userId, index }) => {
  return <SignUpOrganizationCard userId={userId} index={index} />
}

const SignUpOrganizationCard = React.memo(({ userId, index }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)
  const rafRef = useRef(null)

  const organizationIconName = 'Bird'

  const handleMouseMove = useCallback((event) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }

    rafRef.current = requestAnimationFrame(() => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect()
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        })
      }
    })
  }, [])

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <Link
      ref={cardRef}
      className="bg-gradient-to-br from-sky-500 via-sky-600 to-sky-500 rounded-lg overflow-hidden p-4 w-full max-w-sm h-80 relative shadow-xl shadow-slate-600 m-4 rw-button inline"
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.3), transparent 80%)`,
          pointerEvents: 'none',
        }}
      />
      <div className="relative mb-4 animate-pulse">
        <div className="absolute -top-10 left-0 mt-2 ml-2 bg-sky-200 text-slate-800 h-8 w-8 rounded-full flex items-center justify-center">
          {index + 1}
        </div>
        <div className="text-white font-semibold text-center mt-6 animate-pulse">
          Add a new organization
        </div>
        <div className="text-slate-400 items-center inline-flex text-center mt-2 ">
          <OrgAvatar icon={organizationIconName} />
        </div>
      </div>
      <button
        onClick={() => {
          /* Add logic to create new organization */
        }}
        className="bg-blue-300 rw-button hover:bg-blue-200 text-white hover:text-sky-700 py-2 px-6 rounded-full text-center block mt-4 w-full"
      >
        Add Organization
      </button>
    </Link>
  )
})

const OrganizationCard = React.memo(({ organization, index }) => {
  // console.log(organization)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)
  const rafRef = useRef(null)

  const organizationSettingsJsonString = organization.organizationSettings
  const organizationSettings = useMemo(
    () => JSON.parse(organizationSettingsJsonString),
    [organizationSettingsJsonString]
  )

  const organizationIconName =
    organizationSettings.organizationIconName || 'Bug'

  const handleMouseMove = useCallback((event) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }

    rafRef.current = requestAnimationFrame(() => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect()
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        })
      }
    })
  }, [])

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <Link
      ref={cardRef}
      to={routes.homeWithAppId({ appId: organization.id })}
      className="bg-gradient-to-br from-sky-500 via-sky-600 to-sky-500 rounded-lg overflow-hidden p-4 w-full max-w-sm h-80 relative shadow-xl shadow-slate-600 m-4 rw-button inline "
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.3), transparent 80%)`,
          pointerEvents: 'none',
        }}
      />
      <div className="relative mb-4">
        <div className="absolute -top-10 left-0 mt-2 ml-2 bg-sky-200 text-slate-800 h-8 w-8 rounded-full flex items-center justify-center">
          {index + 1}
        </div>
        <div className="text-white font-semibold text-center mt-6">
          {organization.name}
        </div>
        <div className="text-slate-400 items-center inline-flex text-center mt-2">
          <OrgAvatar icon={organizationIconName} />
        </div>
      </div>
      <button className="bg-blue-300 rw-button hover:bg-blue-200 text-white hover:text-sky-700 py-2 px-6 rounded-full text-center block mt-4">
        Go to: {organization.name}
      </button>
    </Link>
  )
})

const OrgAvatar = React.memo(({ icon }) => {
  // console.log(icon)
  const iconMap = {
    Bird: <Bird className={`${tailwindString}`} />,
    Cat: <Cat className={`${tailwindString}`} />,
    Dog: <Dog className={`${tailwindString}`} />,
    Fish: <Fish className={`${tailwindString}`} />,
    Rabbit: <Rabbit className={`${tailwindString}`} />,
    Turtle: <Turtle className={`${tailwindString}`} />,
    Bug: <Bug className={`${tailwindString}`} />,
    Squirrel: <Squirrel className={`${tailwindString}`} />,
    Worm: <Worm className={`${tailwindString}`} />,
    Rat: <Rat className={`${tailwindString}`} />,
    Egg: <Egg className={`${tailwindString}`} />,
    Feather: <Feather className={`${tailwindString}`} />,
  }

  return (
    <div className="h-36 w-48 flex items-center justify-center rounded-2xl bg-gradient-to-br from-sky-700 via-sky-700 to-sky-600 text-white shadow-xl shadow-sky-400">
      {iconMap[icon]}
    </div>
  )
})

export default OrganizationList
