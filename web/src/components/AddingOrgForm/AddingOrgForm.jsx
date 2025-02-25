import OrganizationForm from 'src/components/Organization/OrganizationForm/OrganizationForm'
const AddingOrgForm = ({ userId, onSave }) => {
  return (
    <div className="bg-white text-black shadow-md shadow-sky-400 my-5 px-12 py-6 rounded-[16px]">
      <p className="font-thin font-mono tracking-widest ">You have no orgs!</p>
      <p className="font-thin font-mono -mb-12">
        Add your first one to continue!
      </p>
      <div className="m-16"></div>
      <OrganizationForm userId={userId} onSave={onSave} />
    </div>
  )
}

export default AddingOrgForm
