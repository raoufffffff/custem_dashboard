import React from 'react';
import { TrendingUp, CheckCircle, XCircle, Package, Home, Building } from 'lucide-react';

const ShippingAnalytics = ({ stats, situationCounts }) => {
    return (
        <div className="space-y-6 mb-8 px-4">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="إجمالي الشحنات" value={stats.total} icon={<Package className="text-purple-500" />} color="purple" />
                <StatCard title="معدل التوصيل" value={`${stats.successRate}%`} icon={<TrendingUp className="text-teal-500" />} color="teal" />
                <StatCard title="توصيل منزلي" value={stats.domicile} icon={<Home className="text-teal-500" />} color="teal" subtitle={`نسبة ${stats.domicileRate}%`} />
                <StatCard title="Stopdesk" value={stats.stopdesk} icon={<Building className="text-purple-500" />} color="purple" subtitle={`نسبة ${stats.stopdeskRate}%`} />
            </div>

            {/* Situation Distribution (The Pills) */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">توزيع الحالات (Situation)</h3>
                <div className="flex flex-wrap gap-2">
                    {Object.entries(situationCounts).map(([status, count]) => (
                        <div key={status} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg">
                            <span className="text-xs font-bold text-slate-700">{status}</span>
                            <span className="px-1.5 py-0.5 bg-purple-100 text-purple-600 rounded text-[10px] font-black">{count}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, color, subtitle }) => (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
        <div>
            <p className="text-slate-500 text-xs font-bold mb-1">{title}</p>
            <h4 className="text-2xl font-black text-slate-800">{value}</h4>
            {subtitle && <p className="text-[10px] text-slate-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl bg-${color}-50`}>{icon}</div>
    </div>
);

export default ShippingAnalytics;