import { Link, routes } from '@redwoodjs/router'

// import { Toaster } from '@redwoodjs/web/toast'
import { Toaster as SonnerToaster } from 'src/components/ui/sonner'
const ScaffoldLayout = (props) => {
  return (
    <div className="rw-scaffold">
      {/* <Toaster /> */}
      <SonnerToaster richColors />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          {/* <Link to={routes.posts()} className="rw-link">
            Posts
          </Link> */}
          {props.title}
        </h1>
        <Link to={props.buttonTo} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> {props?.buttonLabel}
        </Link>
      </header>
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default ScaffoldLayout
