import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
// import ArticlesCell from 'src/components/ArticlesCell'
import Dashboard from 'src/components/Dashboard/Dashboard'
// import Home from 'src/components/Home/Home'
// import Landing from 'src/components/Landing/Landing'
import SignUpLogIn from 'src/components/SignUpLogIn/SignUpLogIn'

const HomePage = ({ appId }) => {
  const { currentUser } = useAuth()
  // console.log('currentUser: ', currentUser)
  return (
    <div className="w-full">
      <MetaTags title="Home" description="Home page" />
      <div className="text-center w-full">
        {/* if logged in go to dashboard otherwise show login/signup */}
        {currentUser ? (
          <Dashboard appId={appId} currentUser={currentUser} />
        ) : (
          <SignUpLogIn />
        )}
        {/* <ArticlesCell /> */}
      </div>
    </div>
  )
}

export default HomePage
