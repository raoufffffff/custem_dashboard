import PageContainer from '../CustomUi/PageContainer';
import BoxCard from '../CustomUi/BoxCard';
import GeneralOverview from '../compunent/itemsPage/GeneralOverview';
import { Loader2 } from 'lucide-react';
import CategoriesTable from '../compunent/Categories/CategoriesTable';
import UseUpdateStore from '../hooks/UseUpdateStore'

const Categories = () => {
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
            titel={'Categories'}
            about={"management"}
        >
            <BoxCard
                about={"General overview"}
            >
                <GeneralOverview
                    type={"Categories"}
                    stats={Categories} />
            </BoxCard>
            <BoxCard
                about={"Categories list"}>
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