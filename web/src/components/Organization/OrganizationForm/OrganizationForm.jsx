import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

// type OrganizationFormProps = {
//   organization?: {
//     id: string
//     name: string
//     domain?: string | null
//   }
//   userId: string  // Will be passed from the parent component
//   onSave: (data: OrganizationFormValues, id?: string) => void
//   error?: Error
//   loading?: boolean
// }

// type OrganizationFormValues = {
//   name: string
//   domain?: string
//   userId: string  // Include userId in the form values
// }

const OrganizationForm = ({ organization, userId, onSave, error, loading }) => {
  const onSubmit = (data) => {
    console.log('onSubmit: ', data)
    // Include userId in the submitted data
    onSave(
      {
        ...data,
        userId, // Add userId to be used for creating OrganizationMember
      },
      organization?.id
    )
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={error}>
        <FormError
          error={error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Organization Name
        </Label>

        <TextField
          name="name"
          defaultValue={organization?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{
            required: {
              value: true,
              message: 'Organization name is required',
            },
            minLength: {
              value: 5,
              message: 'Organization name must be at least 5 characters',
            },
          }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="domain"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Domain (Optional)
        </Label>

        <TextField
          name="domain"
          defaultValue={organization?.domain || ''}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{
            pattern: {
              value: /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
              message: 'Please enter a valid domain (e.g., example.com)',
            },
          }}
        />

        <FieldError name="domain" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={loading} className="rw-button rw-button-blue">
            {loading ? 'Saving...' : 'Save'}
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default OrganizationForm
