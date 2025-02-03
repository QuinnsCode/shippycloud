const VersionTopRightCorner = ({ versionString }) => {
  return (
    <div className="absolute right-20 sm:right-20 top-4 sm:top-4 md:top-0 md:right-0 mr-2 text-xs text-blue-300">
      <div className="inline-flex items-center justify-center content-center">
        <div className="inline-flex bg-gradient-to-tr from-blue-900 via-blue-800 to-slate-900 text-white px-2 rounded-3xl font-light">
          {versionString}
        </div>
      </div>
    </div>
  )
}

export default VersionTopRightCorner
