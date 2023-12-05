import PageContainer from "../../../@dmt/constants/BreadCrumbs/PageContainer"
import { Box } from "@mui/system"
import { HEADER } from "../../../@dmt/constants/BreadCrumbs/HeaderMessages"
import MainDashboard from "../MainDashboard"

const breadcrumbs = [
    {label: HEADER.DASHBOARD, link: '/'},
    {label: HEADER.GENERAL_DASHBOARD, isActive: true},
]
const GeneralDashboard = () =>{
    return(
        <PageContainer heading={HEADER.GENERAL_DASHBOARD} breadcrumbs={breadcrumbs}>
            <MainDashboard />
        </PageContainer>
    )
}

export default GeneralDashboard;