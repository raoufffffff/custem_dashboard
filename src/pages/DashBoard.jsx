import DashboardSkeleton from '../compunent/dashbourdloading/DashBoardLoading'
import useOrders from '../hooks/useOrders'
import Stats from '../compunent/DashBoard/Stats'
import StatusSummary from '../compunent/DashBoard/StatusSummary';

const DashBoard = () => {
    const { loading, panddingOrder, ConfirmedOrder, Allorders } = useOrders();


    if (loading) return <DashboardSkeleton />
    return (
        <div
            className='flex flex-col gap-10 px-0 md:px-5 pt-4'
        >
            <Stats panddingOrder={panddingOrder} ConfirmedOrder={ConfirmedOrder} />
            <StatusSummary Allorders={Allorders} />
        </div>
    )
}

export default DashBoard