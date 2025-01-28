import { Link, routes } from '@redwoodjs/router'

import AddOrganizations from 'src/components/AddOrganizations/AddOrganizations'
export const QUERY = gql`
  query FindOrganizationWidgetQuery($userId: String!) {
    organizations: organizationsOfAUser(userId: $userId) {
      id
      name
      domain
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = ({ userId }) => (
  <div>
    <AddOrganizations userId={userId} />
  </div>
)

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ organizations, userId }) => {
  return (
    <div>
      <div>
        Organizations:
        <hr />
        {organizations.map((organization, index) => (
          <div key={organization.id} className="py-1">
            <div className="w-full inline-flex hover:text-white hover:bg-sky-100 hover:bg-opacity-90 py-1">
              <div className="rw-button pointer-events-none bg-black text-white h-8 w-8 mx-4 rounded-full items-center inline-flex">
                {index + 1}
              </div>
              <div className="flex-grow" />
              <Link
                to={routes.homeWithAppId({ appId: organization.id })}
                className="rw-button bg-black text-white mx-8 inline-flex"
              >
                Go to: {organization.name}
              </Link>
            </div>
          </div>
        ))}
      </div>
      <hr />
      {/* <div>
        <AddOrganizations userId={userId} />
      </div> */}
    </div>
  )
}
