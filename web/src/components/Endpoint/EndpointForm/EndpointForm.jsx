import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const EndpointForm = (props) => {
  const onSubmit = (data) => {
    const fullData = {
      ...data,
      organizationId: props.organizationId,
      createdByUserId: props.userId,
    }
    props.onSave(fullData, props?.endpoint?.id)
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
          name="organizationId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Organization id
        </Label>

        <TextField
          name="organizationId"
          // defaultValue={props.endpoint?.organizationId}
          defaultValue={props?.organizationId || props.endpoint?.organizationId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="organizationId" className="rw-field-error" />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.endpoint?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="slug"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Slug
        </Label>

        <TextField
          name="slug"
          defaultValue={props.endpoint?.slug}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="slug" className="rw-field-error" />

        <Label
          name="endpointType"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Endpoint type
        </Label>

        <TextField
          name="endpointType"
          defaultValue={props.endpoint?.endpointType || 'SHIPSTATION'}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="endpointType" className="rw-field-error" />

        <Label
          name="createdByUserId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Created by user id
        </Label>

        <TextField
          name="createdByUserId"
          defaultValue={props?.userId || props.endpoint?.createdByUserId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="createdByUserId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default EndpointForm
