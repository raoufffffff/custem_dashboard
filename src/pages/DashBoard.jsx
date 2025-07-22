import StatCard from '../compunent/StatCard/StatCard'
import { CalendarCheck, MessageCircleX, Package, RefreshCw } from 'lucide-react'
import Bars from '../compunent/DashBoard/Bar'
import Lines from '../compunent/DashBoard/Lines'
import OrderLines from '../compunent/DashBoard/Pie'
import LastOrders from '../compunent/DashBoard/LastOrders'
import ItemList from '../compunent/DashBoard/ItemList'
import DashboardSkeleton from '../compunent/dashbourdloading/DashBoardLoading'
import useOrders from '../hooks/useOrders'

const DashBoard = () => {
    const { Allorders, loading, panddingOrder, CancelledOrder, ConfirmedOrder } = useOrders();


    if (loading) return <DashboardSkeleton />
    return (
        <div
            className='pt-5'
        >
            <div
                className='flex   justify-center flex-wrap items-start'
            >
                <StatCard
                    title='order'
                    order={Allorders}
                    color='bg-yellow-500'
                    shadow='shadow-yellow-500'
                    icon={<Package className='h-6 w-6'
                    />}
                />
                <StatCard
                    title='pending order'
                    order={panddingOrder}
                    icon={<RefreshCw className='h-6 w-6'
                    />}
                />
                <StatCard
                    title='confirm order'
                    order={ConfirmedOrder}
                    color=' bg-emerald-500'
                    shadow=' shadow-emerald-500'
                    icon={<CalendarCheck className='h-6 w-6' />}
                />
                <StatCard
                    title='cancel order'
                    order={CancelledOrder}
                    color=' bg-red-500'
                    shadow='shadow-red-500'
                    icon={<MessageCircleX className='h-6 w-6' />}
                />
            </div>
            <div
                className='flex flex-wrap  mt-5 justify-around items-center'
            >

                <Bars order={Allorders} />
                <Lines order={Allorders} />
                <OrderLines ConfirmedOrder={ConfirmedOrder} CancelledOrder={CancelledOrder} />
            </div>
            <div
                className='flex flex-wrap justify-around items-center'
            >
                <ItemList order={Allorders} />
                <LastOrders order={Allorders} />
            </div>
        </div>
    )
}

export default DashBoard