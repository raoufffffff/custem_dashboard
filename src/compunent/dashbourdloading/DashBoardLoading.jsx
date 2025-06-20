import React from "react";

const DashboardSkeleton = () => {
    const SummaryCard = () => (
        <div className="flex flex-col gap-3 w-full sm:w-1/2 lg:w-1/4 p-2">
            <div className="w-full h-24 bg-gray-200 rounded-xl animate-pulse p-4 shadow flex flex-col justify-between">
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
                <div className="w-3/4 h-4 bg-gray-300 rounded" />
            </div>
        </div>
    );

    const BarChart = () => (
        <div className="w-full bg-gray-200 rounded-xl animate-pulse p-4 shadow h-60">
            <div className="flex h-full items-end justify-between gap-2">
                {[...Array(7)].map((_, idx) => (
                    <div
                        key={idx}
                        className="w-4 bg-gray-300 rounded"
                        style={{ height: `${Math.random() * 50 + 20}px` }}
                    />
                ))}
            </div>
        </div>
    );

    const LineChart = () => (
        <div className="w-full bg-gray-200 rounded-xl animate-pulse p-4 shadow h-60">
            <div className="w-full h-full bg-gray-300 rounded" />
        </div>
    );



    return (
        <div className="p-4 space-y-6">
            {/* Summary cards */}
            <div className="flex flex-wrap justify-between">
                {[...Array(4)].map((_, i) => (
                    <SummaryCard key={i} />
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <BarChart />
                <LineChart />
                <LineChart />
            </div>
        </div>
    );
};

export default DashboardSkeleton;
