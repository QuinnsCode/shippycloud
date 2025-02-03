const ShippyCloudPageContent = ({ children }) => {
  return (
    <div className="p-3 bg-gradient-to-br from-sky-50 to-white shadow-xl rounded-lg via-blue-100">
      <div className="py-4 px-6 border border-sky-200 rounded-md shadow-inner bg-white text-slate-800 tracking-wide">
        {children}
      </div>
    </div>
  )
}

export default ShippyCloudPageContent
