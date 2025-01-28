export const schema = gql`
  type Endpoint {
    id: String!
    organization: Organization!
    organizationId: String!
    name: String!
    slug: String
    endpointType: String!
    createdByUserId: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    endpoints: [Endpoint!]! @requireAuth
    endpointsOfAnOrganization(organizationId: String!): [Endpoint!]!
      @requireAuth
    endpoint(id: String!): Endpoint @requireAuth
  }

  input CreateEndpointInput {
    organizationId: String!
    name: String!
    slug: String
    endpointType: String!
    createdByUserId: String!
  }

  input UpdateEndpointInput {
    organizationId: String
    name: String
    slug: String
    endpointType: String
    createdByUserId: String
  }

  type Mutation {
    createEndpoint(input: CreateEndpointInput!): Endpoint! @requireAuth
    updateEndpoint(id: String!, input: UpdateEndpointInput!): Endpoint!
      @requireAuth
    deleteEndpoint(id: String!): Endpoint! @requireAuth
  }
`
