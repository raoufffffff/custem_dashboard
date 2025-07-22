import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Legend
} from 'recharts';
import { useState, useMemo } from 'react';
import {
    format,
    subDays,
    subWeeks,
    subMonths,
    isSameDay,
    isSameWeek,
    isSameMonth,
    eachDayOfInterval,
    eachWeekOfInterval,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth
} from 'date-fns';

const OrderLines = ({ ConfirmedOrder = [], CancelledOrder = [] }) => {
    const [timePeriod, setTimePeriod] = useState("week"); // 'day', 'week', or 'month'

    const prepareData = useMemo(() => {
        const now = new Date();
        let timePeriods = [];

        // Generate time periods based on selection
        if (timePeriod === 'day') {
            timePeriods = eachDayOfInterval({
                start: subDays(now, 30), // Last 30 days
                end: now
            }).map(date => ({
                date,
                name: format(date, 'd MMM'), // e.g., "5 Jul"
                confirmed: 0,
                cancelled: 0,
                endDate: date
            }));
        } else if (timePeriod === 'week') {
            timePeriods = eachWeekOfInterval({
                start: subWeeks(now, 12), // Last 12 weeks
                end: now
            }).map(date => ({
                date: startOfWeek(date),
                name: `Week ${format(date, 'w')}`, // e.g., "Week 27"
                confirmed: 0,
                cancelled: 0,
                endDate: endOfWeek(date)
            }));
        } else { // month
            timePeriods = [...Array(12)].map((_, i) => {
                const date = subMonths(now, 11 - i);
                return {
                    date,
                    name: format(date, 'MMM yyyy'), // e.g., "Jul 2023"
                    confirmed: 0,
                    cancelled: 0,
                    endDate: endOfMonth(date)
                };
            });
        }

        // Count orders by time period
        [...ConfirmedOrder.map(o => ({ ...o, type: "confirmed" })),
        ...CancelledOrder.map(o => ({ ...o, type: "cancelled" }))].forEach(order => {
            const orderDate = new Date(order.date);
            timePeriods.forEach(period => {
                if (timePeriod === 'day' && isSameDay(period.date, orderDate)) {
                    period[order.type]++;
                } else if (timePeriod === 'week' && isSameWeek(orderDate, period.date)) {
                    period[order.type]++;
                } else if (timePeriod === 'month' && isSameMonth(period.date, orderDate)) {
                    period[order.type]++;
                }
            });
        });

        // Return data in chronological order (past to present)
        return timePeriods;

    }, [ConfirmedOrder, CancelledOrder, timePeriod]);

    // Custom tooltip formatter
    const renderTooltipContent = (data) => {
        if (!data.payload || data.payload.length === 0) return null;

        const period = data.payload[0].payload;
        let periodLabel = '';

        if (timePeriod === 'day') {
            periodLabel = format(period.date, 'EEEE, MMMM d, yyyy');
        } else if (timePeriod === 'week') {
            periodLabel = `Week ${format(period.date, 'w')} (${format(period.date, 'MMM d')} - ${format(period.endDate, 'MMM d')})`;
        } else {
            periodLabel = format(period.date, 'MMMM yyyy');
        }

        return (
            <div className="bg-white p-3 shadow-lg rounded-md border border-gray-200">
                <p className="font-bold text-gray-800 mb-2">{periodLabel}</p>
                <div className="flex flex-col space-y-1">
                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#4caf50] mr-2"></div>
                        <span className="text-gray-700">Confirmed: <strong>{period.confirmed}</strong></span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#e53935] mr-2"></div>
                        <span className="text-gray-700">Cancelled: <strong>{period.cancelled}</strong></span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className='w-full sm:w-5/12 lg:w-[30%] bg-white flex flex-col items-center pb-5 rounded-xl shadow-lg my-5 sm:my-2'>
            <div className="w-full px-6 pt-4 flex justify-between items-center">
                <div>
                    <h1 className='font-bold text-lg text-gray-800'>Order Activity</h1>
                    <span className='text-sm text-gray-500'>
                        {timePeriod === 'day' ? 'Last 30 days' :
                            timePeriod === 'week' ? 'Last 12 weeks' : 'Last 12 months'}
                    </span>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setTimePeriod("day")}
                        className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${timePeriod === "day" ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        Daily
                    </button>
                    <button
                        onClick={() => setTimePeriod("week")}
                        className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${timePeriod === "week" ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        Weekly
                    </button>
                    <button
                        onClick={() => setTimePeriod("month")}
                        className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${timePeriod === "month" ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        Monthly
                    </button>
                </div>
            </div>

            <div style={{
                width: '90%',
                height: '250px',
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                borderRadius: '12px',
                padding: '15px',
                color: 'white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
            }} className='mt-4 mb-2'>
                <ResponsiveContainer>
                    <LineChart data={prepareData}>
                        <CartesianGrid stroke="#ffffff20" strokeDasharray="3 3" />
                        <XAxis
                            dataKey="name"
                            stroke="#ffffff80"
                            tickLine={false}
                            tick={{ fontSize: 12 }}
                            interval={timePeriod === 'day' ? 4 : 0} // Show every 4th day if daily view
                            reversed={true} // This reverses the axis
                        />
                        <YAxis
                            stroke="#ffffff80"
                            tickLine={false}
                            width={30}
                            tick={{ fontSize: 12 }}
                        />
                        <Tooltip
                            content={renderTooltipContent}
                            cursor={{ stroke: '#ffffff40', strokeWidth: 1 }}
                        />
                        <Legend
                            verticalAlign="top"
                            height={40}
                            iconType="circle"
                            iconSize={10}
                            wrapperStyle={{ color: '#ffffff', fontSize: '12px' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="confirmed"
                            stroke="#4caf50"
                            strokeWidth={2.5}
                            dot={{ r: 3 }}
                            activeDot={{ r: 5, strokeWidth: 0 }}
                            name="Confirmed"
                            animationDuration={300}
                        />
                        <Line
                            type="monotone"
                            dataKey="cancelled"
                            stroke="#e53935"
                            strokeWidth={2.5}
                            dot={{ r: 3 }}
                            activeDot={{ r: 5, strokeWidth: 0 }}
                            name="Cancelled"
                            animationDuration={300}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="w-full px-6 mt-2 flex justify-between items-center text-xs text-gray-500">
                <div>
                    <span className="inline-block w-2 h-2 rounded-full bg-[#4caf50] mr-1"></span>
                    <span>Confirmed: {ConfirmedOrder.length}</span>
                </div>
                <div>
                    <span className="inline-block w-2 h-2 rounded-full bg-[#e53935] mr-1"></span>
                    <span>Cancelled: {CancelledOrder.length}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderLines;