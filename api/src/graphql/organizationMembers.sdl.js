export const schema = gql`
  type OrganizationMember {
    id: String!
    user: User!
    userId: String!
    organization: Organization!
    organizationId: String!
    role: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    organizationMembers: [OrganizationMember!]! @requireAuth
    organizationMember(id: String!): OrganizationMember @requireAuth
  }

  input CreateOrganizationMemberInput {
    userId: String!
    organizationId: String!
    role: String!
  }

  input UpdateOrganizationMemberInput {
    userId: String
    organizationId: String
    role: String
  }

  type Mutation {
    createOrganizationMember(
      input: CreateOrganizationMemberInput!
    ): OrganizationMember! @requireAuth
    updateOrganizationMember(
      id: String!
      input: UpdateOrganizationMemberInput!
    ): OrganizationMember! @requireAuth
    deleteOrganizationMember(id: String!): OrganizationMember! @requireAuth
  }
`
