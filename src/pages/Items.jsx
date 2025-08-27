import axios from "axios";
import { useState } from "react";
import { Trash2, Plus, Loader2, Pen, Save } from "lucide-react";
import useItem from "../hooks/useItem";
import CustomImg from "../CustomUi/CustomImg";
import useUser from "../hooks/useUser";
import EditeItems from "../compunent/itemsPage/EditeItems";
import PageContainer from "../CustomUi/PageContainer";
import GeneralOverview from "../compunent/itemsPage/GeneralOverview";
import BoxCard from "../CustomUi/BoxCard";
import ProductTable from "../compunent/itemsPage/ProductTable";


const Items = () => {
    const { Items, loading, fetchItems } = useItem()
    const { _id, website } = useUser()
    const [showPixelModal, setShowPixelModal] = useState(false);
    const [showediteModal, setShowediteModal] = useState({
        show: false,
        item: {}
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [Update, setUpdate] = useState(false);
    const [Ucan, setUcan] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [pixelValue, setPixelValue] = useState("");
    const [loadingStates, setLoadingStates] = useState({
        toggle: {},
        delete: false
    });



    const handleDeleteClick = (id) => {
        setSelectedItem(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            setUcan(true)
            setLoadingStates(prev => ({ ...prev, delete: true }));
            await axios.delete(`https://true-fit-dz-api.vercel.app/item/${selectedItem}`);
            await fetchItems();
            setShowDeleteModal(false);
        } catch (error) {
            console.log("Error deleting item:", error);
        } finally {
            setLoadingStates(prev => ({ ...prev, delete: false }));
        }
    };

    const handleAddPixel = (id) => {
        setSelectedItem(id);
        setShowPixelModal(true);
    };

    const handleCloseModal = () => {
        setShowPixelModal(false);
        setShowDeleteModal(false);
        setPixelValue("");
        setSelectedItem(null);
    };

    const handlePixelSubmit = async () => {
        try {
            setUcan(true)
            await axios.put(`https://true-fit-dz-api.vercel.app/item/${selectedItem}`, {
                Fpixal: pixelValue
            });
            fetchItems()
            handleCloseModal();
        } catch (error) {
            console.log(error);
        }
    };
    const hendelEdite = async (id, data) => {
        setUcan(true)
        try {
            await axios.put(`https://true-fit-dz-api.vercel.app/item/${id}`, data);
            hide()
            fetchItems()
        } catch (error) {
            console.log("Error updating show status:", error);
        } finally {
            setLoadingStates(prev => ({
                ...prev,
                toggle: { ...prev.toggle, [id]: false }
            }));
        }
    }
    const toggleShowStatus = async (id, currentStatus) => {
        setUcan(true)
        try {
            setLoadingStates(prev => ({
                ...prev,
                toggle: { ...prev.toggle, [id]: true }
            }));

            await axios.put(`https://true-fit-dz-api.vercel.app/item/${id}`, {
                best: !currentStatus
            });

            fetchItems()
        } catch (error) {
            console.log("Error updating show status:", error);
        } finally {
            setLoadingStates(prev => ({
                ...prev,
                toggle: { ...prev.toggle, [id]: false }
            }));
        }
    };
    const UpdateWebsete = async () => {
        setUpdate(true)
        setUcan(false)
        try {
            const res = await axios.put(`https://next-website-server.vercel.app/update-item`, {
                id: _id,
                name: website.repoName
            })
            if (res.data.success) {
                setUpdate(false)
            }
        } catch (error) {
            console.log(error);

        }
    }
    if (loading || Update) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
            </div>
        );
    }
    const hide = () => {
        setShowDeleteModal(false)
        setShowediteModal({ item: {}, show: false })
        setShowPixelModal(false)
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
                />

            </BoxCard>
        </PageContainer>
    );
};

export default Items;