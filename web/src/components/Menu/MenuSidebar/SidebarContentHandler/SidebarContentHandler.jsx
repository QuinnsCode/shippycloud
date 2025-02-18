const SidebarContentHandler = ({ sidebarContent, sidebarType }) => {
  if (sidebarType === 'shipstation-event') {
    return <ShipstationPayloadSidebarContent sidebarContent={sidebarContent} />
  } else {
    return <div>No sidebar content</div>
  }
}

const ShipstationPayloadSidebarContent = ({ sidebarContent }) => {
  return (
    <div className="p-4 border-4 border-blue-300 h-[85vh] rounded-2xl my-auto opacity-100 bg-opacity-100 bg-white">
      {sidebarContent}
    </div>
  )
}

export default SidebarContentHandler
