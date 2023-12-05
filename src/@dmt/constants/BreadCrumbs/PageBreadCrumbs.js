import React from 'react'
import { Breadcrumbs } from '@mui/material'
import { Typography } from "@mui/material";
import { Link } from 'react-router-dom'

const PageBreadCrumbs = ({items}) => {
  return (
    <Breadcrumbs>
    {items.map((item,index) =>(
        item.isActive ?
        <Typography key={index}>{item.label}</Typography>
        :
        <Link style={{textDecoration:'none',fontWeight:"bold",color:"#3F51B5"}} key={index} to={item.link || '/'}>{item.label}</Link>
    ))}
    </Breadcrumbs>
  )
}

export default PageBreadCrumbs