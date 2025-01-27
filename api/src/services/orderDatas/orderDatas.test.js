import {
  orderDatas,
  orderData,
  createOrderData,
  updateOrderData,
  deleteOrderData,
} from './orderDatas'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('orderDatas', () => {
  scenario('returns all orderDatas', async (scenario) => {
    const result = await orderDatas()

    expect(result.length).toEqual(Object.keys(scenario.orderData).length)
  })

  scenario('returns a single orderData', async (scenario) => {
    const result = await orderData({ id: scenario.orderData.one.id })

    expect(result).toEqual(scenario.orderData.one)
  })

  scenario('creates a orderData', async (scenario) => {
    const result = await createOrderData({
      input: {
        organizationId: scenario.orderData.two.organizationId,
        data: 'String',
      },
    })

    expect(result.organizationId).toEqual(scenario.orderData.two.organizationId)
    expect(result.data).toEqual('String')
  })

  scenario('updates a orderData', async (scenario) => {
    const original = await orderData({
      id: scenario.orderData.one.id,
    })
    const result = await updateOrderData({
      id: original.id,
      input: { data: 'String2' },
    })

    expect(result.data).toEqual('String2')
  })

  scenario('deletes a orderData', async (scenario) => {
    const original = await deleteOrderData({
      id: scenario.orderData.one.id,
    })
    const result = await orderData({ id: original.id })

    expect(result).toEqual(null)
  })
})
