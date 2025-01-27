export const schema = gql`
  type OrganizationMember {
    id: Int!
    user: User!
    userId: Int!
    organization: Organization!
    organizationId: String!
    role: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    organizationMembers: [OrganizationMember!]! @requireAuth
    organizationMember(id: Int!): OrganizationMember @requireAuth
  }

  input CreateOrganizationMemberInput {
    userId: Int!
    organizationId: String!
    role: String!
  }

  input UpdateOrganizationMemberInput {
    userId: Int
    organizationId: String
    role: String
  }

  type Mutation {
    createOrganizationMember(
      input: CreateOrganizationMemberInput!
    ): OrganizationMember! @requireAuth
    updateOrganizationMember(
      id: Int!
      input: UpdateOrganizationMemberInput!
    ): OrganizationMember! @requireAuth
    deleteOrganizationMember(id: Int!): OrganizationMember! @requireAuth
  }
`
