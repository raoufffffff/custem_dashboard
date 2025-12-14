import { motion } from "framer-motion";
import { format, differenceInMinutes, differenceInHours, differenceInDays, differenceInWeeks, differenceInMonths, differenceInYears } from "date-fns";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Bell, XCircle, CheckCircle2, Package, Clock, PhoneOff, Ban,
    Pencil, Truck, Building2, StickyNote, HomeIcon, Trash, MapPin, User,
    Phone, Tag, Palette, Ruler // 🔥 Imported Palette & Ruler icons
} from "lucide-react";
import ShowNoteC from "./OrderRow/showNote";
import ShowdeleteC from "./OrderRow/ShowdeleteC";

const OrderCard = ({ order, index, edite, sendtoLiv, fetchOrders, deleteOrder, isPaid }) => {
    const { t } = useTranslation("dashboard");
    const [myorder, setMyOrder] = useState(order);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [showdelete, setshowdelete] = useState(false);
    const [showNote, setShowNote] = useState({ show: false, status: "" });
    const [note, setNote] = useState(order?.note || "");
    const changenote = (e) => setNote(e);

    const statuses = [
        { key: "pending", label: t("pending"), color: "bg-blue-50 text-blue-600 border-blue-200", icon: <Bell className="w-3.5 h-3.5" /> },
        { key: "Connection failed 1", label: t("Connectionfailed1"), color: "bg-yellow-50 text-yellow-600 border-yellow-200", icon: <PhoneOff className="w-3.5 h-3.5" /> },
        { key: "Connection failed 2", label: t("Connectionfailed2"), color: "bg-yellow-50 text-yellow-600 border-yellow-200", icon: <PhoneOff className="w-3.5 h-3.5" /> },
        { key: "Connection failed 3", label: t("Connectionfailed3"), color: "bg-yellow-50 text-yellow-600 border-yellow-200", icon: <PhoneOff className="w-3.5 h-3.5" /> },
        { key: "confirmed", label: t("confirmed"), color: "bg-green-50 text-green-600 border-green-200", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
        { key: "ready", label: t("ready"), color: "bg-emerald-50 text-emerald-600 border-emerald-200", icon: <Package className="w-3.5 h-3.5" /> },
        { key: "Postponed", label: t("Postponed"), color: "bg-purple-50 text-purple-600 border-purple-200", icon: <Clock className="w-3.5 h-3.5" /> },
        { key: "cancelled", label: t("cancelled"), color: "bg-gray-50 text-gray-500 border-gray-200", icon: <XCircle className="w-3.5 h-3.5" /> },
        { key: "failed", label: t("failed"), color: "bg-red-50 text-red-600 border-red-200", icon: <Ban className="w-3.5 h-3.5" /> },
    ];

    const hide = () => {
        setshowdelete(false);
        setShowStatusDropdown(false);
        setShowNote({ show: false, status: "" });
    };

    const handleStatusChange = (newStatus) => {
        const updatedOrder = { ...myorder, status: newStatus };
        setMyOrder(updatedOrder);
        setShowStatusDropdown(false);
        edite(order._id, newStatus, note);
    };

    const getSocialTime = (date) => {
        const now = new Date();
        const past = new Date(date);
        const minutes = differenceInMinutes(now, past);
        if (minutes < 60) return `${minutes}m`;
        const hours = differenceInHours(now, past);
        if (hours < 24) return `${hours}h`;
        const days = differenceInDays(now, past);
        if (days < 7) return `${days}d`;
        const weeks = differenceInWeeks(now, past);
        if (weeks < 4) return `${weeks}w`;
        const months = differenceInMonths(now, past);
        if (months < 12) return `${months}mo`;
        const years = differenceInYears(now, past);
        return `${years}y`;
    };

    const showorder = (a) => {
        if (myorder.show) return a;
        if (!myorder.show && !isPaid) return "**********";
        if (!myorder.show && isPaid) return a;
    }

    const currentStatus = statuses.find((s) => s.key === myorder.status);
    const borderClass = currentStatus?.color.split(" ").find(c => c.startsWith("border-")) || "border-gray-200";

    return (
        <>
            {/* --- Status Modal --- */}
            {showStatusDropdown && (
                <>
                    <div className="fixed inset-0 bg-black/40 z-50 backdrop-blur-[2px]" onClick={() => setShowStatusDropdown(false)} />
                    <div className="fixed inset-0 flex items-center justify-center z-[51] pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 overflow-hidden pointer-events-auto border border-gray-100"
                        >
                            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                                <h3 className="text-base font-semibold text-gray-900">{t("changeOrderStatus")}</h3>
                            </div>
                            <div className="p-2 space-y-1 max-h-[60vh] overflow-y-auto custom-scrollbar">
                                {statuses.map((s) => (
                                    <div
                                        key={s.key}
                                        className={`px-3 py-2.5 text-sm cursor-pointer rounded-xl flex items-center justify-between transition-all ${myorder.status === s.key ? "bg-gray-100 font-semibold ring-1 ring-gray-200" : "hover:bg-gray-50"}`}
                                        onClick={() => handleStatusChange(s.key)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-1.5 rounded-full ${s.color.replace('text-', 'bg-').split(' ')[0]} bg-opacity-20`}>
                                                {s.icon}
                                            </div>
                                            {s.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}

            {/* --- CARD DESIGN --- */}
            <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className={`group bg-white border ${borderClass} rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden`}
            >
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${currentStatus?.color.replace('text-', 'bg-').split(' ')[0]}`} />

                {myorder.offer && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-xl shadow-sm z-10 flex items-center gap-1">
                        <Tag size={10} className="fill-white" />
                        {myorder.offerNmae || "offer"}
                    </div>
                )}

                {/* 1. Header: ID & Time */}
                <div className="flex justify-between items-start mb-4 pl-2">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t("OrderID")}</span>
                        <span className="text-sm font-bold text-gray-900 font-mono">#{order._id.slice(-6)}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                        <Clock size={12} className="mr-1" />
                        {getSocialTime(myorder.date)} {t("ago")}
                    </div>
                </div>

                {/* 2. Main Content: Image & Customer */}
                <div className="flex gap-4 mb-4 pl-2">
                    <div className="relative shrink-0">
                        <img
                            className="h-16 w-16 rounded-xl object-cover shadow-sm border border-gray-100"
                            src={myorder.item.images[0]}
                            alt={myorder.item.name}
                        />
                        <div className="absolute -bottom-2 -right-2 bg-white text-[10px] font-bold px-1.5 py-0.5 rounded-md border shadow-sm">
                            x{myorder.quantity}
                        </div>
                    </div>

                    <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-gray-900 truncate mb-1">{myorder.item.name}</h4>

                        {/* 🔥🔥🔥🔥 NEW: SIZE AND COLOR VARIANTS 🔥🔥🔥🔥 */}
                        {(myorder.size || myorder.color) && (
                            <div className="flex flex-wrap gap-2 mb-2">
                                {myorder.size && (
                                    <div className="flex items-center gap-1 text-[10px] font-medium text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
                                        <Ruler size={10} className="text-gray-400" />
                                        <span>{myorder.size}</span>
                                    </div>
                                )}
                                {myorder.color && (
                                    <div className="flex items-center gap-1 text-[10px] font-medium text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
                                        <Palette size={10} className="text-gray-400" />
                                        {/* Try to show the color dot if possible */}
                                        <span
                                            className="w-2 h-2 rounded-full border border-gray-300 shadow-sm"
                                            style={{ backgroundColor: myorder.color }}
                                        />
                                        <span>{myorder.color}</span>
                                    </div>
                                )}
                            </div>
                        )}
                        {/* 🔥🔥🔥🔥 END VARIANTS 🔥🔥🔥🔥 */}

                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-0.5">
                            <User size={12} />
                            <span className="truncate">{myorder.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-0.5">
                            <MapPin size={12} />
                            <span className="truncate">{myorder.city} - {myorder.state}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            {myorder.home ? <HomeIcon size={12} /> : <Building2 size={12} />}
                            <span className="truncate">{myorder.home ? t("HomeDelivery") : t("Office")}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                            <Phone size={12} />
                            {showorder(myorder.phone)}
                        </div>
                    </div>
                </div>

                {/* 3. Divider & Financials */}
                <div className="border-t border-dashed border-gray-200 my-3 ml-2"></div>

                <div className="flex justify-between items-end mb-4 pl-2">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 text-[10px] text-gray-400 mb-1">
                            <span className="flex items-center gap-1">
                                <Package size={10} /> {myorder.price}
                            </span>
                            <span className="text-gray-300">|</span>
                            <span className={`flex items-center gap-1 font-medium ${myorder.ride === 0 ? "text-green-600 font-bold" : "text-teal-600"}`}>
                                <Truck size={10} />
                                {myorder.ride === 0 ? "FREE" : myorder.ride}
                            </span>
                        </div>

                        <div className="text-lg font-bold text-teal-700 leading-none">
                            {myorder.total} <span className="text-xs font-normal text-teal-600">DZD</span>
                        </div>
                        <div className="text-[10px] text-gray-400 mt-0.5">{t("TotalAmount")}</div>
                    </div>

                    <button
                        onClick={() => setShowStatusDropdown(true)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${currentStatus?.color || "bg-gray-100 text-gray-800 border-gray-200"}`}
                    >
                        {currentStatus?.icon}
                        {currentStatus?.label}
                    </button>
                </div>

                {/* --- DISPLAY NOTE HERE --- */}
                {myorder.not && (
                    <div className="mb-4 pl-2 px-1">
                        <div className="bg-amber-50 border border-amber-100 rounded-lg p-2.5 text-xs text-gray-700 flex items-start gap-2">
                            <div className="mt-0.5 min-w-[14px]">
                                <StickyNote size={12} className="text-amber-500" />
                            </div>
                            <p className="leading-relaxed break-words">{myorder.not}</p>
                        </div>
                    </div>
                )}

                {/* 4. Footer Actions */}
                <div className="bg-gray-50 -mx-4 -mb-4 px-4 py-3 rounded-b-2xl border-t border-gray-100 flex justify-between items-center mt-auto pl-6">
                    <div
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 px-2 py-1 rounded-lg transition-colors"
                        onClick={() => setShowNote({ show: true, status: myorder.status })}
                    >
                        <Pencil size={14} className={myorder.not ? "text-amber-500" : "text-gray-400"} />
                        <span className={`text-xs max-w-[120px] truncate ${myorder.not ? "text-gray-700 font-medium" : "text-gray-400 italic"}`}>
                            {myorder.not ? t("EditNote") : t("AddNote")}....
                        </span>
                    </div>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setshowdelete(true)}
                            className="p-2 rounded-full hover:bg-red-100 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete Order"
                        >
                            <Trash size={16} />
                        </button>
                    </div>
                </div>

                {/* Modals */}
                {showdelete && <ShowdeleteC deleteOrder={deleteOrder} hide={hide} myorder={myorder} />}
                {showNote.show && <ShowNoteC note={note} changenote={changenote} edite={edite} myorder={myorder} showNote={showNote} hide={hide} />}
            </motion.div>
        </>
    );
};

export default OrderCard;