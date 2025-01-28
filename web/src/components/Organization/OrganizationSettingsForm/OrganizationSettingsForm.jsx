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

const DEFAULT_SETTINGS = {
  webhookName: 'Test1',
  webhookId: '0dd78c5a-1084-4b3d-b398-d42f5fbdb1cb',
}

const OrganizationSettingsForm = ({
  organizationSettings,
  orgId,
  userId,
  onSave,
  error,
  loading,
}) => {
  const onSubmit = (data) => {
    console.log('data: ', data.organizationSettings)
    try {
      // Just validate the JSON is correct
      const x = JSON.parse(data.organizationSettings)

      // Send the validated JSON string directly - don't stringify again
      onSave(
        {
          ...data,
          organizationSettings: data.organizationSettings, // Use the string directly
          userId,
        },
        orgId
      )
    } catch (e) {
      console.error('Invalid JSON in form submission:', e)
    }
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={error}>
        <Label
          name="organizationSettings"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Organization Settings (JSON)
        </Label>
        <TextField
          name="organizationSettings"
          // defaultValue={JSON.stringify(
          //   organizationSettings || DEFAULT_SETTINGS,
          //   null,
          //   2
          // )}
          defaultValue={JSON.stringify(DEFAULT_SETTINGS, null, 0)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{
            required: true,
            validate: (value) => {
              try {
                JSON.parse(value)
                return true
              } catch {
                return 'Invalid JSON'
              }
            },
          }}
        />
        <FieldError name="organizationSettings" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={loading} className="rw-button rw-button-blue">
            {loading ? 'Saving...' : 'Save'}
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default OrganizationSettingsForm
