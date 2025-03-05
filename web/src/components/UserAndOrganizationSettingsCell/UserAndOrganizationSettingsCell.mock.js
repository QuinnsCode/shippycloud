// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  userAndOrganizationSettings: [
    {
      __typename: 'UserAndOrganizationSettings',
      id: 42,
    },
    {
      __typename: 'UserAndOrganizationSettings',
      id: 43,
    },
    {
      __typename: 'UserAndOrganizationSettings',
      id: 44,
    },
  ],
})
