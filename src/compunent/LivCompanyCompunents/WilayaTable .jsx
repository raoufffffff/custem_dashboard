import React from 'react';
import { motion } from 'framer-motion';

const WilayaTable = ({ data }) => {
    return (
        <div className="p-4">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold mb-4"
            >
                Wilayas Order Stats
            </motion.h2>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="overflow-auto"
            >
                <table className="w-full border-collapse rounded-xl shadow-lg">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="px-4 py-2 text-left">#</th>
                            <th className="px-4 py-2 text-left">Wilaya (AR)</th>
                            <th className="px-4 py-2 text-left">Orders</th>
                            <th className="px-4 py-2 text-left">Status List</th>
                            <th className="px-4 py-2 text-left">Stop Back</th>
                            <th className="px-4 py-2 text-left">Prix Initial</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((wilaya, index) => (
                            <motion.tr
                                key={wilaya.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="odd:bg-white even:bg-gray-50 hover:bg-blue-100"
                            >
                                <td className="px-4 py-2 font-semibold">{index + 1}</td>
                                <td className="px-4 py-2">{wilaya.ar_name}</td>
                                <td className="px-4 py-2">{wilaya.couant}</td>
                                <td className="px-4 py-2">
                                    <div className="flex flex-wrap gap-1">
                                        {wilaya.status.map((s, i) => (
                                            <span
                                                key={i}
                                                className="bg-gray-200 text-gray-800 px-2 py-1 text-xs rounded"
                                            >
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-4 py-2">{wilaya.stop_back} DA</td>
                                <td className="px-4 py-2">{wilaya.prix_initial} DA</td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
};

export default WilayaTable;
