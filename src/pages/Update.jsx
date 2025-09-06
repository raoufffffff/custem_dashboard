import { Outlet, useOutletContext } from 'react-router-dom'
import PageContainer from '../CustomUi/PageContainer'

const Update = () => {
    const user = useOutletContext() // get websiteStyle from context

    return (
        <PageContainer
            titel={"Update your "}
            about={" Store"}
            className={"py-2"}
        >
            <Outlet context={user} />
        </PageContainer>
    )
}

export default Update