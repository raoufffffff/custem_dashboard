import React from 'react';
import { motion } from 'framer-motion';

const WilayaTable = ({ data }) => {
    const getSuccessCount = (statuses) => {
        return statuses.filter(status => [
            "Livrée [ Recouvert ]",
            "Livrée [ Encaisser ]",
            "Livrée"
        ].includes(status)).length;
    }

    const getReturnCount = (statuses) => {
        return statuses.filter(status => [
            "Retour Livreur",
            "Retour de Dispatche",
            "Retour Client",
            "Retour Navette"
        ].includes(status)).length;
    }

    const getPendingCount = (statuses) => {
        return statuses.filter(status => [
            "Reporté",
            "Au Bureau",
            "En Préparation",
            "Dispatcher",
            "SD - En Attente du Client",
            "SD - Appel sans Réponse 1",
            "SD - Appel sans Réponse 2",
            "SD - Appel sans Réponse 3",
            "Appel sans Réponse 2"
        ].includes(status)).length;
    }

    return (
        <div className="p-6 bg-gray-50 rounded-xl">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold mb-6 text-gray-800"
            >
                Wilaya Shipping Statistics
            </motion.h2>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="overflow-auto rounded-xl shadow-md"
            >
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                            <th className="px-6 py-3 text-left font-semibold text-sm uppercase tracking-wider">#</th>
                            <th className="px-6 py-3 text-left font-semibold text-sm uppercase tracking-wider">Wilaya (AR)</th>
                            <th className="px-6 py-3 text-left font-semibold text-sm uppercase tracking-wider">Total Orders</th>
                            <th className="px-6 py-3 text-left font-semibold text-sm uppercase tracking-wider">Delivered</th>
                            <th className="px-6 py-3 text-left font-semibold text-sm uppercase tracking-wider">Returned</th>
                            <th className="px-6 py-3 text-left font-semibold text-sm uppercase tracking-wider">Pending</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data.filter(wilaya => wilaya.couant > 0).map((wilaya, index) => (
                            <motion.tr
                                key={wilaya.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="hover:bg-blue-50 transition-colors duration-150"
                            >
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{wilaya.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-semibold">{wilaya.couant}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                                        {getSuccessCount(wilaya.status)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-sm font-medium">
                                        {getReturnCount(wilaya.status)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
                                        {getPendingCount(wilaya.status)}
                                    </span>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>

            {data.filter(wilaya => wilaya.couant === 0).length > 0 && (
                <div className="mt-4 text-sm text-gray-500">
                    * {data.filter(wilaya => wilaya.couant === 0).length} wilayas with 0 orders are hidden
                </div>
            )}
        </div>
    );
};

export default WilayaTable;