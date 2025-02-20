const ShippyCloudSkyBanner = ({ children }) => {
  let orderNumber = null
  if (typeof children === 'string') {
    orderNumber = children
  }

  return (
    <div className="relative w-full h-[2rem] overflow-hidden rounded-2xl">
      {/* Sky gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-300">
        {/* Decorative clouds using SVG */}
        <svg
          className="absolute w-full h-full opacity-60"
          viewBox="0 0 1000 120"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M0,50 Q250,20 500,50 T1000,50 L1000,120 L0,120 Z"
            fill="rgba(255,255,255,0.3)"
          />
          <path
            d="M0,70 Q250,40 500,70 T1000,70 L1000,120 L0,120 Z"
            fill="rgba(255,255,255,0.2)"
          />
        </svg>

        {/* Floating clouds */}
        <div className="absolute top-0 left-[calc(30vw)] opacity-80">
          <svg width="60" height="30" viewBox="0 0 60 30">
            <path
              d="M10,20 Q15,10 25,15 Q35,5 45,15 Q50,20 40,25 Q30,30 20,25 Q10,25 10,20"
              fill="white"
            />
          </svg>
        </div>
        <div className="absolute top-2 right-12 opacity-60">
          <svg width="50" height="25" viewBox="0 0 50 25">
            <path
              d="M5,15 Q10,5 20,10 Q30,0 40,10 Q45,15 35,20 Q25,25 15,20 Q5,20 5,15"
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* Order number text */}
      <div className="relative flex h-full">
        <h1 className="text-xl pl-2 font-bold text-white tracking-wide">
          {orderNumber}
        </h1>
      </div>
    </div>
  )
}

export default ShippyCloudSkyBanner
