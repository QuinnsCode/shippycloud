import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import OrganizationMemberForm from 'src/components/OrganizationMember/OrganizationMemberForm'

const CREATE_ORGANIZATION_MEMBER_MUTATION = gql`
  mutation CreateOrganizationMemberMutation(
    $input: CreateOrganizationMemberInput!
  ) {
    createOrganizationMember(input: $input) {
      id
    }
  }
`

const NewOrganizationMember = () => {
  const [createOrganizationMember, { loading, error }] = useMutation(
    CREATE_ORGANIZATION_MEMBER_MUTATION,
    {
      onCompleted: () => {
        toast.success('OrganizationMember created')
        navigate(routes.organizationMembers())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createOrganizationMember({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New OrganizationMember
        </h2>
      </header>
      <div className="rw-segment-main">
        <OrganizationMemberForm
          onSave={onSave}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  )
}

export default NewOrganizationMember
