import { Link, routes } from '@redwoodjs/router'
const SignUp = () => {
  const normalButtonStringDark =
    'rw-button bg-gradient-to-br from-slate-500 via-slate-600 to-slate-500 hover:bg-gradient-to-br hover:from-slate-700 hover:via-slate-800 hover:to-slate-800 text-white font-bold rounded-lg focus:outline-none focus:shadow-outline w-full'
  return (
    <div>
      <Link to={routes.signup()} className={`${normalButtonStringDark}`}>
        Sign up!
      </Link>
    </div>
  )
}

export default SignUp
