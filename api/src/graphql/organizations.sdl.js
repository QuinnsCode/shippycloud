export const schema = gql`
  type Organization {
    id: String!
    name: String!
    domain: String
    members: [OrganizationMember]!
    webhooksEventLogs: [WebhookEventLog]!
    endpoints: [Endpoint!]
    orderData: [OrderData]!
    organizationSettings: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }
  type Endpoint {
    id: String!
    organizationId: String!
    name: String!
    slug: String
    endpointType: String!
    createdByUserId: String!
    createdAt: DateTime!
  }
  type Query {
    organizations: [Organization!]! @requireAuth
    organization(id: String!): Organization @requireAuth
    organizationsOfAUser(userId: String!): [Organization!]! @requireAuth
  }

  input CreateOrganizationInput {
    name: String!
    domain: String
  }

  input CreateOrganizationAndMemberInput {
    name: String!
    userId: String!
    domain: String
  }

  input UpdateOrganizationInput {
    name: String
    domain: String
    organizationSettings: String
  }

  type Mutation {
    createOrganizationAndCreateOrganizationMember(
      input: CreateOrganizationAndMemberInput!
    ): Organization! @requireAuth
    createOrganization(input: CreateOrganizationInput!): Organization!
      @requireAuth
    updateOrganization(
      id: String!
      input: UpdateOrganizationInput!
    ): Organization! @requireAuth
    deleteOrganization(id: String!): Organization! @requireAuth
  }
`
