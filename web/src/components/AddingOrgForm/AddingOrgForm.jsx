import OrganizationForm from 'src/components/Organization/OrganizationForm/OrganizationForm'
const AddingOrgForm = ({ userId, onSave }) => {
  return (
    <div>
      <p>Add your organization</p>
      <div className="m-16"></div>
      <OrganizationForm userId={userId} onSave={onSave} />
    </div>
  )
}

export default AddingOrgForm
