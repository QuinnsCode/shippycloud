// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import ArticlesCell from 'src/components/ArticlesCell'
import ShippyCloudBanner from 'src/components/shippyUi/ShippyCloudBanner/ShippyCloudBanner'
const BlogPage = () => {
  return (
    <>
      <Metadata title="Blog" description="Blog page" />

      <ShippyCloudBanner>
        <h1>Blog</h1>
      </ShippyCloudBanner>
      <ArticlesCell />
    </>
  )
}

export default BlogPage
