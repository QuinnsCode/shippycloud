import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import { AuthProvider, useAuth } from './auth'

import './scaffold.css'
import './index.css'

// Initialize PostHog before the App component
posthog.init(process.env.POSTHOG_API_KEY, {
  api_host: process.env.POSTHOG_HOST,
  person_profiles: 'identified_only',
  autocapture: {
    dom_event_allowlist: ['click'], // Only track click events
    enabled: true,
    exclude_inputs: true, // Exclude input fields for privacy
  },
  capture_pageview: true, // Track page views
  disable_session_recording: true, // Optional: disable session recording
})

const options = {
  api_host: process.env.POSTHOG_HOST,
}

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProvider>
        <PostHogProvider apiKey={process.env.POSTHOG_API_KEY} options={options}>
          <RedwoodApolloProvider useAuth={useAuth}>
            <Routes />
          </RedwoodApolloProvider>
        </PostHogProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
