const OrgTile = ({ children }) => {
  return (
    <div className="w-full rounded-2xl items-center justify-center bg-gradient-to-r from-sky-500 via-sky-500 to-sky-600 mb-2 overflow-y-scroll">
      <div className="w-full bg-gradient-to-br from-sky-600 via-sky-500 to-sky-400 items-center justify-center rounded-lg">
        {children}
      </div>
    </div>
  )
}

export default OrgTile
