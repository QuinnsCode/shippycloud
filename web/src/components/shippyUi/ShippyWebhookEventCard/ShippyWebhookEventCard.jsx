import { useState } from 'react'

import { useQuery } from '@redwoodjs/web'

import ShippyBottomBorder from 'src/components/shippyUi/ShippyBottomBorder'
// import ShipstationFetcherCell from 'src/components/Shipstation/ShipstationFetcherCell/ShipstationFetcherCell'
import { ShipstationQueries } from 'src/gql/shipstation'
import { useSidebarState } from 'src/hooks/useSidebarState'

const ShippyWebhookEventCard = ({
  event,
  payload,
  source,
  index,
  openMoreInfo,
  organizationId,
}) => {
  const payloadParsed = JSON.parse(payload)
  const shipstationUrl = payloadParsed?.resource_url
  const formattedPayload = JSON.stringify(payloadParsed, null, 2)
  const [isExpanded, setIsExpanded] = useState(false)

  const { updateSidebar } = useSidebarState()

  const { data, loading, error } = useQuery(
    ShipstationQueries.GET_SHIPSTATION,
    {
      variables: { shipstationUrl, organizationId },
    }
  )

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  const shipdersStr = data?.shipders?.data
  const shipders = JSON.parse(shipdersStr)
  const prettyJSON = JSON.stringify(shipders, null, 2)
  const prettyJSONwArray = prettyJSON.replace(/}/g, '},\n')

  const handleOpenMoreInfo = (payload) => {
    updateSidebar(
      'shipstation-event',
      <div className="p-2 whitespace-pre-wrap rounded-[2rem] font-thin font-sans bg-gradient-to-br from-sky-50 via-blue-50 to-blue-100 text-blue-900 h-[calc(100vh-10rem)] overflow-scroll">
        {prettyJSONwArray.replace(/\[/g, '\n[')}
      </div>
    )
  }
  // useEffect(() => {
  //   updateSidebarContent(<div>New content</div>)
  //   return () => updateSidebarContent(null)
  // }, [updateSidebarContent])
  return (
    <>
      {/* Fixed position expanded view */}
      {isExpanded && (
        <button
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsExpanded(false)}
        >
          <button
            className="bg-gradient-to-r cursor-default from-blue-50 via-blue-50 to-sky-50 rounded-lg shadow-xl w-[calc(95vw-4.5rem)] h-[70vh] overflow-y-auto inline-flex"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-2 border-black w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-slate-900">
                  Event #({index + 1}) Details
                </h3>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  ✕
                </button>
              </div>

              <div className="text-sm font-medium text-slate-900 mb-2">
                Event: {event}
              </div>

              <div className="text-sm text-slate-600">
                Payload: <br />
                <code className="block bg-white p-4 rounded-lg overflow-auto">
                  {formattedPayload}
                </code>
              </div>

              <button
                className="mt-4 max-w-[32rem] rw-button text-white bg-gradient-to-r from-blue-500 via-sky-500 to-sky-500 hover:bg-gradient-to-r hover:from-blue-600 hover:via-sky-600 hover:to-sky-600 focus:bg-white rounded-lg shadow-md shadow-slate-400 inline-flex w-full mx-0.5"
                onClick={() => {
                  handleOpenMoreInfo(payloadParsed)
                }}
              >
                Open Shipstation
              </button>

              <ShippyBottomBorder source={source} />
            </div>
          </button>
        </button>
      )}

      {/* Compact card view */}
      <div className="bg-gradient-to-r from-blue-50 via-blue-50 to-sky-50 hover:bg-gradient-to-r hover:from-blue-50 hover:via-white hover:to-white focus:bg-white text-slate-900 rounded-lg shadow-md shadow-slate-400 inline-flex w-[calc(95vw-4.5rem)] mx-0.5">
        <button
          onClick={() => setIsExpanded(true)}
          className="overflow-hidden h-[6.5rem] flex-wrap w-full text-justify"
        >
          <div className="relative inline-flex top-0 text-sm w-[2rem] truncate overflow-ellipsis hover:overflow-visible border-r border-slate-300 font-medium text-slate-900 items-center px-2">
            {index + 1}
          </div>
          <div className="p-2">
            <div className="text-sm font-medium text-slate-900">
              Event: {event}
            </div>

            <div className="text-sm text-slate-600 truncate">
              Payload: <code>{formattedPayload.slice(0, 100)}...</code>
            </div>

            <ShippyBottomBorder source={source} />
          </div>
        </button>
      </div>
    </>
  )
}

export default ShippyWebhookEventCard
