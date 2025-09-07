import React from 'react'
import PageContainer from '../CustomUi/PageContainer';
import BoxCard from '../CustomUi/BoxCard';
import GeneralOverview from '../compunent/itemsPage/GeneralOverview';
import CategoriesTable from '../compunent/Categories/CategoriesTable';

const Pixels = () => {
    const pixlas = []

    return (
        <PageContainer
            titel={'Store'}
            about={"Pixels"}
        >
            <BoxCard
                about={"General overview"}
            >
                <GeneralOverview
                    type={"Categories"}
                    stats={pixlas} />
            </BoxCard>
            <BoxCard
                about={"Categories list"}>
                <CategoriesTable
                    type={"Categories"}
                    products={pixlas}
                // changeStatus={changeStatus}
                // deleteItem={deleteItem}
                />

            </BoxCard>
        </PageContainer>
    )
}

export default Pixels