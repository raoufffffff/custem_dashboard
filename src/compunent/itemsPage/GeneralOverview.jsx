import React from "react";

const SummaryCard = ({ label, value, bg }) => (
    <div
        className={`flex flex-col items-center justify-center rounded-2xl shadow-sm border border-gray-200 px-6 py-4 ${bg}`}
    >
        <span className="text-gray-700 text-sm">{label}</span>
        <span className="text-2xl font-bold mt-1">{value}</span>
    </div>
);

const GeneralOverview = ({ stats }) => {

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <SummaryCard
                    label="Total des produits"
                    value={stats.length}
                    bg="bg-blue-100"
                />
                <SummaryCard
                    label="Produits visibles"
                    value={stats.filter(e => e.best).length}
                    bg="bg-green-100"
                />
                <SummaryCard
                    label="Produits cachés"
                    value={stats.filter(e => !e.best).length}
                    bg="bg-yellow-100"
                />

            </div>
        </div>
    );
};

export default GeneralOverview;
