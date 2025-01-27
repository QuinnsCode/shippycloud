import { Link, routes } from '@redwoodjs/router'
const LogOut = () => {
  return (
    <div>
      <Link to={routes.logout()} className="rw-link rw-button font-thin">
        Log out!
      </Link>
    </div>
  )
}

export default LogOut
