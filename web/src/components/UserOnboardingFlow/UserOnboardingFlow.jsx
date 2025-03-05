import { useState, useEffect } from 'react'

import { navigate, routes } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

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
      hasApiKeys
      apiKeyProviders
      organizationId
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

  // If organization is selected, check for API keys
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
      // alert('we have an org)')
      setCurrentStep(2) // Skip to API key check step
    }
  }, [orgsLoading, orgsData])

  // Auto-advance if API keys are already set up
  useEffect(() => {
    if (!keysLoading && keysData?.userAndOrganizationWithKeys?.hasApiKeys) {
      // alert('not loading, has keys')
      const orgId =
        appId || keysData?.userAndOrganizationWithKeys?.organizationId
      // All set, redirect to main dashboard
      if (!appId) {
        navigate(routes.onboarding({ appId: orgId }))
      } else {
        finishOnboarding()
      }
    } else if (
      !keysLoading &&
      keysData?.userAndOrganizationWithKeys?.isAdmin &&
      !keysData?.userAndOrganizationWithKeys?.hasApiKeys
    ) {
      // alert('not loading, has keys, is admin')
      setCurrentStep(3) // Go to API key setup step
    }
  }, [keysLoading, keysData])

  const selectOrganization = (orgId) => {
    setSelectedOrgId(orgId)
    setCurrentStep(2) // Move to checking API keys
  }

  const goToApiKeySetup = () => {
    setCurrentStep(3)
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

  // Step 2: Checking API keys (transitional state)
  const renderCheckingKeys = () => {
    return (
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
          <h3 className="mt-4 text-lg font-medium leading-6 text-gray-900">
            Checking your account setup...
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            {" We're verifying your organization's configuration."}
          </p>
        </div>
      </div>
    )
  }

  // Step 3: API Key Setup for Admins
  const renderApiKeySetup = () => {
    return (
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Set Up API Integration
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              Before you can use the platform, you need to connect to at least
              one service by adding an API key.
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

  // Progress indicator
  const renderProgress = () => {
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
            className={`h-1 w-16 ${currentStep >= 2 ? 'bg-indigo-600' : 'bg-gray-300'}`}
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
            className={`h-1 w-16 ${currentStep >= 3 ? 'bg-indigo-600' : 'bg-gray-300'}`}
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
              <span>API Setup</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Welcome to the Platform
      </h1>

      {renderProgress()}

      {currentStep === 1 && renderOrgSelection()}
      {currentStep === 2 && renderCheckingKeys()}
      {currentStep === 3 && renderApiKeySetup()}
    </div>
  )
}

export default UserOnboardingFlow
