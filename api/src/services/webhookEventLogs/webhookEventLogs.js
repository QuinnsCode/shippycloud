import { db } from 'src/lib/db'

export const webhookEventLogs = () => {
  return db.webhookEventLog.findMany()
}

export const webhookEventLog = ({ id }) => {
  return db.webhookEventLog.findUnique({
    where: { id },
  })
}

export const createWebhookEventLog = ({ input }) => {
  return db.webhookEventLog.create({
    data: input,
  })
}

export const updateWebhookEventLog = ({ id, input }) => {
  return db.webhookEventLog.update({
    data: input,
    where: { id },
  })
}

export const deleteWebhookEventLog = ({ id }) => {
  return db.webhookEventLog.delete({
    where: { id },
  })
}

export const WebhookEventLog = {
  organization: (_obj, { root }) => {
    return db.webhookEventLog
      .findUnique({ where: { id: root?.id } })
      .organization()
  },
}
