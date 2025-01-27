import { Link, routes } from '@redwoodjs/router'
const SignIn = () => {
  return (
    <div>
      <Link to={routes.signin()} className="rw-link rw-button font-thin">
        Sign in!
      </Link>
    </div>
  )
}

export default SignIn
