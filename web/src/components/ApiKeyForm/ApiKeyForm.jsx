import { useState } from 'react'

import { toast } from 'sonner'

import {
  Form,
  FormError,
  Label,
  TextField,
  SelectField,
  Submit,
} from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { encodeShipstationApiKey, processApiKey } from 'src/lib/apiUtils'
// import { toast } from '@redwoodjs/web/toast'

const CREATE_ORGANIZATION_API_KEY = gql`
  mutation CreateOrganizationApiKeyMutation(
    $input: CreateOrganizationApiKeyInput!
  ) {
    createOrganizationApiKey(input: $input) {
      id
      provider
      label
    }
  }
`

const ApiKeyForm = ({ organizationId }) => {
  const { currentUser } = useAuth()
  const [inputType, setInputType] = useState('separate')
  const [apiKey, setApiKey] = useState('')
  const [apiSecret, setApiSecret] = useState('')
  const [formattedKey, setFormattedKey] = useState('')

  const [createApiKey, { loading, error }] = useMutation(
    CREATE_ORGANIZATION_API_KEY,
    {
      onCompleted: () => {
        toast.success('API key created successfully')
        navigate(routes.onboarding({ appId: organizationId }))
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSubmit = (data) => {
    let finalKey = ''

    if (inputType === 'separate') {
      // Generate the Base64 key from separate API key and secret
      finalKey = encodeShipstationApiKey(data.apiKey, data.apiSecret)
    } else {
      // Process the pre-formatted key
      finalKey = processApiKey(data.formattedKey)
    }

    alert(finalKey)

    createApiKey({
      variables: {
        input: {
          organizationId,
          provider: data.provider,
          label: data.label || undefined,
          apiKey: finalKey,
          createdBy: currentUser.id,
        },
      },
    })
  }

  const providerOptions = [
    { value: 'SHIPSTATION', label: 'ShipStation' },
    // { value: 'SHOPIFY', label: 'Shopify' },
    // { value: 'AMAZON', label: 'Amazon' },
    // { value: 'ETSY', label: 'Etsy' },
    // { value: 'EBAY', label: 'eBay' },
    // { value: 'OTHER', label: 'Other' }
  ]

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Add API Key
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Add an API key for integration with third-party services.
        </p>
      </div>

      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        <Form onSubmit={onSubmit} error={error}>
          <FormError
            error={error}
            wrapperClassName="bg-red-100 text-red-900 px-4 py-3 rounded mb-4"
            titleClassName="font-bold"
            listClassName="list-disc pl-4 mt-2"
          />

          <div className="space-y-6">
            <div>
              <Label
                name="provider"
                className="block text-sm font-medium text-gray-700"
              >
                Provider
              </Label>
              <SelectField
                name="provider"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                validation={{ required: true }}
                options={providerOptions}
              >
                {providerOptions?.map((opt) => {
                  return (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  )
                })}
              </SelectField>
            </div>

            <div>
              <Label
                name="label"
                className="block text-sm font-medium text-gray-700"
              >
                Label (Optional)
              </Label>
              <TextField
                name="label"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g. Production ShipStation Key"
              />
            </div>

            {/* Tab Selector */}
            <div>
              <div className="sm:hidden">
                <label htmlFor="input-type" className="sr-only">
                  Select Input Type
                </label>
                <select
                  id="input-type"
                  name="input-type"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={inputType}
                  onChange={(e) => setInputType(e.target.value)}
                >
                  <option value="separate">API Key + Secret</option>
                  <option value="formatted">Formatted API Key</option>
                </select>
              </div>

              <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex" aria-label="Tabs">
                    <button
                      type="button"
                      onClick={() => setInputType('separate')}
                      className={`${
                        inputType === 'separate'
                          ? 'border-indigo-500 text-indigo-600 bg-indigo-50'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                    >
                      API Key + Secret
                    </button>
                    <button
                      type="button"
                      onClick={() => setInputType('formatted')}
                      className={`${
                        inputType === 'formatted'
                          ? 'border-indigo-500 text-indigo-600 bg-indigo-50'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                    >
                      Formatted API Key
                    </button>
                  </nav>
                </div>
              </div>
            </div>

            {/* Separate API Key + Secret Fields */}
            {inputType === 'separate' && (
              <div className="space-y-4">
                <div>
                  <Label
                    name="apiKey"
                    className="block text-sm font-medium text-gray-700"
                  >
                    API Key
                  </Label>
                  <TextField
                    name="apiKey"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    validation={{ required: inputType === 'separate' }}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                </div>

                <div>
                  <Label
                    name="apiSecret"
                    className="block text-sm font-medium text-gray-700"
                  >
                    API Secret
                  </Label>
                  <TextField
                    name="apiSecret"
                    type="password"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    validation={{ required: inputType === 'separate' }}
                    value={apiSecret}
                    onChange={(e) => setApiSecret(e.target.value)}
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-blue-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3 flex-1 md:flex md:justify-between">
                      <p className="text-sm text-blue-700">
                        Enter your API Key and Secret separately. We'll
                        automatically format and encrypt them for secure
                        storage.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pre-formatted API Key Field */}
            {inputType === 'formatted' && (
              <div className="space-y-4">
                <div>
                  <Label
                    name="formattedKey"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Formatted API Key
                  </Label>
                  <TextField
                    name="formattedKey"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-mono"
                    placeholder="Basic U2hpcFN0YXRpb246Um9ja3M="
                    validation={{ required: inputType === 'formatted' }}
                    value={formattedKey}
                    onChange={(e) => setFormattedKey(e.target.value)}
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-blue-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3 flex-1 md:flex md:justify-between">
                      <p className="text-sm text-blue-700">
                        Enter your full API key including the "Basic " prefix if
                        present. We'll automatically format and store it
                        securely.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
                onClick={() =>
                  navigate(routes.organization({ id: organizationId }))
                }
                disabled={loading}
              >
                Cancel
              </button>
              <Submit
                className="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save API Key'}
              </Submit>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default ApiKeyForm
