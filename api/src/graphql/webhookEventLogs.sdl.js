export const schema = gql`
  type WebhookEventLog {
    id: String!
    organization: Organization!
    organizationId: String!
    event: String!
    source: String!
    payload: String!
    createdAt: DateTime!
  }

  type Query {
    webhookEventLogs: [WebhookEventLog!]! @requireAuth
    webhookEventLog(id: String!): WebhookEventLog @requireAuth
  }

  input CreateWebhookEventLogInput {
    organizationId: String!
    event: String!
    source: String!
    payload: String!
  }

  input UpdateWebhookEventLogInput {
    organizationId: String
    event: String
    source: String
    payload: String
  }

  type Mutation {
    createWebhookEventLog(input: CreateWebhookEventLogInput!): WebhookEventLog!
      @requireAuth
    updateWebhookEventLog(
      id: String!
      input: UpdateWebhookEventLogInput!
    ): WebhookEventLog! @requireAuth
    deleteWebhookEventLog(id: String!): WebhookEventLog! @requireAuth
  }
`
