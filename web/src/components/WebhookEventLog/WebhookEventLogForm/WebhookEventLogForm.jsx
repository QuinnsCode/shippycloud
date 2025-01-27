import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const WebhookEventLogForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.webhookEventLog?.id)
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
          defaultValue={props.webhookEventLog?.organizationId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="organizationId" className="rw-field-error" />

        <Label
          name="event"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Event
        </Label>

        <TextField
          name="event"
          defaultValue={props.webhookEventLog?.event}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="event" className="rw-field-error" />

        <Label
          name="source"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Source
        </Label>

        <TextField
          name="source"
          defaultValue={props.webhookEventLog?.source}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="source" className="rw-field-error" />

        <Label
          name="payload"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Payload
        </Label>

        <TextField
          name="payload"
          defaultValue={props.webhookEventLog?.payload}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="payload" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default WebhookEventLogForm
