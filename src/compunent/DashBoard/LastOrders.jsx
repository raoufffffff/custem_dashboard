// LastOrders.tsx
import {
    CheckCircle,
    ShoppingCart,
    Server,
    CreditCard,
    AlertCircle,
} from "lucide-react";

const orders = [
    {
        icon: <CheckCircle className="w-4 h-4 text-white" />,
        bg: "bg-green-500",
        title: "$2400, Design changes",
        time: "22 DEC 7:20 PM",
    },
    {
        icon: <ShoppingCart className="w-4 h-4 text-white" />,
        bg: "bg-red-500",
        title: "New order #1832412",
        time: "21 DEC 11 PM",
    },
    {
        icon: <Server className="w-4 h-4 text-white" />,
        bg: "bg-blue-500",
        title: "Server payments for April",
        time: "21 DEC 9:34 PM",
    },
    {
        icon: <CreditCard className="w-4 h-4 text-white" />,
        bg: "bg-orange-400",
        title: "New card added for order #4395133",
        time: "20 DEC 2:20 AM",
    },
    {
        icon: <AlertCircle className="w-4 h-4 text-white" />,
        bg: "bg-pink-500",
        title: "New card added for order #4395133",
        time: "18 DEC 4:54 AM",
    },
];

export default function LastOrders() {
    return (
        <div className="w-11/12 md:w-4/12 my-3 lg:h-[525px] py-5 px-10 bg-white rounded-xl shadow-md">
            <h2 className="text-lg capitalize font-semibold text-gray-800 mb-5">
                last 10 orders
            </h2>


            <ol className="relative border-s border-gray-200">
                {orders.map((item, index) => (
                    <li key={index} className="mb-10 ms-6">
                        <span
                            className={`absolute flex items-center justify-center w-6 h-6 ${item.bg} rounded-full -start-3 ring-8 ring-white`}
                        >
                            {item.icon}
                        </span>
                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                        <time className="block text-sm text-gray-500">{item.time}</time>
                    </li>
                ))}
            </ol>
        </div>
    );
}
