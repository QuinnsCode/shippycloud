const OrganizationAddAMemberWidget = ({
  appId,
  showAddANewMember,
  setShowAddANewMember,
  currentUser,
}) => {
  const addANewMember = () => {
    console.log('addANewMember')
  }

  return (
    <div className="group inline-flex w-full p-4 my-4 bg-sky-100 text-slate-700 hover:bg-sky-100 rounded-lg shadow-md transition-all duration-300 ease-in-out overflow-hidden">
      <div className="flex-grow"></div>{' '}
      <button
        disabled={true}
        className="bg-blue-300 hover:bg-blue-300 text-white hover:text-white py-2 px-6 rounded-full text-center block mt-4 line-through"
      >
        Invite?
      </button>
      <div className="flex-grow"></div>
      <button
        onClick={addANewMember}
        className="bg-blue-300 hover:bg-blue-200 text-white hover:text-sky-700 py-2 px-6 rounded-full text-center block mt-4"
      >
        Manually add
      </button>
      <div className="flex-grow"></div>
    </div>
  )
}


export default OrganizationAddAMemberWidget
