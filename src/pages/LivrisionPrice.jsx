import { useEffect, useState } from "react";
import axios from "axios";
import states from "../constanst/states.json";
import useUser from "../hooks/useUser";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { Loader2 } from "lucide-react";
import PageContainer from "../CustomUi/PageContainer";

const LivrisionPrice = () => {
    const [liv, setLiv] = useState(states);
    const [loadingg, setLoading] = useState(true);
    const [Ucan, setUcan] = useState(false);
    const { _id, website, loading } = useUser()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const localUser = localStorage.getItem("user");
                if (!localUser) throw new Error("User not found in localStorage");

                const userId = JSON.parse(localUser)._id;
                const res = await axios.get(`https://true-fit-dz-api.vercel.app/liv/${userId}`);
                if (res.data.good) {
                    setLiv(res.data.result[0].LivPrice);
                    return
                }
                setLiv(states);
            } catch {
                toast.success("تم التعديل بنجاح ✅");

            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleInputChange = (id, field, value) => {
        setLiv((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, [field]: +value } : item
            )
        );
        setUcan(true)
    };

    if (loading || loadingg) return <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
    </div>
    const UpdateWebsete = async () => {
        setLoading(true)
        setUcan(false)
        try {
            const res = await axios.put(`https://next-website-server.vercel.app/update-livprice`, {
                id: _id,
                name: website.repoName,
                livprice: liv
            })
            if (res.data.success) {
                setLoading(false)
                toast.success("تم التعديل بنجاح ✅");
            }
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <PageContainer
            titel={"delivery"}
            about={"Prices"}
        >
            {Ucan && (
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={UpdateWebsete}
                    className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Save className="h-5 w-5" />
                    <span>Save to Website</span>
                </motion.button>
            )}

            <div className="overflow-hidden w-full rounded shadow-xl border border-gray-200">
                <div className="overflow-x-auto relative">
                    <table className="min-w-full bg-white">
                        {/* Sticky header */}
                        <thead className="bg-purple-500 text-white sticky top-0 z-10 shadow-sm">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold  uppercase tracking-wider">#</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider">الولاية</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider">إلى المنزل</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider">إلى المكتب</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100 text-sm">
                            {liv.map((state, index) => {
                                const info = states.find((s) => s.id === state.id);
                                return (
                                    <tr
                                        key={state.id}
                                        className="hover:bg-blue-50/50 transition-all duration-200 ease-in-out hover:shadow-sm"
                                    >
                                        <td className="px-4 py-3 font-medium text-gray-700">{index + 1}</td>
                                        <td className="px-6 py-3 font-semibold text-gray-900">{info?.ar_name || state.name}</td>
                                        <td className="px-6 py-3">
                                            <input
                                                type="number"
                                                className="w-28 text-center border border-gray-300 rounded-lg px-2 py-1.5 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                value={state.prix_initial}
                                                onChange={(e) => handleInputChange(state.id, "prix_initial", e.target.value)}
                                            />
                                        </td>
                                        <td className="px-6 py-3">
                                            <input
                                                type="number"
                                                className="w-28 text-center border border-gray-300 rounded-lg px-2 py-1.5 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                value={state.stop_back}
                                                onChange={(e) => handleInputChange(state.id, "stop_back", e.target.value)}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>


        </PageContainer>
    );
};

export default LivrisionPrice;
