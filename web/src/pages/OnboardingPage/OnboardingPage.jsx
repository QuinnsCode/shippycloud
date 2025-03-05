import { MetaTags } from '@redwoodjs/web'

import UserOnboardingFlow from 'src/components/UserOnboardingFlow'

const OnboardingPage = ({ appId }) => {
  return (
    <>
      <MetaTags title="Welcome" description="Complete your account setup" />

      <UserOnboardingFlow appId={appId} />
    </>
  )
}

export default OnboardingPage
