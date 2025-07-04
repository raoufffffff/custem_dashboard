import {
    CheckCircle,
    AlertTriangle,
    ThumbsUp,
    ThumbsDown,
    Info
} from "lucide-react";
import CustomImg from "../../CustomUi/CustomImg";

const ProjectsOverview = ({ order = [] }) => {
    const myorder = order.map(e => e.item);

    const getUniqueId = () => {
        const uniqueId = [];
        for (const item of myorder) {
            if (!uniqueId.some(entry => entry.id === item._id)) {
                uniqueId.push({
                    id: item._id,
                    img: item.imgs[0],
                    name: item.name
                });
            }
        }
        return uniqueId;
    };

    const getItemStatus = (confirmed, cancelled) => {
        const netOrders = confirmed - cancelled;

        if (cancelled > confirmed * 0.5) { // If more than 50% cancelled
            return {
                text: "Poor performer",
                color: "bg-red-100 text-red-800",
                icon: <ThumbsDown className="w-4 h-4" />
            };
        } else if (netOrders < 10) {
            return {
                text: "Average performer",
                color: "bg-yellow-100 text-yellow-800",
                icon: <AlertTriangle className="w-4 h-4" />
            };
        } else {
            return {
                text: "Top seller",
                color: "bg-green-100 text-green-800",
                icon: <ThumbsUp className="w-4 h-4" />
            };
        }
    };

    const uniqueItems = getUniqueId();

    return (
        <div className="w-11/12 md:w-7/12 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div className="mb-4 sm:mb-0">
                    <h2 className="text-xl font-semibold text-gray-800">Order Performance</h2>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span>{order.filter(e => e.status === "confirmed").length} confirmed orders</span>
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Total Items:</span>
                    <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {uniqueItems.length}
                    </span>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Item
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total Orders
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Confirmed
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Cancelled
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {uniqueItems.map((item, i) => {
                            const totalOrders = myorder.filter(e => e._id === item.id).length;
                            const confirmed = order.filter(e => e.item._id === item.id && e.status === "confirmed").length;
                            const cancelled = order.filter(e => e.item._id === item.id && e.status === "cancelled").length;
                            const status = getItemStatus(confirmed, cancelled);

                            return (
                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <CustomImg tabel={true} logo={[item.img]} />

                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{totalOrders}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                                            {confirmed}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                            {cancelled}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                                            {status.icon}
                                            {status.text}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-3">
                <div className="flex items-center text-sm text-gray-500">
                    <div className="w-3 h-3 rounded-full bg-green-100 mr-2 flex items-center justify-center">
                        <ThumbsUp className="w-2 h-2 text-green-800" />
                    </div>
                    <span>Top seller (Net +10)</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                    <div className="w-3 h-3 rounded-full bg-yellow-100 mr-2 flex items-center justify-center">
                        <AlertTriangle className="w-2 h-2 text-yellow-800" />
                    </div>
                    <span>Average (Net {"<"}10)</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                    <div className="w-3 h-3 rounded-full bg-red-100 mr-2 flex items-center justify-center">
                        <ThumbsDown className="w-2 h-2 text-red-800" />
                    </div>
                    <span>Poor ({">"}50% cancelled)</span>
                </div>
            </div>
        </div>
    );
};

export default ProjectsOverview;