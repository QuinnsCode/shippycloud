// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import ShippyCloudBanner from 'src/components/shippyUi/ShippyCloudBanner/ShippyCloudBanner'
import ShippyCloudHeader from 'src/components/shippyUi/ShippyCloudHeader/ShippyCloudHeader'
import ShippyCloudSkyBanner from 'src/components/shippyUi/ShippyCloudSkyBanner/ShippyCloudSkyBanner'

{
  /* <p>Table of Contents</p>
      <ul>
        <li>Getting Started</li>
        <li>Installation</li>
        <li>Configuration</li>
        <li>Usage</li>
        <li>API</li>
        <li>FAQ</li>
        <li>Troubleshooting</li>
        <li>Contributing</li>
        <li>License</li>
      </ul> */
}
const DocsPage = () => {
  return (
    <>
      <Metadata
        title="ShippyCloud Setup Guide"
        description="Documentation for setting up and using ShippyCloud"
      />
      <ShippyCloudBanner>
        <h1>ShippyCloud Setup Guide</h1>
      </ShippyCloudBanner>
      <div className="w-full h-[calc(100vh-12rem)] px-8 py-4 bg-gradient-to-b from-sky-100 via-sky-100 to-blue-100 border-r border-gray-200 transition-all duration-300 overflow-y-scroll">
        <div className="mb-12">
          <ShippyCloudSkyBanner>Getting Started</ShippyCloudSkyBanner>
          <section className="mt-4">
            <ul className="list-disc pl-5">
              <li>
                Sign up for a ShippyCloud account (this makes you a{' '}
                <strong>USER</strong>).
              </li>
              <li>
                Click &apos;Add An Organization&apos; (this makes you the{' '}
                <strong>ADMIN</strong>).
              </li>
              <li>
                Set up API Keys (<strong>ADMIN</strong> only).
              </li>
              <li>Configure Webhooks in Shipstation.</li>

              <li>Add Organization MANAGERS or MEMBERS.</li>
              <li>MANAGERS have access change the view of MEMBERS.</li>
              <li>
                MEMBERS have the ability to add and combine orders and
                shipments. Their view is limited to what is allowed by ADMINs
                and MANAGERs.
              </li>
              <li>Begin importing and organizing your shipping data.</li>
            </ul>
          </section>
        </div>

        <div className="mb-12">
          <ShippyCloudSkyBanner>User Roles & Permissions</ShippyCloudSkyBanner>
          <section className="mt-4">
            <ul className="list-disc pl-5">
              <li>
                <strong>ADMIN:</strong> Full control over the organization,
                including API access and deletion rights.
              </li>
              <li>
                <strong>MANAGER:</strong> Can customize user permissions and
                manage resources.
              </li>
              <li>
                <strong>MEMBER:</strong> Can view assigned resources and process
                orders in batches.
              </li>
            </ul>
          </section>
        </div>

        <div className="mb-12">
          <ShippyCloudSkyBanner>Setup Process</ShippyCloudSkyBanner>
          <section className="mt-4">
            <h2 className="font-bold">1. Create Your Organization</h2>
            <ul className="list-disc pl-5 mt-2">
              <li>Name your organization.</li>
              <li>Configure initial settings.</li>
            </ul>

            <h2 className="font-bold mt-4">2. Connect to Shipstation</h2>
            <ul className="list-disc pl-5 mt-2">
              <li>
                Add your Shipstation API Key to ShippyCloud (securely
                encrypted).
              </li>
              <li>Input API Key or Key/Secret combination as required.</li>
            </ul>

            <h2 className="font-bold mt-4">3. Configure Webhooks</h2>
            <ul className="list-decimal pl-5 mt-2">
              <li>Go to Shipstation Settings.</li>
              <li>Navigate to Integrations &gt; Webhook.</li>
              <li>Add a new Webhook named &apos;ShippyCloud&apos;.</li>
              <li>
                Enter URL:{' '}
                <span className="bg-gray-200 px-1 rounded">URL GOES HERE.</span>
              </li>
              <li>
                Select events to monitor (<strong>SHIP_NOTIFY</strong>{' '}
                recommended).
              </li>
            </ul>

            <h2 className="font-bold mt-4">
              4. Finalize Organization Settings
            </h2>
            <ul className="list-disc pl-5 mt-2">
              <li>
                Set visibility preferences for orders, products, and stores.
              </li>
              <li>Configure individual user settings as needed.</li>
            </ul>
          </section>
        </div>
      </div>
    </>
  )
}

export default DocsPage
