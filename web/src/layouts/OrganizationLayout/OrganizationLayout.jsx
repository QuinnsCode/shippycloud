const OrganizationLayout = ({ props, children }) => {
  // console.log('props', { children }, children?.props?.params?.appId)
  return (
    <div className="w-full mb-8 bg-black text-white">
      <div className="max-w-7xl mx-auto bg-white shadow rounded-b">
        {children}
      </div>
    </div>
  )
}

export default OrganizationLayout
