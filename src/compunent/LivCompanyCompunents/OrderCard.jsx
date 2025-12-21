import React, { useMemo } from 'react';
import {
    Loader2, Package, MapPin, Phone, ExternalLink,
    Clock, Truck, CheckCircle2, XCircle, TrendingUp,
    Home, Building2, BarChart3, AlertCircle, CalendarDays,
    ArrowRightLeft, Send
} from 'lucide-react';
import PageContainer from '../../CustomUi/PageContainer';
import UseLivOrder from '../../hooks/UseLivOrder';

// --- 1. مكون الـ Badge الذكي للحالات (Smart Status Badge) ---
const SituationBadge = ({ situation }) => {
    // خريطة الألوان والأيقونات لكل حالة بدقة
    const config = (() => {
        switch (situation) {
            case 'Livrée':
                return { color: 'bg-teal-100 text-teal-700 border-teal-200', icon: CheckCircle2, label: 'تم التوصيل' };

            case 'Annuler':
                return { color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle, label: 'ملغاة' };

            case 'EnCours':
            case 'En livraison':
            case 'SORTIR en livraison':
                return { color: 'bg-purple-100 text-purple-700 border-purple-200', icon: Truck, label: 'جاري التوصيل' };

            case 'Au Bureau':
                return { color: 'bg-indigo-100 text-indigo-700 border-indigo-200', icon: Building2, label: 'في المكتب' };

            case 'Dispatcher':
                return { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Send, label: 'تم الشحن (Dispatcher)' };

            case 'Reporté':
            case 'En attente du client':
                return { color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Clock, label: 'مؤجل / انتظار' };

            case 'Ne Réponde pas #1':
            case 'Ne Réponde pas #3':
                return { color: 'bg-orange-100 text-orange-700 border-orange-200', icon: Phone, label: 'لا يرد' };

            default:
                return { color: 'bg-slate-100 text-slate-600 border-slate-200', icon: Package, label: situation };
        }
    })();

    const Icon = config.icon;

    return (
        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${config.color} shadow-sm`}>
            <Icon className="w-3 h-3" />
            {situation}
        </span>
    );
};

// --- 2. مكون الإحصائيات العلوية (Analytics Header) ---
const StatCard = ({ title, value, subText, icon: Icon, colorClass, trend }) => (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-start justify-between group">
        <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
            <h3 className="text-3xl font-black text-slate-800 mb-1">{value}</h3>
            {subText && <p className="text-xs text-slate-400 font-medium">{subText}</p>}
        </div>
        <div className={`p-3 rounded-xl ${colorClass} group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-6 h-6" />
        </div>
    </div>
);

const AnalyticsHeader = ({ orders }) => {
    // استخدام useMemo لحساب الأرقام مرة واحدة فقط لضمان الأداء العالي
    const stats = useMemo(() => {
        const total = orders.length || 0;
        const delivered = orders.filter(o => o.Situation === 'Livrée').length;
        const cancelled = orders.filter(o => o.Situation === 'Annuler').length;
        const stopdesk = orders.filter(o => o.Stopdesk === 1).length;
        const home = total - stopdesk;

        // حساب نسبة النجاح (Livrée vs Annuler)
        const closedOrders = delivered + cancelled;
        const successRate = closedOrders > 0 ? Math.round((delivered / closedOrders) * 100) : 0;

        return { total, delivered, cancelled, successRate, stopdesk, home };
    }, [orders]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
                title="نسبة النجاح"
                value={`${stats.successRate}%`}
                subText={`${stats.delivered} تم توصيلها بنجاح`}
                icon={BarChart3}
                colorClass="bg-teal-100 text-teal-600"
            />
            <StatCard
                title="إجمالي الشحنات"
                value={stats.total}
                subText="شحنات نشطة حالياً"
                icon={Package}
                colorClass="bg-purple-100 text-purple-600"
            />
            <StatCard
                title="توصيل منزلي"
                value={stats.home}
                subText={`${Math.round((stats.home / (stats.total || 1)) * 100)}% من الشحنات`}
                icon={Home}
                colorClass="bg-blue-100 text-blue-600"
            />
            <StatCard
                title="نقطة استلام (StopDesk)"
                value={stats.stopdesk}
                subText="استلام من المكتب"
                icon={Building2}
                colorClass="bg-amber-100 text-amber-600"
            />
        </div>
    );
};

// --- 3. الصفحة الرئيسية التي تجمع كل شيء ---
const AlgeriaMap = () => {
    const { loading, orders } = UseLivOrder();

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[500px] gap-4">
                <Loader2 className="animate-spin h-12 w-12 text-teal-500" />
                <p className="text-slate-400 font-medium animate-pulse">جاري الاتصال بشركات التوصيل...</p>
            </div>
        );
    }

    return (
        <PageContainer
            titel={"متابعة الشحن"}
            about={"لوحة تحكم حية لأداء التوصيل"}
            className={"bg-slate-50 min-h-screen"}
        >
            <div className="p-4 max-w-7xl mx-auto">
                {/* 1. قسم التحليل */}
                <AnalyticsHeader orders={orders} />

                {/* 2. قسم الفلتر السريع (اختياري - جمالي) */}
                <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                    <span className="text-sm font-bold text-slate-400 px-2">الحالات:</span>
                    {['Livrée', 'EnCours', 'Annuler', 'Retour'].map((filter) => (
                        <button key={filter} className="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:border-teal-500 hover:text-teal-600 transition-colors">
                            {filter}
                        </button>
                    ))}
                </div>

                {/* 3. شبكة الطلبات */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders?.map((order, index) => (
                        <div
                            key={order.Tracking || index}
                            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                        >
                            {/* Card Header */}
                            <div className="p-4 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                                        <Package className="w-4 h-4 text-teal-600" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-slate-400 font-bold uppercase">Tracking ID</span>
                                        <span className="font-bold text-slate-800 text-sm">{order.Tracking}</span>
                                    </div>
                                </div>
                                <SituationBadge situation={order.Situation} />
                            </div>

                            {/* Card Body */}
                            <div className="p-5">
                                {/* Customer & Price */}
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-base font-bold text-slate-900 line-clamp-1">{order.NomComplet}</h3>
                                        <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-1">
                                            <Phone className="w-3 h-3" />
                                            <span>{order.Mobile_1}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-black text-purple-600">{order.Total} <span className="text-xs font-medium">DA</span></div>
                                        {/* عرض التاريخ هنا */}
                                        <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400 mt-1">
                                            <CalendarDays className="w-3 h-3" />
                                            <span>{order.Date_Création?.split(' ')[0] || "No Date"}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-slate-100 w-full mb-4"></div>

                                {/* Location & Info Grid */}
                                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs">
                                    <div className="col-span-2 flex items-center gap-2 text-slate-600 bg-slate-50 p-2 rounded-lg">
                                        <MapPin className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" />
                                        <span className="truncate">{order.Commune_Bureau || "العنوان غير محدد"}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-slate-600">
                                        <ArrowRightLeft className="w-3.5 h-3.5 text-indigo-500" />
                                        <span>{order.Stopdesk === 1 ? 'مكتب (Desk)' : 'منزل (Home)'}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-slate-600">
                                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                                        <span className="truncate" title={order.Avancement}>{order.Avancement}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer (Actions) */}
                            <div className="px-5 pb-5 pt-0">
                                <a
                                    href={order.label}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-900 hover:bg-teal-600 text-white rounded-xl font-bold text-xs transition-colors shadow-lg shadow-slate-200 hover:shadow-teal-200"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    تحميل البوليصة (PDF)
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PageContainer>
    );
}

export default AlgeriaMap;