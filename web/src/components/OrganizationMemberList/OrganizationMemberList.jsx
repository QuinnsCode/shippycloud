import React from 'react'

import { Link, routes } from '@redwoodjs/router'

const OrganizationMemberList = ({ members, appId, addANewMember }) => {
  return (
    <div className="space-y-4">
      {members.map((member, index) => (
        <OrganizationMemberRow key={member.id} member={member} index={index} />
      ))}
      <AddANewMemberCard appId={appId} addANewMember={addANewMember} />
    </div>
  )
}

const OrganizationMemberRow = ({ member, index }) => {
  return (
    <div className="group bg-sky-100 text-slate-700 hover:bg-sky-200 rounded-lg shadow-md transition-all duration-300 ease-in-out overflow-hidden">
      <div className="flex items-center p-4">
        <div className="inline-flex px-2">{index + 1 + ') '}</div>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-sky-800">
            {member?.user?.name}
          </h3>
          <p className="text-sky-600">{member?.user?.email}</p>
          <p className="text-sky-500 text-sm">{member?.role}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sky-400 group-hover:text-sky-600 transition-colors duration-300">
            Member since:{' '}
            {new Date(member.createdAt).toLocaleDateString({
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
          <Link
            // to={routes.editMember({ id: member.id })}
            className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  )
}

const AddANewMemberCard = ({ appId, addANewMember }) => {
  return (
    <div className="group bg-sky-100 text-slate-700 hover:bg-sky-200 rounded-lg shadow-md transition-all duration-300 ease-in-out overflow-hidden">
      <div className="inline-flex items-center p-4 w-full">
        <button
          onClick={() => {
            addANewMember(appId)
          }}
          className="bg-blue-300 hover:bg-blue-200 text-white hover:text-sky-700 py-2 px-6 rounded-full text-center block mt-4"
        >
          Add a new member
        </button>
      </div>
    </div>
  )
}

export default OrganizationMemberList
