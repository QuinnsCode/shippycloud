import { useRef, useEffect } from 'react'

import { format } from 'date-fns'
import { toast } from 'sonner'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
// import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import SignUp from 'src/components/AuthButtons/SignUp/SignUp'
import ShippyCloudBanner from 'src/components/shippyUi/ShippyCloudBanner/ShippyCloudBanner'

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth()

  const normalButtonString =
    'rw-button bg-gradient-to-br from-blue-500 via-sky-600 to-blue-700 hover:bg-gradient-to-br hover:from-blue-500 hover:via-sky-700 hover:to-blue-600 text-white font-bold rounded-xl focus:outline-none focus:shadow-outline w-full'

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const usernameRef = useRef()
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await logIn({ ...data })

    // console.log({ response })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      const now = new Date()
      const formattedDate = format(now, "EEEE, MMMM dd, yyyy 'at' hh:mm a")

      const descriptionStr = `Signed in: ${formattedDate} `
      toast('Welcome back', {
        description: descriptionStr,
        action: {
          // label: 'Undo',
          // onClick: () => console.log('Undo'),
        },
      })
      setTimeout(() => {
        navigate(routes.home())
      }, 1700)
    }
  }

  return (
    <>
      <MetaTags title="Login" />

      <main className="rw-main w-96 mx-auto mt-12">
        {/* <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} /> */}
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">
                <ShippyCloudBanner>Login</ShippyCloudBanner>
              </h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <Label
                    name="username"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Username
                  </Label>
                  <TextField
                    name="username"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    ref={usernameRef}
                    validation={{
                      required: {
                        value: true,
                        message: 'Username is required',
                      },
                    }}
                  />

                  <FieldError name="username" className="rw-field-error" />

                  <Label
                    name="password"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Password
                  </Label>
                  <PasswordField
                    name="password"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    autoComplete="current-password"
                    validation={{
                      required: {
                        value: true,
                        message: 'Password is required',
                      },
                    }}
                  />

                  <div className="rw-forgot-link">
                    <Link
                      to={routes.forgotPassword()}
                      className="rw-forgot-link underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <FieldError name="password" className="rw-field-error" />

                  <div className="rw-button-group">
                    <Submit className={`${normalButtonString}`}>Submit</Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div className="rw-login-link mt-16 text-center">
            <span>Don&apos;t have an account?</span> <SignUp />
          </div>
        </div>
      </main>
    </>
  )
}

export default LoginPage
