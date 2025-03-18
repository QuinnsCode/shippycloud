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
    apiKeys: [OrganizationApiKey]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type OrganizationApiKey {
    id: String!
    organizationId: String!
    provider: String!
    label: String
    isActive: Boolean!
    lastUsedAt: DateTime
    createdBy: String!
    createdAt: DateTime!
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

  type UserAndOrganizationSettings {
    id: String!
    name: String
    email: String
    userId: String!
    organizationId: String!
    organizationName: String
    organizationSettings: String
    role: String
    isAdmin: Boolean!
  }

  type UserAndOrganizationWithKeys {
    id: String!
    name: String
    email: String
    userId: String!
    organizationId: String!
    organizationName: String
    organizationSettings: String
    role: String
    isAdmin: Boolean!
    hasApiKeys: Boolean!
    organizationHasApiKeys: Boolean!
    hasChosenDisplayEmailOrName: Boolean!
    apiKeyProviders: [String]
  }

  type Query {
    userAndOrganizationSettings(
      userId: String!
      organizationId: String!
    ): UserAndOrganizationSettings @requireAuth

    userAndOrganizationWithKeys(
      userId: String!
      organizationId: String!
    ): UserAndOrganizationWithKeys @requireAuth

    organizations: [Organization!]! @requireAuth
    organization(id: String!): Organization @requireAuth
    organizationsOfAUser(userId: String!): [Organization!]! @requireAuth

    organizationApiKeys(organizationId: String!): [OrganizationApiKey!]!
      @requireAuth
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

  input UpdateOrganizationSettingsInput {
    userId: String!
    key: String!
    value: Boolean!
  }

  input CreateOrganizationApiKeyInput {
    organizationId: String!
    provider: String!
    label: String
    apiKey: String!
    createdBy: String!
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

    updateOrganizationSettings(
      organizationId: String!
      input: UpdateOrganizationSettingsInput!
    ): Organization! @requireAuth

    createOrganizationApiKey(
      input: CreateOrganizationApiKeyInput!
    ): OrganizationApiKey! @requireAuth

    deleteOrganizationApiKey(id: String!): OrganizationApiKey! @requireAuth
  }
`
