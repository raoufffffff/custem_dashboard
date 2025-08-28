import axios from "axios";
import { Trash2, Plus, Loader2, Pen, Save } from "lucide-react";
import useItem from "../hooks/useItem";
import PageContainer from "../CustomUi/PageContainer";
import GeneralOverview from "../compunent/itemsPage/GeneralOverview";
import BoxCard from "../CustomUi/BoxCard";
import ProductTable from "../compunent/itemsPage/ProductTable";
import toast from "react-hot-toast";


const Items = () => {
    const { Items, loading, fetchItems } = useItem()
    const deleteItem = async (id) => {
        try {
            await axios.delete(`https://true-fit-dz-api.vercel.app/item/${id}`);
            fetchItems();
            toast.success("Item deleted successfully")
        } catch (error) {
            toast.error("Error deleting item")
            console.log("Error deleting item:", error);
        }
    }
    const changeStatus = async (id, status) => {
        try {
            await axios.put(`https://true-fit-dz-api.vercel.app/item/${id}`, { best: status });
            fetchItems();
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

    return (
        <PageContainer
            titel={'products'}
            about={"management"}

        >
            <BoxCard
                about={"General overview"}
            >
                <GeneralOverview stats={Items} />
            </BoxCard>
            <BoxCard
                about={"Product list"}>
                <ProductTable
                    products={Items}
                    changeStatus={changeStatus}
                    deleteItem={deleteItem}
                />

            </BoxCard>
        </PageContainer>
    );
};

export default Items;