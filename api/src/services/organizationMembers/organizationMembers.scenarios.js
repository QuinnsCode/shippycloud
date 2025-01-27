export const standard = defineScenario({
  organizationMember: {
    one: {
      data: {
        role: 'String',
        updatedAt: '2025-01-27T06:15:09.441Z',
        user: {
          create: {
            email: 'String4006958',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2025-01-27T06:15:09.441Z',
          },
        },
        organization: {
          create: { name: 'String', updatedAt: '2025-01-27T06:15:09.441Z' },
        },
      },
    },
    two: {
      data: {
        role: 'String',
        updatedAt: '2025-01-27T06:15:09.441Z',
        user: {
          create: {
            email: 'String2952159',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2025-01-27T06:15:09.441Z',
          },
        },
        organization: {
          create: { name: 'String', updatedAt: '2025-01-27T06:15:09.441Z' },
        },
      },
    },
  },
})
