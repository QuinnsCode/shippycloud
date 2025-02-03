import ShippyBottomBorder from 'src/components/shippyUi/ShippyBottomBorder'

const ShippyWebhookEventCard = ({ event, payload, source, index }) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 via-blue-50 to-sky-50 hover:bg-gradient-to-r hover:from-blue-50 hover:via-white hover:to-white focus:bg-white text-slate-900 rounded-lg my-1 shadow-md shadow-slate-400 inline-flex w-full">
      <div className="relative inline-flex top-0 text-sm w-[2rem] truncate overflow-ellipsis hover:overflow-visible border-r border-slate-300 font-medium text-slate-900 items-center px-2">
        {index + 1}
        {`) `}
      </div>
      <div className="p-4 border-2 border-slate-100 w-full">
        <div className="text-sm font-medium text-slate-900">{event}</div>
        <div className="text-sm text-slate-600">
          <code>{payload}</code>
        </div>
        <ShippyBottomBorder source={source} />
      </div>
    </div>
  )
}

export default ShippyWebhookEventCard
