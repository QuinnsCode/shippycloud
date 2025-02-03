const OrganizationHeader = ({ displayName }) => {
  return (
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xs text-blue-300">
      <div className="inline-flex items-center justify-center content-center w-full opacity-60">
        <div className="px-2 py-0 truncate hidden sm:inline-flex sm:w-[24rem] md:w-[24rem] lg:w-[24rem] xl:w-[24rem] 2xl:w-[24rem] bg-gradient-to-r from-blue-700 via-blue-800 to-blue-600 text-white rw-button -mt-3 pointer-events-none rounded-b-3xl shadow-md shadow-cyan-700">
          {displayName}
        </div>
      </div>
    </div>
  )
}

export default OrganizationHeader
