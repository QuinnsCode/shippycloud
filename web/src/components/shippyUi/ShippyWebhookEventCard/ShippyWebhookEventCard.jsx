import { useState } from 'react'

import ShippyBottomBorder from 'src/components/shippyUi/ShippyBottomBorder'
import ShipstationFetcherCell from 'src/components/Shipstation/ShipstationFetcherCell/ShipstationFetcherCell'

const ShippyWebhookEventCard = ({
  event,
  payload,
  source,
  index,
  openMoreInfo,
}) => {
  const payloadParsed = JSON.parse(payload)
  const shipstationUrl = payloadParsed?.resource_url

  const formattedPayload = JSON.stringify(payloadParsed, null, 2)

  const [shouldOverflow, setShouldOverflow] = useState(false)

  return (
    <div className="bg-gradient-to-r from-blue-50 via-blue-50 to-sky-50 hover:bg-gradient-to-r hover:from-blue-50 hover:via-white hover:to-white focus:bg-white text-slate-900 rounded-lg shadow-md shadow-slate-400 inline-flex w-full mx-0.5">
      <button
        onClick={() => {
          setShouldOverflow(!shouldOverflow)
        }}
        className={`h-[6.5rem] ${shouldOverflow ? 'overflow-y-scroll' : 'overflow-clip mr-3'} flex-wrap inline block text-justify`}
      >
        <div className="relative inline-flex top-0 text-sm w-[2rem] truncate overflow-ellipsis hover:overflow-visible border-r border-slate-300 font-medium text-slate-900 items-center px-2">
          {index + 1}
          {`) `}
        </div>
        <div className="p-2">
          <div className="text-sm font-medium text-slate-900">
            Event: {event}
          </div>

          <div className="text-sm text-slate-600">
            Payload: <br />
            <code>{formattedPayload}</code>
          </div>

          <button
            className="rw-button text-white bg-gradient-to-r from-blue-500 via-sky-500 to-sky-500 hover:bg-gradient-to-r hover:from-blue-600 hover:via-sky-600 hover:to-sky-600 focus:bg-white rounded-lg shadow-md shadow-slate-400 inline-flex w-full mx-0.5"
            onClick={openMoreInfo}
          >
            Open Shipstation
          </button>

          <ShippyBottomBorder source={source} />
        </div>
      </button>
    </div>
  )
}

export default ShippyWebhookEventCard
