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
      apiKeyProviders
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>No user organization settings found.</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
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
    hasApiKeys,
    apiKeyProviders,
  } = userAndOrganizationWithKeys

  // Parse organization settings if it exists
  const settings = organizationSettings ? JSON.parse(organizationSettings) : {}

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          User and Organization Settings
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {isAdmin ? 'Admin access granted' : 'Limited access'}
        </p>
      </div>

      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">User Name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {name}
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

          {isAdmin && (
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">API Keys</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {hasApiKeys ? (
                  <div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      API Keys Configured
                    </span>
                    <ul className="mt-2 divide-y divide-gray-200">
                      {apiKeyProviders.map((provider) => (
                        <li key={provider} className="py-2">
                          <div className="flex items-center">
                            <span className="font-medium">{provider}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
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
          )}

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

      {isAdmin && !hasApiKeys && (
        <div className="px-4 py-3 bg-yellow-50 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-yellow-800">
                Missing API Keys
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Your organization requires API keys to function properly.
                  Please add at least one API key.
                </p>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0">
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  // Navigate to API key setup page
                  window.location.href = `/organizations/${organizationId}/api-keys/new`
                }}
              >
                Add API Key
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
