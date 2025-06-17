import StatCard from '../compunent/StatCard/StatCard'
import { CalendarCheck, MessageCircleX, Package, RefreshCw } from 'lucide-react'
import Bars from '../compunent/DashBoard/Bar'
import Lines from '../compunent/DashBoard/Lines'
import OrderLines from '../compunent/DashBoard/Pie'



const DashBoard = () => {
    return (
        <div
            className='pt-5'
        >
            <div
                className='flex   justify-center flex-wrap items-center'
            >
                <StatCard
                    title='order'
                    value='100'
                    color='bg-yellow-500'
                    shadow='shadow-yellow-500'
                    icon={<Package className='h-6 w-6'
                    />}
                />
                <StatCard
                    title=' pending order'
                    value='60'
                    icon={<RefreshCw className='h-6 w-6'
                    />}
                />
                <StatCard
                    title='confirm order'
                    value='30'
                    color=' bg-emerald-500'
                    shadow=' shadow-emerald-500'
                    icon={<CalendarCheck className='h-6 w-6' />}
                />
                <StatCard
                    title='cancel order'
                    value='10'
                    color=' bg-red-500'
                    shadow='shadow-red-500'
                    icon={<MessageCircleX className='h-6 w-6' />}
                />
            </div>
            <div
                className='flex flex-wrap  mt-5 justify-around items-center'
            >

                <Bars />
                <Lines />
                <OrderLines />
            </div>

        </div>
    )
}

export default DashBoard