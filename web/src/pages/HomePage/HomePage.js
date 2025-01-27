import { MetaTags } from '@redwoodjs/web'

import ArticlesCell from 'src/components/ArticlesCell'
import Home from 'src/components/Home/Home'
import Landing from 'src/components/Landing/Landing'

const HomePage = ({ appId }) => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <div className="text-center">
        <p>appId: {appId}</p>
        <hr className="h-12 text-black" />
        {!appId ? <Landing /> : <Home />}
        <ArticlesCell />
      </div>
    </>
  )
}

export default HomePage
