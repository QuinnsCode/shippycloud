import { db } from 'src/lib/db'

export const endpoints = () => {
  return db.endpoint.findMany()
}

export const endpointsOfAnOrganization = ({ organizationId }) => {
  return db.endpoint.findMany({
    where: { organizationId },
  })
}
export const endpoint = ({ id }) => {
  return db.endpoint.findUnique({
    where: { id },
  })
}

export const createEndpoint = ({ input }) => {
  return db.endpoint.create({
    data: input,
  })
}

export const updateEndpoint = ({ id, input }) => {
  return db.endpoint.update({
    data: input,
    where: { id },
  })
}

export const deleteEndpoint = ({ id }) => {
  return db.endpoint.delete({
    where: { id },
  })
}

export const Endpoint = {
  organization: (_obj, { root }) => {
    return db.endpoint.findUnique({ where: { id: root?.id } }).organization()
  },
}
