import { usePostHog } from 'posthog-js/react'

const PostHogTestButton = () => {
  const posthog = usePostHog()

  const handleTrackEvent = () => {
    // posthog.capture('test_button_clicked', {
    //   location: 'PostHogTestButton',
    //   timestamp: new Date().toISOString(),
    // })
    posthog.capture('my event', { property: 'value' })
    alert('Event tracked in PostHog!')
  }

  return (
    <button
      onClick={handleTrackEvent}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      PostHog - Track PostHogTest Event
    </button>
  )
}

export default PostHogTestButton
