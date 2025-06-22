// LastOrders.tsx
import { parseISO, format } from "date-fns";
import {
    ShoppingCart
} from "lucide-react";
import { Link } from "react-router-dom";



export default function LastOrders({ order = [] }) {
    let myorder = order.slice(-10).reverse()


    return (
        <div className="w-11/12 md:w-4/12 my-3  py-5 px-10 bg-white rounded-xl shadow-md">
            <h2 className="text-lg capitalize font-semibold text-gray-800 mb-5">
                last 10 orders
            </h2>


            <ol className="relative border-s border-gray-200">
                {myorder.map((item, index) => (
                    <li key={index} className="mb-10 ms-6">
                        <Link
                            to={'/'}
                        >

                            <span
                                className={`absolute flex items-center justify-center w-6 h-6 ${item.status == "confirmed" ? "bg-green-600" : item.status == "cancelled" ? "bg-red-600" : "bg-blue-600"} rounded-full -start-3 ring-8 ring-white`}
                            >
                                <ShoppingCart className={`w-4 h-4 text-white`} />
                            </span>
                            <h3 className="font-medium text-gray-900">{item.price + item.ride} DZD, {item.name}</h3>
                            <time className="block text-sm text-gray-500">{format(parseISO(item.date), "dd MMM h:mm a").toUpperCase()}</time>
                        </Link>
                    </li>
                ))}
            </ol>
        </div>
    );
}
