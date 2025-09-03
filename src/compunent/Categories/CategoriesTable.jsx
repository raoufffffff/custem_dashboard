import { useState } from "react";
import { X, ExternalLink, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import Model from "../../CustomUi/Model";
import Empty from "../../CustomUi/Empty";

const CategoriesTable = ({ Categories = [] }) => {
    const [show, setShow] = useState({
        show: false,
        id: null,
        showDelete: false,
        name: null
    });

    const hide = () => setShow({ show: false, id: null, showDelete: false, name: null })

    return (
        <div className="w-full bg-white rounded-2xl  p-4 ">
            {show.showDelete && <Model
                classname={"py-3 px-6"}
                onclose={hide}
            >
                <h2 className="text-lg font-bold mb-4">delete the product</h2>
                <p className="mb-6">Are you sure you want to delete product {show.name}? All data related to this product, such as sales statistics, etc., will be deleted.</p>
                <div
                    className="flex justify-end gap-3"
                >
                    <button
                        onClick={hide}
                        className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all">Cancel</button>
                    <button
                        onClick={hide}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all">Delete</button>
                </div>
            </Model>}
            {show.show && <Model
                classname={"py-3 px-6"}
                onclose={hide}
            >
                <h2 className="text-lg font-bold mb-4">Update the status of this product</h2>

                <div className="flex flex-col justify-end gap-3">
                    <div
                        className="flex w-full"
                    >
                        <button
                            onClick={hide}
                            className="px-4 flex-1 py-2 text-start text-green-600 bg-green-200  rounded-lg transition-all hover:scale-105">visible</button>
                    </div>
                    <div
                        className="flex w-full"
                    >
                        <button
                            onClick={hide}
                            className="px-4 flex-1 transition-all text-start py-2 text-red-600 bg-red-200  rounded-lg hover:scale-105"
                        >hidden</button>
                    </div>
                </div>
            </Model>}



            {/* Table Wrapper (scroll on mobile) */}

            {Categories.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-gray-700">
                        <thead className="bg-gray-50">
                            <tr className="text-left border-b">
                                <th className="py-3 px-4">Photo</th>
                                <th className="px-4">name</th>
                                <th className="px-4">Produit</th>
                                <th className="px-4">status</th>
                                <th className="px-4">Ajouté le</th>
                                <th className="px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Categories.map((p, i) => (
                                <tr
                                    key={i}
                                    className="border-b border-[#eee] hover:bg-gray-50 transition-colors"
                                >
                                    <td className="py-3 px-4">
                                        <img
                                            src={p.img}
                                            alt={p.name}
                                            className="w-12 h-12 rounded-md object-cover"
                                        />
                                    </td>
                                    <td className="px-4 font-medium text-gray-900">{p.name}</td>
                                    <td className="px-4 font-medium text-gray-900">{p.Produit}</td>
                                    <td className="px-4">
                                        <span
                                            onClick={() => setShow({ show: !show.show, id: p._id, showDelete: false, name: p.name })}
                                            className={`px-3 py-1 rounded-full text-xs 
                                           cursor-pointer font-medium mx-auto ${p.best
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            {p.best ? "visible" : "caché"}
                                        </span>
                                    </td>
                                    <td className="px-4 text-xs text-gray-500 whitespace-nowrap">
                                        {format(new Date(p.date), "MMM dd, yyyy")}
                                        <span className="ml-1">
                                            {format(new Date(p.date), "HH:mm")}
                                        </span>
                                    </td>
                                    <td className="px-4">
                                        <div className="flex gap-3">
                                            <ExternalLink className="w-4 h-4 cursor-pointer text-gray-600 hover:text-gray-900" />
                                            <Edit className="w-4 h-4 cursor-pointer text-blue-500 hover:text-blue-700" />
                                            <Trash2
                                                onClick={() => setShow({ show: false, id: p._id, showDelete: true, name: p.name })}
                                                className="w-4 h-4 cursor-pointer text-red-500 hover:text-red-700" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : <Empty />}

        </div>
    );
};



export default CategoriesTable