import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import OrganizationMemberForm from 'src/components/OrganizationMember/OrganizationMemberForm'

export const QUERY = gql`
  query EditOrganizationMemberById($id: String!) {
    organizationMember: organizationMember(id: $id) {
      id
      userId
      organizationId
      role
      createdAt
      updatedAt
    }
  }
`

const UPDATE_ORGANIZATION_MEMBER_MUTATION = gql`
  mutation UpdateOrganizationMemberMutation(
    $id: String!
    $input: UpdateOrganizationMemberInput!
  ) {
    updateOrganizationMember(id: $id, input: $input) {
      id
      userId
      organizationId
      role
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ organizationMember }) => {
  const [updateOrganizationMember, { loading, error }] = useMutation(
    UPDATE_ORGANIZATION_MEMBER_MUTATION,
    {
      onCompleted: () => {
        toast.success('OrganizationMember updated')
        navigate(routes.organizationMembers())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateOrganizationMember({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit OrganizationMember {organizationMember?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <OrganizationMemberForm
          organizationMember={organizationMember}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
