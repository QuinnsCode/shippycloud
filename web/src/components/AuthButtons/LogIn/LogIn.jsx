import { Link, routes } from '@redwoodjs/router'
const LogIn = () => {
  return (
    <div>
      <Link to={routes.login()} className="rw-link rw-button font-thin">
        Log in!
      </Link>
    </div>
  )
}

export default LogIn
