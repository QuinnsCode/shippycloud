import { PostHog } from 'posthog-node'

export const posthog = new PostHog(process.env.POSTHOG_API_KEY, {
  host: process.env.POSTHOG_HOST,
  flushAt: 1, // For development, remove in production
  flushInterval: 0, // For development, remove in production
})
