import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { format, subDays, isSameDay } from 'date-fns';

const Bars = ({ order }) => {
    // توليد آخر 7 أيام (من اليوم -6 إلى اليوم الحالي)
    const last7Days = [...Array(7)].map((_, i) => {
        const date = subDays(new Date(), 6 - i);
        return {
            name: format(date, 'EEE'), // مثل Mon, Tue...
            date,
            views: 0
        };
    });

    // عدّ الطلبات في كل يوم
    order?.forEach(o => {
        const createdAt = new Date(o.date);
        last7Days.forEach(day => {
            if (isSameDay(day.date, createdAt)) {
                day.views += 1;
            }
        });
    });

    return (
        <div className="w-11/12 sm:w-5/12 lg:w-[30%] bg-white flex flex-col items-center pb-5 rounded-xl shadow my-5 sm:my-2">
            <div style={{
                width: '90%',
                height: '200px',
                background: 'linear-gradient(180deg, #42a5f5, #1e88e5)',
                borderRadius: '12px',
                padding: '10px',
                color: 'white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }} className="shadow-2xl shadow-blue-600 -translate-y-6">
                <div style={{ width: '100%', height: '100%' }}>
                    <ResponsiveContainer>
                        <BarChart barSize={10} data={last7Days}>
                            <CartesianGrid stroke="#eee9" strokeWidth={0.3} strokeDasharray="0" />
                            <XAxis axisLine={false} dataKey="name" stroke="#ffffff" tickLine={false} />
                            <YAxis tickLine={false} axisLine={false} stroke="#ffffff" width={20} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e88e5', border: 'none', color: '#fff' }}
                                labelStyle={{ color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Bar dataKey="views" fill="#eeee" radius={[30, 30, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="w-10/12 -translate-y-3">
                <h1 className="font-bold capitalize text-[#344767]">Purchases in Week</h1>
                <span className="font-extralight">Last purchases in this week</span>
            </div>
        </div>
    );
};

export default Bars;
