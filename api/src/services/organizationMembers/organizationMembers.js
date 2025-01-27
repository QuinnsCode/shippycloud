import { db } from 'src/lib/db'

export const organizationMembers = () => {
  return db.organizationMember.findMany()
}

export const organizationMember = ({ id }) => {
  return db.organizationMember.findUnique({
    where: { id },
  })
}

export const createOrganizationMember = ({ input }) => {
  return db.organizationMember.create({
    data: input,
  })
}

export const updateOrganizationMember = ({ id, input }) => {
  return db.organizationMember.update({
    data: input,
    where: { id },
  })
}

export const deleteOrganizationMember = ({ id }) => {
  return db.organizationMember.delete({
    where: { id },
  })
}

export const OrganizationMember = {
  user: (_obj, { root }) => {
    return db.organizationMember.findUnique({ where: { id: root?.id } }).user()
  },
  organization: (_obj, { root }) => {
    return db.organizationMember
      .findUnique({ where: { id: root?.id } })
      .organization()
  },
}
