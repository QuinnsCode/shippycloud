import { useState } from 'react'

import OrganizationMember from 'src/components/OrganizationMember/OrganizationMember/OrganizationMember'
const OrganizationMembers = ({ members }) => {
  const [member, setMember] = useState(null)
  return (
    <div>
      <div className="w-full">
        {members.map((m) => {
          return (
            <button
              onClick={() => {
                if (m.userId === member?.userId) {
                  setMember(null)
                } else {
                  setMember(m)
                }
              }}
              className="rw-button bg-black text-white mx-8 inline-flex font-thin normal-case"
              key={m.id}
            >
              {m.user.name ? m.user.name : m.user.email}
              {' - '}
              {m.role}
            </button>
          )
        })}
      </div>
      <div className="w-full">
        {member ? <OrganizationMember organizationMember={member} /> : <></>}
      </div>
    </div>
  )
}

export default OrganizationMembers
