import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const OrganizationMemberForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.organizationMember?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>

        <NumberField
          name="userId"
          defaultValue={props.organizationMember?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userId" className="rw-field-error" />

        <Label
          name="organizationId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Organization id
        </Label>

        <TextField
          name="organizationId"
          defaultValue={props.organizationMember?.organizationId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="organizationId" className="rw-field-error" />

        <Label
          name="role"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Role
        </Label>

        <TextField
          name="role"
          defaultValue={props.organizationMember?.role}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="role" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default OrganizationMemberForm
