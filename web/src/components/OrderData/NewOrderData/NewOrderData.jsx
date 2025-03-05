import { toast } from 'sonner'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

// import { toast } from '@redwoodjs/web/toast'

import OrderDataForm from 'src/components/OrderData/OrderDataForm'

const CREATE_ORDER_DATA_MUTATION = gql`
  mutation CreateOrderDataMutation($input: CreateOrderDataInput!) {
    createOrderData(input: $input) {
      id
    }
  }
`

const NewOrderData = () => {
  const [createOrderData, { loading, error }] = useMutation(
    CREATE_ORDER_DATA_MUTATION,
    {
      onCompleted: () => {
        toast.success('OrderData created')
        navigate(routes.orderDatas())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createOrderData({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New OrderData</h2>
      </header>
      <div className="rw-segment-main">
        <OrderDataForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewOrderData
