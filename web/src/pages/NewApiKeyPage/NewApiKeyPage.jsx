// web/src/pages/NewApiKeyPage/NewApiKeyPage.js
import { useParams } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import ApiKeyForm from 'src/components/ApiKeyForm'

const NewApiKeyPage = () => {
  const { organizationId } = useParams()

  return (
    <>
      <MetaTags
        title="Add API Key"
        description="Add a new API key for your organization"
      />

      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Add API Key
        </h1>

        <ApiKeyForm organizationId={organizationId} />
      </div>
    </>
  )
}

export default NewApiKeyPage
