import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import ArticlesCell from 'src/components/ArticlesCell'
import Dashboard from 'src/components/Dashboard/Dashboard'
import Home from 'src/components/Home/Home'
import Landing from 'src/components/Landing/Landing'
import SignUpLogIn from 'src/components/SignUpLogIn/SignUpLogIn'

const HomePage = ({ appId }) => {
  const { isAuthenticated, currentUser } = useAuth()
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <div className="text-center">
        {/* <p>appId: {appId}</p> */}
        <hr className="h-12 text-black" />
        {currentUser ? (
          <Dashboard appId={appId} currentUser={currentUser} />
        ) : (
          <SignUpLogIn />
        )}
        {/* <ArticlesCell /> */}
      </div>
    </>
  )
}

export default HomePage
