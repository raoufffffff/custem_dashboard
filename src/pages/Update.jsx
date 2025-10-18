import { Outlet } from 'react-router-dom'
import PageContainer from '../CustomUi/PageContainer'
import { useTranslation } from 'react-i18next';

const Update = () => {
    const { t } = useTranslation("store");

    return (
        <PageContainer
            titel={t("Updateyour")}
            about={t("Store")}
            className={"py-2"}
        >
            <Outlet />
        </PageContainer>
    )
}

export default Update