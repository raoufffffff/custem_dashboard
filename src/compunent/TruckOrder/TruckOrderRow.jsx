import { format } from 'date-fns';
import {
    CheckCircle,
    Clock,
    XCircle,
    WifiOff,
    AlertCircle,
    Circle,
    Home,
    Store,
    Pencil,
    NotebookPen,
    Truck
} from 'lucide-react';
import { motion } from "framer-motion";

const TruckOrderRow = ({ order, Items, index }) => {
    return (
        <motion.tr
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`hover:bg-opacity-80 `}
        >

            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">#{order.Tracking}</td>

            <td className="px-6 py-4 whitespace-nowrap border-l-2 border-l-[#fff] overflow-hidden">
                <div className="flex items-center">
                    <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={Items.find(e => e.name == order.TProduit).imgs[0]}
                        alt={`${order.TProduit}-${index}`}
                    />
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{order.TProduit}</div>
                        <div className="text-sm text-gray-500">Size: {order.size}</div>
                    </div>
                </div>
            </td>

            <td className="px-6 py-4 whitespace-nowrap  border-l-2 border-l-[#fff]">
                <div className="text-sm text-gray-900">{order.Client}</div>
                <div className="text-sm text-gray-500">{order.MobileA}</div>
            </td>

            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap  border-l-2 border-l-[#fff]">
                {order.Wilaya}<br />{order.Commune}
            </td>

            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap  border-l-2 border-l-[#fff]">
                <span className="flex items-center">
                    {order.TypeLivraison == 0 ? <>home <Home size={20} className="mx-3" /></> : <>brue <Store size={20} className="mx-3" /></>}
                </span>
            </td>

            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap  border-l-2 border-l-[#fff]">
                {format(new Date(order.Date_Creation
                ), 'MMM dd, yyyy')}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap  border-l-2 border-l-[#fff]">
                {format(new Date(order.DateH_Action
                ), 'MMM dd, yyyy')}
            </td>

            <td className="px-6 py-4 relative whitespace-nowrap cursor-pointer  border-l-2 border-l-[#fff]">
                <div className={`px-2 inline-flex items-center text-xs font-semibold rounded-full`}>

                    {order.Situation}
                </div>


            </td>

            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap  border-l-2 border-l-[#fff]">DZD {order.Total}</td>
            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap  border-l-2 border-l-[#fff]">DZD {order.Tarif_Livrée}</td>
            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap text-red-600  border-l-2 border-l-[#fff]">DZD {order.Tarif_Annuler}</td>





        </motion.tr>
    );
};


export default TruckOrderRow