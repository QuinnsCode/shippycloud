import React from 'react'

const ShippyCloudBanner = ({ children }) => {
  return (
    <div className="relative py-4 px-4 shadow-lg overflow-hidden rounded-2xl shadow-white my-2 border-2 border-sky-400">
      {/* Main background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-blue-500 to-sky-400"></div>

      {/* Cloud-like shapes */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-48 h-48 bg-white rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-white rounded-full blur-2xl"></div>
      </div>

      {/* Animated floating clouds */}
      <div className="absolute inset-0 opacity-20 animate-float">
        <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute top-3/4 right-1/3 w-40 h-40 bg-white rounded-full blur-xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-white text-center text-shadow-lg">
          {children}
        </h2>
      </div>
    </div>
  )
}

export default ShippyCloudBanner
