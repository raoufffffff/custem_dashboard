import { useState } from "react";
import { Search, X, ExternalLink, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import Model from "../../CustomUi/Model";
import Empty from "../../CustomUi/Empty";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProductTable = ({ products = [], changeStatus, deleteItem, link }) => {
    const { t } = useTranslation("ProductsAndCategories");

    const [search, setSearch] = useState("");
    const [show, setShow] = useState({
        show: false,
        id: null,
        showDelete: false,
        name: null
    });
    const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );
    const hide = () => setShow({ show: false, id: null, showDelete: false, name: null })

    return (
        <div className="w-full bg-white rounded-2xl  p-4">
            {show.showDelete && <Model
                onclose={hide}
                classname={"py-3 px-6"}

            >
                <h2 className="text-lg font-bold mb-4">{t("deletetheproduct")}</h2>
                <p className="mb-6">{t("Areyousure")}<strong>{show.name}</strong> ? {t("Alldata")}</p>
                <div
                    className="flex justify-end gap-3"
                >
                    <button
                        onClick={hide}
                        className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all">{t("Cancel")}</button>
                    <button
                        onClick={() => {
                            hide()
                            deleteItem(show.id);
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all">{t("Delete")}</button>
                </div>
            </Model>}
            {show.show && <Model
                onclose={hide}
                classname={"py-3 px-6"}
            >
                <h2 className="text-lg font-bold mb-4">{t("Updatethestatus")}</h2>

                <div className="flex flex-col justify-end gap-3">
                    <div
                        className="flex w-full"
                    >
                        <button
                            onClick={() => {
                                hide()
                                changeStatus(show.id, true);
                            }}
                            className="px-4 flex-1 py-2 text-start text-green-600 bg-green-200  rounded-lg transition-all hover:scale-105">{t("visible")}</button>
                    </div>
                    <div
                        className="flex w-full"
                    >
                        <button
                            onClick={() => {
                                hide()
                                changeStatus(show.id, false);
                            }}
                            className="px-4 flex-1 transition-all text-start py-2 text-red-600 bg-red-200  rounded-lg hover:scale-105"
                        >{t("hidden")}</button>
                    </div>
                </div>
            </Model>}
            {/* Search Bar */}
            {products.length > 0 ? (
                <>
                    <div className="flex w-full flex-col sm:flex-row sm:items-center gap-3 mb-6">
                        <div className="flex items-center bg-gray-100 flex-1 rounded-lg px-3 py-2 w-full sm:w-2/3">
                            <input
                                type="text"
                                placeholder={t("Searchby")}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none text-sm"
                            />
                            {search ? (
                                <X
                                    className="w-5 h-5 text-gray-500 cursor-pointer"
                                    onClick={() => setSearch("")}
                                />
                            ) : (
                                <Search className="w-5 h-5 text-gray-500" />
                            )}
                        </div>
                        <button className="bg-gray-800 text-white rounded-lg px-4 py-2 text-xs sm:text-sm font-medium">
                            1-{filtered.length} {t("ON")} {products.length}
                        </button>
                    </div>

                    {/* Table Wrapper (scroll on mobile) */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-gray-700">
                            <thead className="bg-gray-50">
                                <tr className="text-left border-b">
                                    <th className="py-3 px-4">{t("Photo")}</th>
                                    <th className="px-4">{t("Product")}</th>
                                    <th className="px-4">{t("Price")}</th>
                                    <th className="px-4">{t("ProductStatus")}</th>
                                    <th className="px-4">{t("Addedon")}</th>
                                    <th className="px-4">{t("Actions")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((p, i) => (
                                    <tr
                                        key={i}
                                        className="border-b border-[#eee] hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="py-3 px-4">
                                            <img
                                                src={p.images[0]}
                                                alt={p.name}
                                                className="w-12 h-12 rounded-md object-cover"
                                            />
                                        </td>
                                        <td className="px-4 font-medium text-gray-900">{p.name}</td>

                                        <td className="px-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-900">{p.price} DA</span>
                                                {p.oldPrice && (
                                                    <span className="line-through text-red-500 text-xs">
                                                        {p.oldPrice} DA
                                                    </span>
                                                )}
                                                {p.extraOffers && (
                                                    <span className="text-xs text-gray-500">
                                                        +{p.extraOffers} {t("offers")}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4">
                                            <span
                                                onClick={() => setShow({ show: !show.show, id: p._id, showDelete: false, name: p.name })}
                                                className={`px-3 py-1 rounded-full text-xs 
                                        cursor-pointer font-medium mx-auto ${p.show
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-600"
                                                    }`}
                                            >
                                                {p.show ? "visible" : "caché"}
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
                                                <a
                                                    target="_blank"
                                                    href={`https://${link}/Product/${p._id}`}
                                                >
                                                    <ExternalLink className="w-4 h-4 cursor-pointer text-gray-600 hover:text-gray-900" />
                                                </a>
                                                <Link
                                                    to={`/EdeteItem/${p._id}`}
                                                >

                                                    <Edit className="w-4 h-4 cursor-pointer text-blue-500 hover:text-blue-700" />
                                                </Link>
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

                    {/* Footer Pagination */}
                    <div className="flex justify-end mt-6">
                        <button className="bg-gray-800 text-white rounded-lg px-5 py-2 text-xs sm:text-sm font-medium">
                            1-{filtered.length} {t("ON")} {products.length}
                        </button>
                    </div>
                </>
            ) : <Empty />}
        </div>
    );
};

export default ProductTable;
