export const schema = gql`
  type Organization {
    id: String!
    name: String!
    domain: String
    members: [OrganizationMember]!
    webhooksEventLogs: [WebhookEventLog]!
    orderData: [OrderData]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    organizations: [Organization!]! @requireAuth
    organization(id: String!): Organization @requireAuth
  }

  input CreateOrganizationInput {
    name: String!
    domain: String
  }

  input UpdateOrganizationInput {
    name: String
    domain: String
  }

  type Mutation {
    createOrganization(input: CreateOrganizationInput!): Organization!
      @requireAuth
    updateOrganization(
      id: String!
      input: UpdateOrganizationInput!
    ): Organization! @requireAuth
    deleteOrganization(id: String!): Organization! @requireAuth
  }
`
