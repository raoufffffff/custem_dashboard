import { useEffect, useState } from "react";
import axios from "axios";
import states from "../constanst/states.json";
import useUser from "../hooks/useUser";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Save } from "lucide-react";

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

    if (loading || loadingg) return <div className="text-center text-xl mt-10 text-blue-600">جارٍ التحميل...</div>;

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
        <div className="max-w-6xl mx-auto p-6 font-[Cairo] bg-white min-h-screen">
            {Ucan && (
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={UpdateWebsete}
                    className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Save className="h-5 w-5" />
                    <span>Save to Website</span>
                </motion.button>
            )}
            <h1 className="text-3xl font-bold text-blue-600 text-center mb-10">إعداد أسعار التوصيل حسب الولاية</h1>

            <div className="overflow-x-auto">
                <table className="table w-full border border-gray-200 rounded-xl shadow-md table-zebra">
                    <thead className="bg-blue-600 text-white text-center text-base">
                        <tr>
                            <th className="py-3">#</th>
                            <th>الولاية</th>
                            <th>إلى المنزل</th>
                            <th>إلى المكتب</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {liv.map((state, index) => {
                            const info = states.find((s) => s.id === state.id);
                            return (
                                <tr key={state.id} className="hover:bg-blue-50 transition-all">
                                    <td className="font-bold">{index + 1}</td>
                                    <td className="text-blue-800 font-semibold">{info?.ar_name || state.name}</td>
                                    <td>
                                        <input
                                            type="number"
                                            className="input input-sm w-24 text-center border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                            value={state.prix_initial}
                                            onChange={(e) =>
                                                handleInputChange(state.id, "prix_initial", e.target.value)
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="input input-sm w-24 text-center border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                            value={state.stop_back}
                                            onChange={(e) =>
                                                handleInputChange(state.id, "stop_back", e.target.value)
                                            }
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LivrisionPrice;
