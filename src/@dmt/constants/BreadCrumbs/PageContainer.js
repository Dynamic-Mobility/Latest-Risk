import React from 'react'
import PageHeader from './PageHeader'
import { Box } from '@mui/system'
import PageBreadCrumbs from './PageBreadCrumbs'

const PageContainer = ({heading,breadcrumbs,children}) => {
  return (
    <Box>
        {heading || breadcrumbs &&
         <PageHeader heading={heading}  breadcrumbComponent={breadcrumbs && <PageBreadCrumbs items={breadcrumbs} />}/>
        }
        {children}
    </Box>
  )
}

export default PageContainer