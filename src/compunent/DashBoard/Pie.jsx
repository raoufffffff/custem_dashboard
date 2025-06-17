import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ordersData = [
    { name: 'Apr', confirmed: 0, cancelled: 0 },
    { name: 'May', confirmed: 0, cancelled: 0 },
    { name: 'Jun', confirmed: 100, cancelled: 25 },
    { name: 'Jul', confirmed: 150, cancelled: 40 },
    { name: 'Aug', confirmed: 200, cancelled: 70 },
    { name: 'Sep', confirmed: 250, cancelled: 30 },
    { name: 'Oct', confirmed: 200, cancelled: 20 },
    { name: 'Nov', confirmed: 300, cancelled: 25 },
    { name: 'Dec', confirmed: 200, cancelled: 60 },
];

const OrderLines = () => (
    <div
        className='w-11/12 sm:w-5/12 lg:w-[30%] bg-white flex flex-col items-center pb-5 rounded-xl shadow my-5 sm:my-2'
    >
        <div style={{
            width: '90%',
            height: '200px',
            background: 'linear-gradient(180deg, #111, #000)', // أسود
            borderRadius: '12px',
            padding: '10px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}
            className='shadow-2xl shadow-black -translate-y-6'
        >
            <div style={{ width: '100%', height: '100%' }}>
                <ResponsiveContainer>
                    <LineChart data={ordersData}>
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
                        <Line
                            type="monotone"
                            dataKey="confirmed"
                            stroke="#4caf50"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            name="Confirmed Orders"
                        />
                        <Line
                            type="monotone"
                            dataKey="cancelled"
                            stroke="#e53935"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            name="Cancelled Orders"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
        <div
            className='w-10/12 -translate-y-3'
        >
            <h1
                className='font-bold capitalize text-[#344767]'
            >Order Activity</h1>
            <span
                className=' font-extralight'
            >Confirmed vs Cancelled Orders</span>
        </div>
    </div>
);

export default OrderLines;
