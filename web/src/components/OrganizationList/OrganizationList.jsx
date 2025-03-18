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

const USER_ADDS_AN_ORGANIZATION_AND_BECOMES_MEMBER_MUTATION = gql`
  mutation UserAddsAnOrganizationMutation(
    $userId: String!
    $name: String!
    $domain: String
  ) {
    createOrganizationAndCreateOrganizationMember(
      input: { userId: $userId, name: $name, domain: $domain }
    ) {
      id
    }
  }
`
import { toast } from 'sonner'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
// import { toast } from '@redwoodjs/web/toast'

import AddingOrgForm from 'src/components/AddingOrgForm/AddingOrgForm'

import ShippyCloudBanner from '../shippyUi/ShippyCloudBanner/ShippyCloudBanner'
const tailwindString = 'w-[7rem] h-[7rem]'
const shippyCloudBaseButtonTainwildString =
  'rw-button bg-gradient-to-r from-blue-600 via-blue-600 to-blue-500 text-white hover:bg-gradient-to-r hover:from-sky-500 hover:via-sky-600 hover:to-blue-500 hover:text-white'

const OrganizationList = ({
  organizations,
  userId,
  setAddingAnOrganization,
}) => {
  return (
    <div className="">
      <div className="w-full flex justify-center">
        <ShippyCloudBanner>
          <p className="font-mono tracking tight font-light px-24">
            Your Organizations:
          </p>
        </ShippyCloudBanner>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-4 shadow-xl shadow-slate-600 items-center justify-center w-full">
        <div className="w-full inline-flex justify-center">
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
        </div>
        {organizations?.length === 0 ? (
          <div className="w-full inline-flex justify-center">
            <AddANewOrganizationCard
              userId={userId}
              index={organizations?.length || 0}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

const AddANewOrganizationCard = ({ userId, index }) => {
  return <SignUpOrganizationCard userId={userId} index={index} />
}

const AddingFirstOrganization = ({ userId }) => {
  const [addOrgAndMember, { loading, error }] = useMutation(
    USER_ADDS_AN_ORGANIZATION_AND_BECOMES_MEMBER_MUTATION,
    {
      onCompleted: ({ data }) => {
        console.log('data: ', data)
        toast.success('Organization added!')
        toast.success('You are now a member of this organization!')
        // setTimeout(() => {
        //   navigate(routes.home({ appId: data?.id }))
        // }, 1700)
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = async (data) => {
    console.log('onSave: ', data)

    try {
      const returnedNewOrgId = await addOrgAndMember({
        variables: { userId: userId, name: data.name },
      })
      console.log('returnedNewOrgId: ', { returnedNewOrgId })
      navigate(
        routes.homeWithAppId({
          appId:
            returnedNewOrgId.data.createOrganizationAndCreateOrganizationMember
              .id,
        })
      )
    } catch (error) {
      console.log('error: ', error)
    }
  }
  const [addingAnOrganization, setAddingAnOrganization] = useState(false)

  const addAnOrg = () => {
    setAddingAnOrganization(true)
    // await addOrganization({ variables: { userId } })
    // setAddingAnOrganization(false)
  }

  return (
    <>
      {!addingAnOrganization ? (
        <div className="w-full inline-flex justify-center h-full">
          <AddingOrgForm onSave={onSave} />
        </div>
      ) : null}
    </>
  )
}

export const SignUpOrganizationCard = React.memo(({ userId, index }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [addingAnOrganization, setAddingAnOrganization] = useState(false)
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
    <>
      <button
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
          onClick={() => setAddingAnOrganization(true)}
          className="bg-blue-300 rw-button hover:bg-blue-200 text-white hover:text-sky-700 py-2 px-6 rounded-full text-center block mt-4 w-full"
        >
          Add Organization
        </button>
      </button>

      <AddingFirstOrganization userId={userId} />
    </>
  )
})

const OrganizationCard = React.memo(({ organization, index }) => {
  // console.log(organization)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)
  const rafRef = useRef(null)

  const organizationSettingsJsonString = organization.organizationSettings
  const organizationSettings = useMemo(() => {
    if (organizationSettingsJsonString) {
      return JSON.parse(organizationSettingsJsonString)
    } else {
      return {}
    }
  }, [organizationSettingsJsonString])

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
      // to={routes.homeWithAppId({ appId: organization.id })}
      to={routes.onboarding({ appId: organization.id })}
      className="bg-gradient-to-br from-sky-500 via-sky-600 to-sky-500 rounded-2xl overflow-hidden p-4 w-full max-w-sm h-80 relative shadow-xl shadow-slate-600 m-4 rw-button inline "
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
      <button className="rw-button bg-blue-300 hover:bg-blue-200 text-white hover:text-sky-700 py-2 px-6 rounded-full text-center inline-flex w-full mt-4">
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
