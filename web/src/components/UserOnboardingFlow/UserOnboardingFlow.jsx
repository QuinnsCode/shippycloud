import { useState, useEffect } from 'react'

import { navigate, routes } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

import ShippyCloudColorfulBackground from '../shippyUi/ShippyCloudColorfulBackground/ShippyCloudColorfulBackground'

const FETCH_USER_ORGANIZATIONS = gql`
  query FetchUserOrganizationsQuery($userId: String!) {
    organizationsOfAUser(userId: $userId) {
      id
      name
    }
  }
`

const USER_ORG_WITH_KEYS = gql`
  query UserOrgWithKeysQuery($userId: String!, $organizationId: String!) {
    userAndOrganizationWithKeys(
      userId: $userId
      organizationId: $organizationId
    ) {
      id
      isAdmin
      organizationId
      organizationHasApiKeys
      hasChosenDisplayEmailOrName
    }
  }
`

const UserOnboardingFlow = ({ appId }) => {
  const { currentUser } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedOrgId, setSelectedOrgId] = useState(appId || null)

  // Fetch organizations for this user
  const { loading: orgsLoading, data: orgsData } = useQuery(
    FETCH_USER_ORGANIZATIONS,
    {
      variables: { userId: currentUser?.id },
      skip: !currentUser?.id,
    }
  )

  // If organization is selected, check for API keys and user display name
  const { loading: keysLoading, data: keysData } = useQuery(
    USER_ORG_WITH_KEYS,
    {
      variables: {
        userId: currentUser?.id,
        organizationId: appId || selectedOrgId,
      },
      skip: !currentUser?.id || !selectedOrgId,
    }
  )

  // Auto-advance if user only has one organization
  useEffect(() => {
    if (!orgsLoading && orgsData?.organizationsOfAUser?.length === 1) {
      setSelectedOrgId(appId || orgsData.organizationsOfAUser[0].id)
      setCurrentStep(2) // Skip to verification step
    }
  }, [orgsLoading, orgsData])

  // Process verification results and determine next steps
  useEffect(() => {
    if (!keysLoading && keysData?.userAndOrganizationWithKeys) {
      const userData = keysData.userAndOrganizationWithKeys
      const orgId = appId || userData.organizationId

      // If user hasn't chosen display name preference, show that step first
      if (!userData.hasChosenDisplayEmailOrName) {
        console.log('User needs to set display name preference')
        setCurrentStep(3) // Go to display name setup step
        return
      }

      // Then check if organization has API keys
      if (userData.organizationHasApiKeys) {
        // Organization has API keys, proceed to dashboard
        console.log('Organization has API keys, proceeding to dashboard')
        if (!appId) {
          navigate(routes.onboarding({ appId: orgId }))
        } else {
          finishOnboarding()
        }
      } else if (userData.isAdmin) {
        // Organization needs API keys and user is admin
        console.log('Organization needs API keys, user is admin')
        setCurrentStep(4) // Show API key setup screen
      } else {
        // Organization needs API keys but user is not admin
        console.log('Organization needs API keys, user is NOT admin')
        setCurrentStep(5) // Show message to contact admin
      }
    }
  }, [keysLoading, keysData])

  const selectOrganization = (orgId) => {
    setSelectedOrgId(orgId)
    setCurrentStep(2) // Move to verification step
  }

  const saveDisplayNamePreference = () => {
    // Here you would save the user's display name preference
    // Then continue with the flow
    console.log('Saving display name preference')

    // For now we'll just advance to the next step
    // Check if we need to handle API keys next
    if (keysData?.userAndOrganizationWithKeys) {
      if (!keysData.userAndOrganizationWithKeys.organizationHasApiKeys) {
        if (keysData.userAndOrganizationWithKeys.isAdmin) {
          setCurrentStep(4) // API Key setup
        } else {
          setCurrentStep(5) // Contact admin message
        }
      } else {
        finishOnboarding()
      }
    } else {
      setCurrentStep(2) // Go back to verification
    }
  }

  const finishOnboarding = () => {
    navigate(routes.homeWithAppId({ appId: appId }))
  }

  // Step 1: Organization Selection (if user has multiple orgs)
  const renderOrgSelection = () => {
    if (orgsLoading) return <div>Loading your organizations...</div>

    const orgs = orgsData?.organizationsOfAUser || []

    return (
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Select Your Organization
          </h3>
          <div className="mt-5">
            <div className="space-y-4">
              {orgs.map((org) => (
                <button
                  key={org.id}
                  onClick={() => selectOrganization(org.id)}
                  className="w-full inline-flex items-center justify-between px-4 py-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {org.name}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              ))}

              {orgs.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">
                    You don't have any organizations yet.
                  </p>
                  <button
                    onClick={() => navigate(routes.newOrganization())}
                    className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Create Organization
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Step 2: Verification (transitional state)
  const renderVerification = () => {
    return (
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
          <h3 className="mt-4 text-lg font-medium leading-6 text-gray-900">
            Checking your account...
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            We're verifying your organization's configuration.
          </p>
        </div>
      </div>
    )
  }

  // Step 3: Display Name Preference Setup
  const renderDisplayNameSetup = () => {
    return (
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Set Display Preference
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              Please choose how you'd like to be identified in the platform.
            </p>
          </div>
          <div className="mt-5 space-y-4">
            <div className="flex items-center">
              <input
                id="display-name"
                name="display-preference"
                type="radio"
                defaultChecked
                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <label
                htmlFor="display-name"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                Use my full name
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="display-email"
                name="display-preference"
                type="radio"
                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <label
                htmlFor="display-email"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                Use my email address
              </label>
            </div>
            <div className="pt-4">
              <button
                type="button"
                onClick={saveDisplayNamePreference}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Preference
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Step 4: API Key Setup for Admins
  const renderApiKeySetup = () => {
    return (
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Set Up API Integration
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              Before your organization can use the platform, you need to connect
              to at least one service by adding an API key.
            </p>
          </div>
          <div className="mt-5">
            <button
              type="button"
              onClick={() =>
                navigate(routes.newApiKey({ organizationId: selectedOrgId }))
              }
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add API Key
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Step 5: Non-admin user message
  const renderNonAdminMessage = () => {
    return (
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            API Setup Required
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              Your organization needs to set up API keys before you can proceed.
              Please contact your organization administrator to set up the
              required API keys.
            </p>
          </div>
          <div className="mt-5">
            <button
              type="button"
              onClick={() => navigate(routes.home())}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Progress indicator
  const renderProgress = () => {
    // Adjust max steps based on the flow
    const maxSteps = 5

    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center h-8 w-8 rounded-full ${currentStep >= 1 ? 'bg-indigo-600' : 'bg-gray-300'}`}
            >
              <span className="text-white font-medium">1</span>
            </div>
            <div
              className={`ml-3 ${currentStep >= 1 ? 'text-indigo-800' : 'text-gray-500'}`}
            >
              <span>Organization</span>
            </div>
          </div>

          <div
            className={`h-1 w-12 ${currentStep >= 2 ? 'bg-indigo-600' : 'bg-gray-300'}`}
          ></div>

          <div className="flex items-center">
            <div
              className={`flex items-center justify-center h-8 w-8 rounded-full ${currentStep >= 2 ? 'bg-indigo-600' : 'bg-gray-300'}`}
            >
              <span className="text-white font-medium">2</span>
            </div>
            <div
              className={`ml-3 ${currentStep >= 2 ? 'text-indigo-800' : 'text-gray-500'}`}
            >
              <span>Verification</span>
            </div>
          </div>

          <div
            className={`h-1 w-12 ${currentStep >= 3 ? 'bg-indigo-600' : 'bg-gray-300'}`}
          ></div>

          <div className="flex items-center">
            <div
              className={`flex items-center justify-center h-8 w-8 rounded-full ${currentStep >= 3 ? 'bg-indigo-600' : 'bg-gray-300'}`}
            >
              <span className="text-white font-medium">3</span>
            </div>
            <div
              className={`ml-3 ${currentStep >= 3 ? 'text-indigo-800' : 'text-gray-500'}`}
            >
              <span>Profile</span>
            </div>
          </div>

          <div
            className={`h-1 w-12 ${currentStep >= 4 ? 'bg-indigo-600' : 'bg-gray-300'}`}
          ></div>

          <div className="flex items-center">
            <div
              className={`flex items-center justify-center h-8 w-8 rounded-full ${currentStep >= 4 ? 'bg-indigo-600' : 'bg-gray-300'}`}
            >
              <span className="text-white font-medium">4</span>
            </div>
            <div
              className={`ml-3 ${currentStep >= 4 ? 'text-indigo-800' : 'text-gray-500'}`}
            >
              <span>API Setup</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ShippyCloudColorfulBackground>
      <div className="max-w-3xl w-full mx-auto my-5 px-12 py-12 bg-white bg-opacity-[98] rounded-2xl shadow-2xl shadow-sky-300">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Welcome to the Shippycloud
        </h1>
        {currentUser ? (
          <>
            {renderProgress()}

            {currentStep === 1 && renderOrgSelection()}
            {currentStep === 2 && renderVerification()}
            {currentStep === 3 && renderDisplayNameSetup()}
            {currentStep === 4 && renderApiKeySetup()}
            {currentStep === 5 && renderNonAdminMessage()}
          </>
        ) : (
          <>Login/Signup to continue!</>
        )}
      </div>
    </ShippyCloudColorfulBackground>
  )
}

export default UserOnboardingFlow
