const LoggedInDisplayUserName = ({ isAuthenticated, currentUser }) => {
  return (
    <>
      {isAuthenticated && (
        <div className="absolute top-0 right-0 pr-16 sm:pr-24 md:pr-12 w-[20rem] text-xs text-blue-300 text-right mr-6">
          <div className="inline-flex items-center justify-center content-center">
            <div className="inline-flex bg-white text-black px-1 rounded-3xl font-light">
              user:
            </div>
            <div className="inline-flex px-1 mb-0.5">{currentUser?.email}</div>
          </div>
        </div>
      )}
    </>
  )
}

export default LoggedInDisplayUserName
