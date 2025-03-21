import { useRef } from 'react'
import { useEffect } from 'react'

import { toast } from 'sonner'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
  Submit,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
// import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  // focus on email box on page load
  const usernameRef = useRef()
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await signUp({ ...data })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      // user is signed in automatically
      toast.success('Welcome!')
      setTimeout(() => {
        navigate(routes.home())
      }, 1000)
    }
  }

  return (
    <>
      <MetaTags title="Signup" />

      <main className="rw-main w-96 mx-auto mt-12">
        {/* <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} /> */}
        <Contents onSubmit={onSubmit} usernameRef={usernameRef} />
      </main>
    </>
  )
}

const Contents = ({ onSubmit, usernameRef }) => {
  return (
    <div className="rw-scaffold rw-login-container">
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Signup</h2>
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

              <FieldError name="password" className="rw-field-error" />

              <div className="rw-button-group">
                <Submit className="rw-button bg-gradient-to-br from-slate-500 via-slate-600 to-slate-500 hover:bg-gradient-to-br hover:from-slate-700 hover:via-slate-800 hover:to-slate-800 text-white font-bold rounded-2xl focus:outline-none focus:shadow-outline w-full max-w-xl">
                  Sign Up
                </Submit>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div className="rw-login-link mt-2 text-center">
        <span>Already have an account?</span>{' '}
        <Link to={routes.login()} className="rw-link">
          Log in!
        </Link>
      </div>
    </div>
  )
}

export default SignupPage
