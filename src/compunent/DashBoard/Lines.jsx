import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const lineData = [
    { name: 'Apr', sales: 0 },
    { name: 'May', sales: 200 },
    { name: 'Jun', sales: 300 },
    { name: 'Jul', sales: 320 },
    { name: 'Aug', sales: 550 },
    { name: 'Sep', sales: 400 },
    { name: 'Oct', sales: 250 },
    { name: 'Nov', sales: 270 },
    { name: 'Dec', sales: 500 },
];

const Lines = () => (
    <div
        className='w-11/12 sm:w-5/12 lg:w-[30%] bg-white flex  flex-col items-center pb-5 rounded-xl shadow my-5 sm:my-2'
    >
        <div style={{
            width: '90%',
            height: '200px',
            background: 'linear-gradient(180deg, #66bb6a, #388e3c)', // أخضر
            borderRadius: '12px',
            padding: '10px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
            className='shadow-2xl shadow-green-600 -translate-y-6'
        >
            <div style={{ width: '100%', height: '100%' }}>
                <ResponsiveContainer>
                    <LineChart data={lineData}>
                        <CartesianGrid stroke="#eee9" strokeWidth={0.3} strokeDasharray="0" />
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
                        <Line
                            type="monotone"
                            dataKey="sales"
                            stroke="#ffffff"
                            strokeWidth={3}
                            dot={{ r: 5 }}
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
            >Purchases in months</h1>
            <span
                className=' font-extralight'
            >Last Purchases in 12 months </span>
        </div>
    </div>
);

export default Lines;
