import React from 'react'
import { Box } from '@mui/system'
import { Typography } from "@mui/material";

const PageHeader = ({children,heading,breadcrumbComponent}) => {
  return (
    <Box>
        <Typography>{heading}</Typography>
        <Box>{breadcrumbComponent}</Box>
        {children}
    </Box>
  )
}

export default PageHeader