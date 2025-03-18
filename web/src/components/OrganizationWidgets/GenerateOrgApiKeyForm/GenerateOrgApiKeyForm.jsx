import React, { useState } from 'react'

import { toast } from 'sonner'

import { useMutation } from '@redwoodjs/web'
// import { toast } from '@redwoodjs/web/toast'

import ShippyCloudBanner from 'src/components/shippyUi/ShippyCloudBanner/ShippyCloudBanner'

// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
// } from 'src/components/ui/card'

const CREATE_ORGANIZATION_API_KEY = gql`
  mutation CreateOrganizationApiKey($input: CreateOrganizationApiKeyInput!) {
    createOrganizationApiKey(input: $input) {
      id
      provider
      label
      isActive
      createdAt
    }
  }
`

const GenerateOrgApiKeyForm = ({ organizationId }) => {
  const [formData, setFormData] = useState({
    provider: '',
    label: '',
    apiKey: '',
  })

  const [createApiKey, { loading, error }] = useMutation(
    CREATE_ORGANIZATION_API_KEY,
    {
      onCompleted: () => {
        toast.success('API key added successfully')
        setFormData({ provider: '', label: '', apiKey: '' })
      },
      onError: (error) => {
        if (error.message.includes('Not authorized')) {
          toast.error('You must be an admin or owner to manage API keys')
        } else {
          toast.error('Failed to add API key: ' + error.message)
        }
      },
    }
  )

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log({
      organizationId,
      provider: formData.provider,
      label: formData.label,
      apiKey: formData.apiKey,
    })
    try {
      await createApiKey({
        variables: {
          input: {
            organizationId: organizationId,
            provider: formData.provider,
            label: formData.label,
            apiKey: formData.apiKey,
          },
        },
      })
    } catch (err) {
      console.error('Error creating API key:', err)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    // <Card className="w-full max-w-2xl mx-auto">
    //   <CardHeader>
    //     <CardTitle>Add API Key</CardTitle>
    //   </CardHeader>
    //   <CardContent>
    <div className="rw-segment">
      <form onSubmit={handleSubmit} className="space-y-4 rw-segment">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Provider</label>
          <select
            name="provider"
            value={formData.provider}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-gray-100 border-gray-700"
            required
          >
            <option value="">Select Provider</option>
            <option value="SHIPSTATION">ShipStation</option>
            <option value="SHOPIFY">Shopify</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Label</label>
          <input
            type="text"
            name="label"
            value={formData?.label}
            onChange={handleInputChange}
            placeholder="Enter a descriptive label"
            className="w-full p-2 border rounded bg-gray-100 border-gray-700"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">API Key</label>
          <input
            type="password"
            name="apiKey"
            value={formData.apiKey}
            onChange={handleInputChange}
            placeholder="Paste in your API key"
            className="w-full p-2 border rounded bg-gray-100 border-gray-700"
            required
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error.message}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add API Key'}
        </button>
      </form>
    </div>
    //   </CardContent>
    // </Card>
  )
}

export default GenerateOrgApiKeyForm
