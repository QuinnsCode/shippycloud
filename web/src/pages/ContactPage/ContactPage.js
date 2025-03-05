import { toast } from 'sonner'

import {
  Form,
  TextField,
  TextAreaField,
  Submit,
  FieldError,
  Label,
  FormError,
  useForm,
} from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
// import { toast, Toaster } from '@redwoodjs/web/toast'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const formMethods = useForm()

  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Thank you for your submission!')
      formMethods.reset()
    },
  })

  const onSubmit = (data) => {
    create({ variables: { input: data } })
    // console.log(data)
  }

  return (
    <>
      <MetaTags title="Contact" description="Contact page" />

      <Toaster />
      <div className="">
        <div className="w-full inline-flex bg-gradient-to-br from-sky-100 via-blue-300 to-blue-700 justify-center border-t-4 border-blue-300">
          <Form
            onSubmit={onSubmit}
            config={{ mode: 'onBlur' }}
            error={error}
            formMethods={formMethods}
            className="my-24 border-8 border-blue-200 p-8 rounded-2xl bg-sky-100 items-center justify-center content-center "
          >
            <button
              onClick={() => {
                document.getElementById('focusTargetOne')?.focus()
              }}
              className="text-white rw-button bg-gradient-to-br from-blue-600 via-blue-700 to-sky-600 hover:bg-gradient-to-br hover:from-blue-600 hover:via-blue-700 hover:to-sky-600 hover:text-white  w-full my-2"
            >
              Contact our team!
            </button>
            <FormError
              error={error}
              wrapperClassName="py-4 px-6 rounded-lg bg-red-100 text-red-700"
              listClassName="list-disc ml-4"
              listItemClassName=""
            />
            <Label
              name="name"
              className="block text-gray-700 uppercase text-sm"
              errorClassName="block uppercase text-sm text-red-700"
            >
              Name
            </Label>
            <TextField
              id={'focusTargetOne'}
              name="name"
              validation={{ required: true }}
              className="border rounded-sm px-2 py-1 outline-none"
              errorClassName="border rounded-sm px-2 py-1 border-red-700 outline-none"
            />
            <FieldError name="name" className="block text-red-700" />

            <Label
              name="email"
              className="block mt-8 text-gray-700 uppercase text-sm"
              errorClassName="block mt-8 text-red-700 uppercase text-sm"
            >
              Email
            </Label>
            <TextField
              name="email"
              validation={{
                required: true,
                pattern: {
                  value: /[^@]+@[^.]+\..+/,
                  message: 'Please enter a valid email address',
                },
              }}
              className="border rounded-sm px-2 py-1"
              errorClassName="border rounded-sm px-2 py-1 border-red-700 outline-none"
            />
            <FieldError name="email" className="block text-red-700" />

            <Label
              name="message"
              className="block mt-8 text-gray-700 uppercase text-sm"
              errorClassName="block mt-8 text-red-700 uppercase text-sm"
            >
              Message
            </Label>
            <TextAreaField
              name="message"
              validation={{ required: true }}
              className="block border rounded-sm px-2 py-1"
              errorClassName="block border rounded-sm px-2 py-1 border-red-700 outline-none"
            />
            <FieldError name="message" className="block text-red-700" />

            <Submit
              className="block bg-blue-700 text-white mt-8 px-4 py-2 rounded"
              disabled={loading}
            >
              Save
            </Submit>
          </Form>
        </div>
      </div>
    </>
  )
}

export default ContactPage
