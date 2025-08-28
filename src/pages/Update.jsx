import { Outlet } from 'react-router-dom'
import PageContainer from '../CustomUi/PageContainer'

const Update = () => {
    return (
        <PageContainer
            titel={"Update your "}
            about={"Store"}
            className={"py-5"}
        >
            <Outlet />
        </PageContainer>
    )
}

export default Update