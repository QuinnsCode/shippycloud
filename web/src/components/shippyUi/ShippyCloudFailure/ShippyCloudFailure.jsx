import React from 'react'

import { AlertTriangle } from 'lucide-react'

export const ShippyCloudFailure = ({ errorMessage }) => (
  <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-gradient-to-b from-blue-100 to-blue-200 shadow-lg max-w-md mx-auto">
    <div className="relative w-64 h-48">
      {/* Background clouds */}
      <svg
        className="absolute inset-0"
        viewBox="0 0 240 180"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Cloud 1 with subtle red tinge */}
        <path
          d="M40,70 C40,55 50,50 65,50 C75,40 95,40 105,50 C115,40 130,45 135,55 C150,55 155,65 155,75 C155,90 140,95 135,95 C135,105 125,110 115,110 C105,120 85,120 75,110 C65,115 50,110 45,100 C35,100 30,90 30,80 C30,75 35,70 40,70 Z"
          fill="url(#cloudGradient1)"
        />

        {/* Cloud 2 */}
        <path
          d="M170,110 C170,95 180,90 195,90 C205,80 220,85 225,95 C235,95 240,105 240,115 C240,130 225,135 220,135 C220,145 210,150 200,150 C190,160 175,155 170,145 C160,145 155,135 155,125 C155,120 160,110 170,110 Z"
          fill="url(#cloudGradient2)"
        />

        {/* Error cloud with stronger red tinge */}
        <path
          d="M80,120 C80,105 90,100 105,100 C115,90 130,95 135,105 C145,105 150,115 150,125 C150,140 135,145 130,145 C130,155 120,160 110,160 C100,170 85,165 80,155 C70,155 65,145 65,135 C65,130 70,120 80,120 Z"
          fill="url(#errorCloudGradient)"
        />

        {/* Definitions for cloud gradients */}
        <defs>
          <linearGradient
            id="cloudGradient1"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>

          <linearGradient
            id="cloudGradient2"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          <linearGradient
            id="errorCloudGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#fef2f2" />
            <stop offset="100%" stopColor="#fee2e2" />
          </linearGradient>
        </defs>
      </svg>

      {/* Error icon */}
      <div className="absolute animate-pulse duration-[1000] flex items-center justify-center w-full h-full">
        <div className="bg-red-50 p-3 rounded-full shadow-lg border border-red-200">
          <AlertTriangle size={32} className="text-red-500" />
        </div>
      </div>
    </div>

    {/* Error message */}
    <div className="mt-4 text-center">
      <h3 className="text-lg font-semibold text-gray-800">
        Something went wrong
      </h3>
      <p className="mt-2 text-red-600 font-medium">
        {errorMessage || 'An unexpected error occurred'}
      </p>
      {/* <p className="mt-1 text-sm text-gray-600">
        Please try again or contact support
      </p> */}
    </div>
  </div>
)

export default ShippyCloudFailure
