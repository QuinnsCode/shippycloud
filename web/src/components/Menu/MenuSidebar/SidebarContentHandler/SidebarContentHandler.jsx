const SidebarContentHandler = ({ sidebarContent, sidebarType }) => {
  if (sidebarType === 'shipstation-event') {
    return <ShipstationPayloadSidebarContent sidebarContent={sidebarContent} />
  } else {
    return <div></div>
  }
}

const ShipstationPayloadSidebarContent = ({ sidebarContent }) => {
  return (
    <div className="px-3 mx-2 py-2 border-2 border-blue-300 h-[calc(100vh-7rem)] rounded-[12px] my-auto opacity-100 bg-opacity-100 bg-white">
      {sidebarContent}
    </div>
  )
}

export default SidebarContentHandler
