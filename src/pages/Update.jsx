import { Outlet, useOutletContext } from 'react-router-dom'
import PageContainer from '../CustomUi/PageContainer'
import { useTranslation } from 'react-i18next';

const Update = () => {
    const user = useOutletContext() // get websiteStyle from context
    const { t } = useTranslation("store");

    return (
        <PageContainer
            titel={t("Updateyour")}
            about={t("Store")}
            className={"py-2"}
        >
            <Outlet context={user} />
        </PageContainer>
    )
}

export default Update