import { navigate, routes } from '@redwoodjs/router'

import ShippyCloudFailure from 'src/components/shippyUi/ShippyCloudFailure/ShippyCloudFailure'
import { Badge } from 'src/components/ui/badge'

import ShippyCloudPageHeader from '../shippyUi/ShippyCloudPageHeader/ShippyCloudPageHeader'
import ShippyCloudSkyBanner from '../shippyUi/ShippyCloudSkyBanner/ShippyCloudSkyBanner'

export const QUERY = gql`
  query UserAndOrganizationWithKeysQuery(
    $userId: String!
    $organizationId: String!
  ) {
    userAndOrganizationWithKeys(
      userId: $userId
      organizationId: $organizationId
    ) {
      id
      userId
      organizationId
      name
      email
      organizationName
      role
      isAdmin
      organizationSettings
      hasApiKeys
      organizationHasApiKeys
      hasChosenDisplayEmailOrName
      apiKeyProviders
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>No user organization settings found.</div>

export const Failure = ({ error }) => (
  <ShippyCloudFailure errorMessage={error?.message} />
)

export const Success = ({ userAndOrganizationWithKeys, refetch }) => {
  const {
    name,
    email,
    organizationId,
    organizationName,
    role,
    isAdmin,
    organizationSettings,
    organizationHasApiKeys,
    hasChosenDisplayEmailOrName,
    apiKeyProviders,
  } = userAndOrganizationWithKeys

  // Parse organization settings if it exists
  const settings = organizationSettings ? JSON.parse(organizationSettings) : {}

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 inline-flex w-full items-center justify-between">
        <ShippyCloudPageHeader>
          User and Organization Settings
        </ShippyCloudPageHeader>

        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {isAdmin ? <Badge>ADMIN</Badge> : ''}
        </p>
      </div>

      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">User Name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {name || 'Not set'}
              {!hasChosenDisplayEmailOrName && (
                <span className="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Display preference not set
                </span>
              )}
            </dd>
          </div>

          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {email}
            </dd>
          </div>

          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Organization</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {organizationName}
            </dd>
          </div>

          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Role</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {role}
            </dd>
          </div>

          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">API Keys</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {organizationHasApiKeys ? (
                <div>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    API Keys Configured
                  </span>
                  {isAdmin && apiKeyProviders.length > 0 && (
                    <ul className="mt-2 divide-y divide-gray-200">
                      {apiKeyProviders.map((provider) => (
                        <li key={provider} className="py-2">
                          <div className="flex items-center">
                            <span className="font-medium">{provider}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <div className="flex items-center">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                    No API Keys
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    This organization needs API keys to function properly
                  </span>
                </div>
              )}
            </dd>
          </div>

          {isAdmin && (
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Organization Settings
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {Object.keys(settings).length > 0 ? (
                  <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                    {Object.entries(settings).map(([key, value]) => (
                      <li
                        key={key}
                        className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                      >
                        <div className="w-0 flex-1 flex items-center">
                          <span className="ml-2 flex-1 w-0 truncate">
                            {key}
                          </span>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <span
                            className={
                              typeof value === 'boolean' && value
                                ? 'text-green-600 font-medium'
                                : 'text-red-600'
                            }
                          >
                            {typeof value === 'boolean'
                              ? value
                                ? 'Enabled'
                                : 'Disabled'
                              : value}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span>No settings configured</span>
                )}
              </dd>
            </div>
          )}
        </dl>
      </div>

      {isAdmin && (
        <div className="border-t border-gray-200">
          <div className="px-4 py-4">
            <h4 className="text-sm font-medium text-gray-900">Setup Status</h4>
            <div className="mt-3 space-y-2">
              {/* Display Name Status */}
              {!hasChosenDisplayEmailOrName && (
                <div className="px-4 py-3 bg-yellow-50 sm:rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">
                        Display Preference Not Set
                      </h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>
                          Please set your display name preference in your
                          profile settings.
                        </p>
                      </div>
                      <div className="mt-4">
                        <div className="-mx-2 -my-1.5 flex">
                          <button
                            onClick={() => {
                              // Navigate to profile settings
                              // window.location.href = `/account/profile`
                              navigate(
                                routes.settingsOfAnOrg({
                                  appId: organizationId,
                                })
                              )
                            }}
                            className="px-2 py-1.5 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600"
                          >
                            Update Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* API Keys Status */}
              {!organizationHasApiKeys && (
                <div className="px-4 py-3 bg-yellow-50 sm:rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">
                        Missing API Keys
                      </h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>
                          Your organization requires API keys to function
                          properly. Please add at least one API key.
                        </p>
                      </div>
                      <div className="mt-4">
                        <div className="-mx-2 -my-1.5 flex">
                          <button
                            onClick={() => {
                              // Navigate to API key setup page
                              window.location.href = `/organizations/${organizationId}/api-keys/new`
                            }}
                            className="px-2 py-1.5 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600"
                          >
                            Add API Key
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
