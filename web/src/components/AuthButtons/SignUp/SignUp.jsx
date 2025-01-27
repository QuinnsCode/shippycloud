import { Link, routes } from '@redwoodjs/router'
const SignUp = () => {
  return (
    <div>
      <Link to={routes.signup()} className="rw-link rw-button font-thin">
        Sign up!
      </Link>
    </div>
  )
}

export default SignUp
