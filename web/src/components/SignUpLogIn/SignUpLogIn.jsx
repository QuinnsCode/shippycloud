import LogIn from 'src/components/AuthButtons/LogIn/LogIn'
import SignUp from 'src/components/AuthButtons/SignUp/SignUp'

const SignUpLogIn = () => {
  return (
    <div className="w-full mx-auto grid grid-rows-3 items-center justify-center text-center">
      <p className="justify-self-center font-mono tracking-tight">
        You are not logged in!
        <br /> Create an account or Login to continue!
      </p>
      <div className="inline my-8">
        <LogIn />
      </div>
      Or
      <div className="mt-8">
        <SignUp />
      </div>
    </div>
  )
}

export default SignUpLogIn
