const ShippyCloudColorfulBackground = ({ children }) => {
  return (
    <div className="bg-gradient-to-br from-sky-500 via-sky-600 to-sky-500 w-full inline-flex h-[calc(100vh-5rem)] rounded-md">
      {children}
    </div>
  )
}

export default ShippyCloudColorfulBackground
