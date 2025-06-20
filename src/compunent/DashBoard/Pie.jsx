import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Legend
} from 'recharts';
import { useState, useMemo } from 'react';
import { format } from 'date-fns';

const OrderLines = ({ ConfirmedOrder = [], CancelledOrder = [] }) => {
    const [view, setView] = useState("week");

    const prepareData = useMemo(() => {
        const allOrders = [
            ...ConfirmedOrder.map(o => ({ ...o, type: "confirmed" })),
            ...CancelledOrder.map(o => ({ ...o, type: "cancelled" })),
        ];

        const grouped = {};

        allOrders.forEach(order => {
            const date = new Date(order.date);
            const key = view === "month"
                ? format(date, "MMM yyyy")
                : format(date, "'W'w yyyy"); // Week format

            if (!grouped[key]) {
                grouped[key] = { name: key, confirmed: 0, cancelled: 0 };
            }

            grouped[key][order.type]++;
        });

        // Sort the data by date
        const sorted = Object.values(grouped).sort((a, b) => {
            const dateA = view === "month"
                ? new Date("1 " + a.name)
                : new Date(a.name.split(" ")[1]); // for weeks
            const dateB = view === "month"
                ? new Date("1 " + b.name)
                : new Date(b.name.split(" ")[1]);
            return dateA - dateB;
        });

        // Optional: limit to last 6 items
        return sorted.slice(-6);

    }, [ConfirmedOrder, CancelledOrder, view]);

    return (
        <div className='w-11/12 sm:w-5/12 lg:w-[30%] bg-white flex flex-col items-center pb-5 rounded-xl shadow my-5 sm:my-2'>
            <div
                style={{
                    width: '90%',
                    height: '200px',
                    background: 'linear-gradient(180deg, #111, #000)',
                    borderRadius: '12px',
                    padding: '10px',
                    color: 'white',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}
                className='shadow-2xl shadow-black -translate-y-6'
            >
                <ResponsiveContainer>
                    <LineChart data={prepareData}>
                        <CartesianGrid stroke="#eee2" strokeWidth={0.4} />
                        <XAxis axisLine={false} dataKey="name" stroke="#ffffff" tickLine={false} />
                        <YAxis tickLine={false} axisLine={false} stroke="#ffffff" width={27} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#ffffff',
                                border: 'none',
                                color: '#333',
                                fontWeight: 'bold',
                            }}
                            labelStyle={{ color: '#333' }}
                            itemStyle={{ color: '#333' }}
                        />
                        <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ color: 'white' }} />
                        <Line type="monotone" dataKey="confirmed" stroke="#4caf50" strokeWidth={3} dot={{ r: 4 }} name="Confirmed" />
                        <Line type="monotone" dataKey="cancelled" stroke="#e53935" strokeWidth={3} dot={{ r: 4 }} name="Cancelled" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className='w-10/12 -translate-y-3 mb-2'>
                <h1 className='font-bold capitalize text-[#344767]'>Order Activity</h1>
                <span className='font-extralight'>Confirmed vs Cancelled Orders</span>
            </div>

            <div className='flex gap-2 mt-2'>
                <button
                    onClick={() => setView("month")}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${view === "month" ? 'bg-[#155dfc] text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                    Monthly
                </button>
                <button
                    onClick={() => setView("week")}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${view === "week" ? 'bg-[#155dfc] text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                    Weekly
                </button>
            </div>
        </div>
    );
};

export default OrderLines;
