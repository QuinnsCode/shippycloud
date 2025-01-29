import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

const BlogLayout = ({ children }) => {
  const { logOut, isAuthenticated, currentUser } = useAuth()

  // console.log('children', children)
  return (
    <div className="w-full">
      <header className="relative flex justify-between items-center py-4 px-8 bg-gradient-to-r from-blue-700 to-blue-800 via-blue-800 text-white">
        <h1 className="text-5xl font-semibold tracking-tight">
          <Link
            className="text-blue-400 hover:text-blue-300 transition duration-100"
            to={routes.home()}
          >
            Testycloud 1.0026
          </Link>
        </h1>
        <nav>
          <ul className="relative flex items-center font-light">
            <li>
              <Link
                className="py-2 px-4 hover:bg-blue-600 transition duration-100 rounded"
                to={routes.home()}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                className="py-2 px-4 hover:bg-blue-600 transition duration-100 rounded"
                to={routes.about()}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className="py-2 px-4 hover:bg-blue-600 transition duration-100 rounded"
                to={routes.contact()}
              >
                Contact
              </Link>
            </li>

            <li>
              {isAuthenticated ? (
                <div>
                  <button
                    type="button"
                    onClick={logOut}
                    className="py-2 px-4 hover:bg-blue-600 transition duration-100 rounded"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to={routes.login()} className="py-2 px-4">
                  Login
                </Link>
              )}
            </li>
          </ul>
          {isAuthenticated && (
            <div className="absolute bottom-1 right-0 mr-12 text-xs text-blue-300">
              <div className="inline-flex items-center justify-center content-center">
                <div className="inline-flex bg-white text-black px-1 rounded-3xl font-light">
                  user:
                </div>
                <div className="inline-flex px-1 mb-0.5">
                  {currentUser?.email}
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>
      {/* only if authenticated AND there is an appId do we show the organization */}
      {isAuthenticated && children?.props?.params?.appId ? (
        <main>
          <div className="flex justify-between items-center pb-1 font-thin text-xs px-8 bg-gradient-to-r from-blue-700 to-blue-800 via-blue-800 text-white">
            <div className="">
              <div className="inline-flex px-1">Organization: </div>
              <div className="inline-flex px-1">
                {children?.props?.params?.appId}
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto bg-white shadow rounded-b">
            {children}
          </div>
        </main>
      ) : (
        <main className="max-w-7xl mx-auto bg-white shadow rounded-b">
          {children}
        </main>
      )}
    </div>
  )
}

export default BlogLayout
