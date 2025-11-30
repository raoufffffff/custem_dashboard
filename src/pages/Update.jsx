import { Outlet } from 'react-router-dom'
import PageContainer from '../CustomUi/PageContainer'
import { useTranslation } from 'react-i18next';
import Model from '../CustomUi/Model'
import Tutorial from '../CustomUi/Tutorial'
import { useState } from 'react';
const Update = () => {
    const { t } = useTranslation("store");
    const [showTutorial, setShowTutorial] = useState(false);
    const showtutorial = () => {
        setShowTutorial(true);
    };
    const hideTutorial = () => {
        setShowTutorial(false);
    }
    return (
        <PageContainer
            onClick={showtutorial}
            learn
            titel={t("Updateyour")}
            about={t("Store")}
            className={"py-2"}
        >
            {showTutorial && (
                <Model
                    onclose={hideTutorial}>
                    <Tutorial about={"https://firebasestorage.googleapis.com/v0/b/tawssilatrest.appspot.com/o/%D8%AA%D8%B9%D8%AF%D9%8A%D9%84%20%D8%A7%D9%84%D9%85%D9%88%D9%82%D8%B9%20%D8%B9%D9%84%D9%89%20%D9%85%D9%86%D8%B5%D8%A9%20next%20comerce.mp4?alt=media&token=b47fa1ad-5eba-47bf-a37b-4560615f0331"} />
                </Model>
            )}
            <Outlet />
        </PageContainer>
    )
}

export default Update