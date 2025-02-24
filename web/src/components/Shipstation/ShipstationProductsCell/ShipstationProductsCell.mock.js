// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  shipstationProducts: [
    {
      __typename: 'ShipstationProducts',
      id: 42,
    },
    {
      __typename: 'ShipstationProducts',
      id: 43,
    },
    {
      __typename: 'ShipstationProducts',
      id: 44,
    },
  ],
})
