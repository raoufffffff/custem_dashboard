import PageContainer from '../CustomUi/PageContainer';
import BoxCard from '../CustomUi/BoxCard';
import GeneralOverview from '../compunent/itemsPage/GeneralOverview';
import { Loader2 } from 'lucide-react';
import CategoriesTable from '../compunent/Categories/CategoriesTable';
import UseUpdateStore from '../hooks/UseUpdateStore'
import { useTranslation } from 'react-i18next';

const Categories = () => {
    const { t } = useTranslation("ProductsAndCategories");

    const { loading, UpdateCategories, Categories, repoName, _id } = UseUpdateStore()
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
            </div>
        );
    }
    return (
        <PageContainer
            titel={t('Categories')}
            about={t("management")}
        >
            <BoxCard
                about={t("Generaloverview")}
            >
                <GeneralOverview
                    type={"Categories"}
                    stats={Categories} />
            </BoxCard>
            <BoxCard
                about={t("Categorieslist")}>
                <CategoriesTable
                    type={"Categories"}
                    repoName={repoName}
                    Categories={Categories}
                    id={_id}
                    handleUpdateCategory={UpdateCategories}
                />

            </BoxCard>
        </PageContainer>
    )
}

export default Categories