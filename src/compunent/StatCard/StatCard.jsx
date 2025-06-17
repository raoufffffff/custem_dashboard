import { BarChart2 } from 'lucide-react';

export default function StatCard({ title = "Today's Users", value = "2,300", color = "bg-[#155dfc]", shadow = "shadow-blue-600", icon }) {
    return (
        <div className="bg-white rounded-xl shadow-md p-4 flex-col items-center space-x-4 w-11/12 relative md:w-5/12 lg:w-[23%] mx-2 my-5">
            {/* Icon Container */}

            <div className={`${color} absolute -top-6  rounded-xl p-4 text-white  shadow-sm ${shadow}`}>
                {icon}
            </div>
            {/* Content */}
            <div className="flex flex-col justify-end items-end">
                <span className="text-sm text-gray-500 capitalize">{title}</span>
                <span className="text-xl font-semibold text-gray-800">{value}</span>

            </div>

        </div>
    );
}
