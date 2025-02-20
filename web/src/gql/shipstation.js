// web/src/graphql/shipstation.ts
const BASE_QUERY = gql`
  query GetShipstation($shipstationUrl: String!, $organizationId: String!) {
    shipders: getShipstation(
      shipstationUrl: $shipstationUrl
      organizationId: $organizationId
    ) {
      data
    }
  }
`

const PAGE_SIZE = 500

export const ShipstationQueries = {
  // Base query template shipders = shipments or orders
  // sometimes when we ask about an order it has technically shippped thus is now in the shipments section

  GET_SHIPSTATION: BASE_QUERY,

  // Pre-configured endpoints
  GET_ORDERS: {
    query: BASE_QUERY,
    variables: ({ organizationId }) => ({
      shipstationUrl: `https://ssapi.shipstation.com/orders?orderStatus=awaiting_shipment&pageSize=${PAGE_SIZE}`,
      organizationId,
    }),
  },

  GET_SHIPMENTS: {
    query: BASE_QUERY,
    variables: ({ organizationId }) => ({
      shipstationUrl: 'https://ssapi.shipstation.com/shipments',
      organizationId,
    }),
  },

  GET_SHIPMENTS_FROM_TO: (from, to) => ({
    query: BASE_QUERY,
    variables: ({ organizationId }) => ({
      shipstationUrl: `https://ssapi.shipstation.com/shipments?createDateStart=${from}&createDateEnd=${to}&pageSize=${PAGE_SIZE}`,
      organizationId,
    }),
  }),

  GET_ORDER: (orderNumber) => ({
    query: BASE_QUERY,
    variables: ({ organizationId }) => ({
      shipstationUrl: `https://ssapi.shipstation.com/orders?orderNumber=${orderNumber}`,
      organizationId,
    }),
  }),

  GET_SHIPMENT_NO_ITEMS: (orderNumber) => ({
    query: BASE_QUERY,
    variables: ({ organizationId }) => ({
      shipstationUrl: `https://ssapi.shipstation.com/shipments?orderNumber=${orderNumber}&includeShipmentItems=false`,
      organizationId,
    }),
  }),

  GET_SHIPMENT_W_ITEMS: (orderNumber) => ({
    query: BASE_QUERY,
    variables: ({ organizationId }) => ({
      shipstationUrl: `https://ssapi.shipstation.com/shipments?orderNumber=${orderNumber}&includeShipmentItems=true`,
      organizationId,
    }),
  }),
}
