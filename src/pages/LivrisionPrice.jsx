import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import states from "../constanst/states.json";
import useUser from "../hooks/useUser";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Loader2, Search, Home, Building2, MapPin } from "lucide-react";
import PageContainer from "../CustomUi/PageContainer";
import { useTranslation } from "react-i18next";
import Model from '../CustomUi/Model'
import Tutorial from '../CustomUi/Tutorial'

const LivrisionPrice = () => {
    const { t, i18n } = useTranslation("DelevryComapnesAndPixals");
    const currentLang = i18n.language;
    const [showTutorial, setShowTutorial] = useState(false);

    const [liv, setLiv] = useState(states);
    const [loadingg, setLoading] = useState(true);
    const [Ucan, setUcan] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // Added Search State
    const { _id, website, loading } = useUser();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const localUser = localStorage.getItem("user");
                if (!localUser) throw new Error(t("UserNotFound"));

                const userId = JSON.parse(localUser)._id;
                const res = await axios.get(
                    `https://true-fit-dz-api.vercel.app/liv/${userId}`
                );
                if (res.data.good) {
                    setLiv(res.data.result[0].LivPrice);
                    return;
                }
                setLiv(states);
            } catch {
                toast.error(t("ErrorFetchingData"));
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [t]);

    const handleInputChange = (id, field, value) => {
        setLiv((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, [field]: +value } : item
            )
        );
        setUcan(true);
    };

    const UpdateWebsete = async () => {
        setLoading(true);
        setUcan(false);
        try {
            const localUser = localStorage.getItem("user");
            if (!localUser) throw new Error(t("UserNotFound"));

            const userId = JSON.parse(localUser)._id;
            const res = await axios.put(
                `https://true-fit-dz-api.vercel.app/liv/${userId}`,
                {
                    id: _id,
                    repoName: website.repoName,
                    livPrice: liv,
                }
            );
            if (res.data.success) {
                setLoading(false);
                toast.success(t("UpdateSuccess"));
            }
        } catch (error) {
            console.log(error);
            setLoading(false); // Ensure loading stops on error
        }
    };

    // Filter Logic
    const filteredStates = useMemo(() => {
        return liv.filter((state) => {
            const info = states.find((s) => s.id === state.id);
            const name = currentLang === "ar" ? info?.ar_name : info?.name;
            const searchLower = searchTerm.toLowerCase();

            return (
                name?.toLowerCase().includes(searchLower) ||
                state.id.toString().includes(searchLower)
            );
        });
    }, [liv, searchTerm, currentLang]);

    if (loading || loadingg)
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="animate-spin h-10 w-10 text-teal-500" />
            </div>
        );
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
            titel={t("delivery")} about={t("Prices")}>
            {showTutorial && (
                <Model
                    onclose={hideTutorial}>
                    <Tutorial about={"https://firebasestorage.googleapis.com/v0/b/tawssilatrest.appspot.com/o/%D8%AA%D8%B9%D8%AF%D9%8A%D9%84%20%D8%A7%D8%B3%D8%B9%D8%A7%D8%B1%20%D8%A7%D9%84%D8%AA%D9%88%D8%B5%D9%8A%D9%84%20next%20comerce.mp4?alt=media&token=9d932c1b-8284-48c6-8d8d-cadad861694f"} />
                </Model>
            )}
            {/* --- Search Section --- */}
            <div className="mb-6 relative w-full mx-auto md:mx-0">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-150 ease-in-out shadow-sm"
                    placeholder={t("Search by State Name or Number...")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* --- Grid Section --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <AnimatePresence>
                    {filteredStates.map((state, index) => {
                        const info = states.find((s) => s.id === state.id);
                        return (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                key={state.id}
                                className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md hover:border-teal-200 transition-all duration-200"
                            >
                                {/* Header: Badge + Name */}
                                <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-3">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-50 text-teal-700 font-bold text-sm border border-teal-100">
                                        {state.id}
                                    </div>
                                    <h3 className="font-bold text-gray-800 text-lg truncate">
                                        {currentLang === "ar" ? info?.ar_name || state.name : info?.name}
                                    </h3>
                                </div>

                                {/* Inputs */}
                                <div className="space-y-3">
                                    {/* Home Delivery Input */}
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Home className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="number"
                                            className="block w-full pl-9 pr-12 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors font-medium text-gray-900"
                                            value={state.prix_initial}
                                            onChange={(e) => handleInputChange(state.id, "prix_initial", e.target.value)}
                                            placeholder="0"
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <span className="text-gray-400 text-xs">DZD</span>
                                        </div>
                                        <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] font-medium text-gray-500">
                                            {t("ToHome")}
                                        </label>
                                    </div>

                                    {/* Office Delivery Input */}
                                    <div className="relative pt-1">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Building2 className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="number"
                                            className="block w-full pl-9 pr-12 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors font-medium text-gray-900"
                                            value={state.stop_back}
                                            onChange={(e) => handleInputChange(state.id, "stop_back", e.target.value)}
                                            placeholder="0"
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <span className="text-gray-400 text-xs">DZD</span>
                                        </div>
                                        <label className="absolute -top-1 left-2 bg-white px-1 text-[10px] font-medium text-gray-500">
                                            {t("ToOffice")}
                                        </label>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredStates.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                    <MapPin className="h-12 w-12 mb-2 opacity-50" />
                    <p>{t("No states found matching your search.")}</p>
                </div>
            )}

            {/* --- Floating Save Button --- */}
            <AnimatePresence>
                {Ucan && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className={`fixed  z-40 ${currentLang === "ar" ? "left-5" : "right-5"} bottom-5`}
                    >
                        <button
                            onClick={UpdateWebsete}
                            className={`flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 font-medium`}
                        >
                            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <Save className="h-5 w-5" />}
                            <span>{t("Save")}</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </PageContainer>
    );
};

export default LivrisionPrice;