import { useState } from 'react'

import { routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import AddingOrgForm from 'src/components/AddingOrgForm/AddingOrgForm'

const USER_ADDS_AN_ORGANIZATION_AND_BECOMES_MEMBER_MUTATION = gql`
  mutation UserAddsAnOrganizationMutation(
    $userId: String!
    $name: String!
    $domain: String
  ) {
    createOrganizationAndCreateOrganizationMember(
      input: { userId: $userId, name: $name, domain: $domain }
    ) {
      id
    }
  }
`

const AddOrganizations = ({ userId }) => {
  const [addingAnOrganization, setAddingAnOrganization] = useState(false)

  const addAnOrg = () => {
    setAddingAnOrganization(true)
    // await addOrganization({ variables: { userId } })
    // setAddingAnOrganization(false)
  }

  const [addOrgAndMember, { loading, error }] = useMutation(
    USER_ADDS_AN_ORGANIZATION_AND_BECOMES_MEMBER_MUTATION,
    {
      onCompleted: ({ data }) => {
        console.log('data: ', data)
        toast.success('Organization added!')
        toast.success('You are now a member of this organization!')
        // setTimeout(() => {
        //   navigate(routes.home({ appId: data?.id }))
        // }, 1700)
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = async (data) => {
    // console.log('onSave: ', data)
    try {
      const returnedNewOrgId = await addOrgAndMember({
        variables: { userId: data.userId, name: data.name },
      })
      console.log('returnedNewOrgId: ', returnedNewOrgId)
      navigate(
        routes.homeWithAppId({
          appId:
            returnedNewOrgId.data.createOrganizationAndCreateOrganizationMember
              .id,
        })
      )
    } catch (error) {
      console.log('error: ', error)
    }
  }

  return (
    <div className="">
      <p className="text-center justify-center items-center w-full inline-flex rw-button-group">
        {!addingAnOrganization ? (
          <div className="grid grid-rows-3 gap-4">
            {/* <p>You have no organizations</p> */}
            <p>Click the button below to add one</p>
            <AddAnOrganizationButton userId={userId} addAnOrg={addAnOrg} />
          </div>
        ) : (
          <AddingOrgForm userId={userId} onSave={onSave} />
        )}
      </p>
    </div>
  )
}
const shippyCloudBaseButtonTainwildString =
  'rw-button bg-gradient-to-r from-blue-600 via-blue-600 to-blue-500 text-white hover:bg-gradient-to-r hover:from-sky-500 hover:via-sky-600 hover:to-blue-500 hover:text-white'
const AddAnOrganizationButton = ({ userId, addAnOrg }) => {
  return (
    <button
      onClick={() => {
        addAnOrg()
      }}
      className={`rw-button bg-black text-white ${shippyCloudBaseButtonTainwildString}`}
    >
      Add An Organization
    </button>
  )
}

export default AddOrganizations
