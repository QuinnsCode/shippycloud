import { db } from 'src/lib/db'

export const organizations = () => {
  return db.organization.findMany()
}

export const organization = ({ id }) => {
  return db.organization.findUnique({
    where: { id },
  })
}

export const createOrganization = ({ input }) => {
  return db.organization.create({
    data: input,
  })
}

export const updateOrganization = ({ id, input }) => {
  return db.organization.update({
    data: input,
    where: { id },
  })
}

export const deleteOrganization = ({ id }) => {
  return db.organization.delete({
    where: { id },
  })
}

export const Organization = {
  members: (_obj, { root }) => {
    return db.organization.findUnique({ where: { id: root?.id } }).members()
  },
  webhooksEventLogs: (_obj, { root }) => {
    return db.organization
      .findUnique({ where: { id: root?.id } })
      .webhooksEventLogs()
  },
  orderData: (_obj, { root }) => {
    return db.organization.findUnique({ where: { id: root?.id } }).orderData()
  },
}
