import { useState } from 'react';
import { parseISO, format, getWeek, getMonth, getYear } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

export default function StatCard({
    title,
    order,
    color = "bg-[#155dfc]",
    shadow = "shadow-blue-600",
    icon
}) {
    const [about, setAbout] = useState("day");

    const now = new Date();

    // فلترة الطلبات حسب النوع
    const filteredOrders = order.filter((ord) => {
        const date = parseISO(ord.date);
        if (about === "day") {
            return format(date, "yyyy-MM-dd") === format(now, "yyyy-MM-dd");
        } else if (about === "week") {
            return getWeek(date) === getWeek(now) && getYear(date) === getYear(now);
        } else if (about === "month") {
            return getMonth(date) === getMonth(now) && getYear(date) === getYear(now);
        }
        return false;
    });

    return (
        <div className="bg-white rounded-xl shadow-md p-4 flex-col items-center space-x-4 w-11/12 relative md:w-5/12 lg:w-[23%] mx-2 my-5">
            {/* أيقونة */}
            <div className={`${color} absolute -top-6  rounded-xl p-4 text-white shadow-sm ${shadow}`}>
                {icon}
            </div>

            {/* عنوان وعدد */}
            <div className="flex flex-col justify-end items-end mt-6">
                <span className="text-sm text-gray-500 capitalize">
                    this {about} {title}
                </span>

                <AnimatePresence mode="wait">
                    <motion.span
                        key={about} // يُعيد بناء العنصر عند تغيير "about"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="text-xl font-semibold text-gray-800"
                    >
                        {filteredOrders.length}
                    </motion.span>
                </AnimatePresence>
            </div>

            {/* خط فاصل */}
            <div className='h-[1px] w-7/12 shadow-2xl mx-auto bg-[#eddeed] mt-2'></div>

            {/* أزرار التبديل */}
            <div className="flex justify-center mt-4 gap-2">
                {["day", "week", "month"].map((period) => (
                    <button
                        key={period}
                        onClick={() => setAbout(period)}
                        className={`px-3 py-1 rounded-full text-sm capitalize ${about === period
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-700"
                            }`}
                    >
                        {period}
                    </button>
                ))}
            </div>
        </div>
    );
}
