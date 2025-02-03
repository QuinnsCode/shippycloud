import { db } from 'src/lib/db'

export const orderDatas = () => {
  return db.orderData.findMany()
}

export const orderData = ({ id }) => {
  return db.orderData.findUnique({
    where: { id },
  })
}

export const orderDataOfAnOrg = ({ organizationId }) => {
  return db.orderData.findMany({
    where: { organizationId },
  })
}

export const createOrderData = ({ input }) => {
  return db.orderData.create({
    data: input,
  })
}

export const updateOrderData = ({ id, input }) => {
  return db.orderData.update({
    data: input,
    where: { id },
  })
}

export const deleteOrderData = ({ id }) => {
  return db.orderData.delete({
    where: { id },
  })
}

export const OrderData = {
  organization: (_obj, { root }) => {
    return db.orderData.findUnique({ where: { id: root?.id } }).organization()
  },
}
