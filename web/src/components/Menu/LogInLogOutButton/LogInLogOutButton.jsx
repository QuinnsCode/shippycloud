import { Link, routes } from '@redwoodjs/router'

const LogInLogOutButton = ({ isAuthenticated, logOut }) => {
  return (
    <>
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
    </>
  )
}

export default LogInLogOutButton
