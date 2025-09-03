import React from 'react'
import useUser from '../hooks/useUser';
import PageContainer from '../CustomUi/PageContainer';
import BoxCard from '../CustomUi/BoxCard';
import GeneralOverview from '../compunent/itemsPage/GeneralOverview';
import { Loader2 } from 'lucide-react';
import CategoriesTable from '../compunent/Categories/CategoriesTable';

const Categories = () => {
    const { Categories, loading } = useUser()
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
                    products={Categories}
                // changeStatus={changeStatus}
                // deleteItem={deleteItem}
                />

            </BoxCard>
        </PageContainer>
    )
}

export default Categories