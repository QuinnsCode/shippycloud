import { Link, routes } from '@redwoodjs/router'
const LogIn = () => {
  const normalButtonString =
    'rw-button bg-gradient-to-br from-blue-500 via-sky-600 to-blue-700 hover:bg-gradient-to-br hover:from-blue-500 hover:via-sky-700 hover:to-blue-600 text-white font-bold rounded-xl focus:outline-none focus:shadow-outline w-full max-w-xl'

  return (
    <div>
      <Link to={routes.login()} className={`${normalButtonString}`}>
        Log in!
      </Link>
    </div>
  )
}

export default LogIn
