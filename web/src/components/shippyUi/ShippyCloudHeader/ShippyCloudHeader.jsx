import { Link, routes } from '@redwoodjs/router'

import ShippyCloudLogo from 'src/components/shippyUi/ShippyCloudLogo/ShippyCloudLogo'

const ShippyCloudHeader = () => {
  return (
    <div className="">
      <div className="hidden sm:hidden md:block lg:block xl:block 2xl:block">
        <h1 className="text-5xl font-semibold tracking-tight inline-flex p-1">
          <Link
            className="text-blue-400 hover:text-blue-300 transition duration-100 inline-flex"
            to={routes.home()}
          >
            ShippyCloud
          </Link>
          <div className="">
            <div className="-my-3">
              <ShippyCloudLogo heightWidthString={''} />
            </div>
          </div>
        </h1>
      </div>
      <div className="block sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
        <h1 className="text-3xl font-semibold tracking-tight">
          {/* <Link
            className="text-blue-200 hover:text-blue-300 transition duration-100"
            to={routes.home()}
          >
            ShippyCloud
          </Link> */}
          <Link to={routes.home()}>
            <div className="absolute left-0 -top-5 scale-[.8] inline-flex">
              <div className="inline-flex">
                <ShippyCloudLogo heightWidthString={''} />
              </div>
            </div>
          </Link>
        </h1>
      </div>
    </div>
  )
}

export default ShippyCloudHeader
