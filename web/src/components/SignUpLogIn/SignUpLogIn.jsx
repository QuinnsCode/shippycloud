import LogIn from 'src/components/AuthButtons/LogIn/LogIn'
import SignUp from 'src/components/AuthButtons/SignUp/SignUp'

const SignUpLogIn = () => {
  return (
    <div className="w-5/6 mx-auto grid grid-rows-3 gap-4">
      <p>
        You are not logged in, you need to create an account or log in to
        continue!
      </p>
      <div>
        <SignUp />
      </div>
      <div>
        <LogIn />
      </div>
    </div>
  )
}

export default SignUpLogIn
