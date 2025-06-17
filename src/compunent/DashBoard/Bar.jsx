import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const barData = [
    { name: 'M', views: 50 },
    { name: 'T', views: 20 },
    { name: 'W', views: 10 },
    { name: 'T', views: 25 },
    { name: 'F', views: 55 },
    { name: 'S', views: 15 },
    { name: 'S', views: 40 },
];

const Bars = () => {
    return (
        <div
            className='w-11/12 sm:w-5/12 lg:w-[30%] bg-white flex  flex-col items-center pb-5 rounded-xl shadow my-5 sm:my-2'
        >
            <div style={{
                width: '90%',
                height: '200px',
                background: 'linear-gradient(180deg, #42a5f5, #1e88e5)',
                borderRadius: '12px',
                padding: '10px',
                color: 'white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
                className='shadow-2xl shadow-blue-600 -translate-y-6'
            >


                <div style={{ width: '100%', height: '100%' }}>
                    <ResponsiveContainer>
                        <BarChart barSize={10} data={barData}>
                            <CartesianGrid stroke="#eee9" strokeWidth={0.3} strokeDasharray="0" />

                            <XAxis axisLine={false} dataKey="name" stroke="#ffffff" tickLine={false}
                            />
                            <YAxis tickLine={false}
                                axisLine={false} stroke="#ffffff" width={20} />
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
            <div
                className='w-10/12 -translate-y-3'
            >
                <h1
                    className='font-bold capitalize text-[#344767]'
                >website views</h1>
                <span
                    className=' font-extralight'
                >Last Campaign Performance</span>
            </div>
        </div>
    );
};

export default Bars;
