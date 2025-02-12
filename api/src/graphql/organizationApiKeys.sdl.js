export const schema = gql`
  type OrganizationApiKey {
    id: String!
    organization: Organization!
    organizationId: String!
    provider: String!
    label: String
    isActive: Boolean!
    lastUsedAt: DateTime
    createdBy: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input CreateOrganizationApiKeyInput {
    organizationId: String!
    provider: String!
    label: String
    apiKey: String!
  }

  type Mutation {
    createOrganizationApiKey(
      input: CreateOrganizationApiKeyInput!
    ): OrganizationApiKey! @requireAuth
    deleteOrganizationApiKey(id: String!): OrganizationApiKey! @requireAuth
    rotateOrganizationApiKey(
      organizationId: String!
      provider: String!
      newApiKey: String!
    ): OrganizationApiKey! @requireAuth
  }

  type Query {
    organizationApiKeys(organizationId: String!): [OrganizationApiKey!]!
      @requireAuth
  }
`
