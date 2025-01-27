import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const OrderDataForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.orderData?.id)
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
          defaultValue={props.orderData?.organizationId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="organizationId" className="rw-field-error" />

        <Label
          name="orderId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Order id
        </Label>

        <TextField
          name="orderId"
          defaultValue={props.orderData?.orderId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="orderId" className="rw-field-error" />

        <Label
          name="data"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Data
        </Label>

        <TextField
          name="data"
          defaultValue={props.orderData?.data}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="data" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default OrderDataForm
