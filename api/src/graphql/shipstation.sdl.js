export const schema = gql`
  type ShipstationData {
    data: String!
  }

  type Query {
    getShipstation(
      shipstationUrl: String!
      organizationId: String!
    ): ShipstationData! @requireAuth
  }
`
