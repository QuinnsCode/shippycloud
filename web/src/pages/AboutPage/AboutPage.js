import { MetaTags } from '@redwoodjs/web'

import ShippyCloudColorfulBackground from 'src/components/shippyUi/ShippyCloudColorfulBackground/ShippyCloudColorfulBackground'

const AboutPage = () => {
  return (
    <>
      <MetaTags title="About" description="About page" />
      <ShippyCloudColorfulBackground>
        <div className="max-w-3xl m-auto px-24 py-16 bg-white bg-opacity-[98] rounded-2xl shadow-2xl shadow-sky-300 text-center">
          <p className="font-light mb-5">Make Shipstation work for you.</p>
          <p className="font-light">
            Save Time, Save Money, Save with ShippyCloud fulfillment software
            solutions.
          </p>
        </div>
      </ShippyCloudColorfulBackground>
    </>
  )
}

export default AboutPage
