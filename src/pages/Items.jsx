import axios from "axios";
import { Loader2, Save } from "lucide-react";
import useItem from "../hooks/useItem";
import PageContainer from "../CustomUi/PageContainer";
import GeneralOverview from "../compunent/itemsPage/GeneralOverview";
import BoxCard from "../CustomUi/BoxCard";
import ProductTable from "../compunent/itemsPage/ProductTable";
import toast from "react-hot-toast";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";


const Items = () => {
    const { t } = useTranslation("ProductsAndCategories");
    const [save, setSave] = useState(false)
    const { Items, loading, fetchItems } = useItem()
    const user = useOutletContext()
    const deleteItem = async (id) => {
        try {
            await axios.put(`https://true-fit-dz-api.vercel.app/item/delete/${id}`,
                {
                    repoName: user.repoName,
                    userId: user.id
                }
            );
            fetchItems();
            toast.success("Item deleted successfully")
        } catch (error) {
            toast.error("Error deleting item")
            console.log("Error deleting item:", error);
        }
    }
    const changeStatus = async (id, status) => {
        try {
            await axios.put(`https://true-fit-dz-api.vercel.app/item/${id}`, { show: status });
            fetchItems();
            setSave(true)
            toast.success("Status updated successfully")
        } catch (error) {
            toast.error("Error updating status")
            console.log("Error updating show status:", error);
        }

    }
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
            </div>
        );
    }
    const SaveInStore = async () => {
        try {
            await axios.put(`https://next-website-server.vercel.app/update-item`, {
                repoName: user.repoName,
                id: user.id
            });
            fetchItems();
            setSave(false)
            toast.success("your website will updated in few sec")
        } catch (error) {
            toast.error("Error updating status")
            console.log("Error updating show status:", error);
        }

    }
    return (
        <PageContainer
            titel={t('products')}
            about={t("management")}

        >
            <BoxCard
                about={t("Generaloverview")}
            >
                <GeneralOverview stats={Items} />
            </BoxCard>
            <BoxCard
                about={t("Productlist")}>
                <ProductTable
                    link={user.link}
                    products={Items}
                    changeStatus={changeStatus}
                    deleteItem={deleteItem}
                />
            </BoxCard>
            {save && <button
                onClick={SaveInStore}
                className="fixed py-1 rounded-lg px-4 bottom-4 right-3 bg-teal-500 text-white"
            >{t("save")}</button>}
        </PageContainer>
    );
};

export default Items;