import { Link, routes } from '@redwoodjs/router'
const SignIn = () => {
  const normalButtonStringDark =
    'rw-button bg-gradient-to-br from-slate-700 via-slate-800 to-slate-700 hover:bg-gradient-to-br hover:from-slate-800 hover:via-slate-900 hover:to-slate-800 text-white font-bold rounded-xl focus:outline-none focus:shadow-outline w-full'
  return (
    <div>
      <Link to={routes.signin()} className={`${normalButtonStringDark}`}>
        Sign in!
      </Link>
    </div>
  )
}

export default SignIn
