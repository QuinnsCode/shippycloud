export const schema = gql`
  type OrderData {
    id: String!
    organization: Organization!
    organizationId: String!
    orderId: String
    data: String!
    createdAt: DateTime!
  }

  type Query {
    orderDatas: [OrderData!]! @requireAuth
    orderData(id: String!): OrderData @requireAuth
  }

  input CreateOrderDataInput {
    organizationId: String!
    orderId: String
    data: String!
  }

  input UpdateOrderDataInput {
    organizationId: String
    orderId: String
    data: String
  }

  type Mutation {
    createOrderData(input: CreateOrderDataInput!): OrderData! @requireAuth
    updateOrderData(id: String!, input: UpdateOrderDataInput!): OrderData!
      @requireAuth
    deleteOrderData(id: String!): OrderData! @requireAuth
  }
`
