import { LuArrowRight } from "react-icons/lu";
import { Link } from "react-router-dom";

const Stats = ({ ConfirmedOrder, panddingOrder }) => {
    const Earnings = () => {
        let a = 0
        for (let i = 0; i < ConfirmedOrder.length; i++) {
            a += ConfirmedOrder[i].price
        }
        return a
    }
    return (
        <div className="bg-white w-11/12 mx-auto p-6 rounded-2xl shadow-md">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg  font-semibold text-gray-800">Overview</h2>
                <Link
                    to={'/'}
                    className="text-sm flex items-center underline  hover:underline">
                    View Details
                    <LuArrowRight
                        className="mt-1 mx-1"

                    />

                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Sold Products */}
                <div className="bg-purple-100 border border-purple-200 rounded-xl p-4 ring-white text-center">
                    <p className="text-sm text-gray-600">Sold Products</p>
                    <p className="text-xl font-bold text-gray-800">{ConfirmedOrder.length}</p>
                </div>

                {/* New Orders */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-600">New Orders</p>
                    <p className="text-xl font-bold text-gray-800">{panddingOrder.length}</p>
                </div>

                {/* Visits */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-600">Visits</p>
                    <p className="text-xl font-bold text-gray-800">0</p>
                </div>

                {/* Earnings */}
                <div className="bg-green-100 border border-green-200 rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-600">Earnings</p>
                    <p className="text-xl font-bold text-gray-800">{Earnings()} DA</p>
                </div>
            </div>
        </div>
    )
}

export default Stats
