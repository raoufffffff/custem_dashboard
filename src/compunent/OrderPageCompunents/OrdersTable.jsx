import BoxCard from "../../CustomUi/BoxCard";
import OrderRow from "./OrderRow";
import { IoMdSearch, IoMdClose } from "react-icons/io";

const OrdersTable = ({ orders, emptyMessage, loading, edite, ucan, EdetAllOrder, sendtoLiv, fetchOrders, deleteOrder }) => (
    <BoxCard
        about={"Orders"}
    >
        <form
            className="flex w-full items-center gap-2 my-2"
        >
            <input
                type="text" name="search"
                className=" bg-gray-100 focus:border-gray-600 focus:outline-gray-200 flex-1 px-3 rounded-xl py-2"
                placeholder="Search by: order number, name, surname, phone number..."
                autocomplete="off" value=""
            />
            <span
                className="bg-gray-100 cursor-pointer py-3 px-4 mx-0.5 rounded-xl"
            >
                <IoMdSearch />
            </span>
            <span
                className="bg-gray-100 cursor-pointer py-3 px-4 mx-0.5 rounded-xl"
            >
                <IoMdClose />
            </span>
        </form>

        <div className="overflow-hidden ">
            <div className="overflow-x-auto">
                <table className="min-w-full  ">
                    <thead className="">
                        <tr>
                            <th className="px-1 text-left text-xs font-medium text-gray-500 capitalize whitespace-nowrap min-w-max tracking-wider"></th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize whitespace-nowrap min-w-max tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize whitespace-nowrap min-w-max tracking-wider">Item</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize whitespace-nowrap min-w-max tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize whitespace-nowrap min-w-max tracking-wider">Location</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize whitespace-nowrap min-w-max tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize whitespace-nowrap min-w-max tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize whitespace-nowrap min-w-max tracking-wider">Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize whitespace-nowrap min-w-max tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize whitespace-nowrap min-w-max tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize whitespace-nowrap min-w-max tracking-wider">Product Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize whitespace-nowrap min-w-max tracking-wider">Ride Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize whitespace-nowrap min-w-max tracking-wider">Note</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize whitespace-nowrap min-w-max tracking-wider">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white  divide-gray-200">
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-gray-200 rounded w-28"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                                    </td>
                                </tr>
                            ))
                        ) : orders.length > 0 ? (
                            orders.map((item, index) => (
                                <OrderRow
                                    deleteOrder={deleteOrder}
                                    fetchOrders={fetchOrders}
                                    sendtoLiv={sendtoLiv}
                                    EdetAllOrder={EdetAllOrder}
                                    edite={edite} ucan={ucan} key={item._id} order={item} index={index} />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                                    {emptyMessage}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </BoxCard>
);



export default OrdersTable;