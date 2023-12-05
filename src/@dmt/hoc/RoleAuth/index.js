import React from 'react'
import { validatePermission } from '../../Utils/commonHelper'
import { useSelector } from 'react-redux'
import Error403 from '../../../routes/Pages/403'

const RoleBasedGuard = (props) => { 
    const { children, permission, page = false} = props;
    const { userRoles } = useSelector((roles) => roles)

    if(!validatePermission(permission, userRoles.permissions)){
        if(userRoles.permission !== undefined && page){
            return <Error403 />
        }
        return null;
    }

  return (
    <>{children}</>
  )
}

export default RoleBasedGuard;