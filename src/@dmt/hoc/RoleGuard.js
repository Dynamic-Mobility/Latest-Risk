import React from 'react'
import { useSelector } from 'react-redux'

const RoleGuard = ({ children,permission}) => {
  const { userRole } = useSelector(({ role }) => role)

  const permissionsArray = Array.isArray(userRole?.permissions)
    ? userRole?.permissions
    : [userRole?.permissions];

  // check if user has permission and is authenticated
  const hasPermission = permissionsArray.includes(permission);

  if (!hasPermission) {
    return null;
  } 

  return (
    <>
    {children}
    </>
  )
}

export default RoleGuard