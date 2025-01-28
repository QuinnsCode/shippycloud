import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import OrganizationSettingsForm from 'src/components/Organization/OrganizationSettingsForm'

const UPDATE_ORGANIZATION_MUTATION = gql`
  mutation UpdateOrganizationMutation(
    $id: String!
    $input: UpdateOrganizationInput!
  ) {
    updateOrganization(id: $id, input: $input) {
      id
      name
      domain
      organizationSettings
      createdAt
      updatedAt
    }
  }
`

const OrganizationEditOrgSettings = ({ id, organizationSettings }) => {
  const [updateOrganization, { loading, error }] = useMutation(
    UPDATE_ORGANIZATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Organization updated')
        navigate(routes.organizations())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input2, id) => {
    const { userId, ...input } = input2
    console.log({ id, input })
    updateOrganization({ variables: { id, input } }).then(() => {
      toast.success('Organization settings updated')
    })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <div className="rw-heading font-thin rw-heading-secondary">
          Edit Organization Settings: {id}
        </div>
      </header>

      <div className="rw-segment-main">
        <OrganizationSettingsForm
          organizationSettings={organizationSettings}
          orgId={id}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}

export default OrganizationEditOrgSettings
